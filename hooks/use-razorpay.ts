"use client";

import { useCallback } from "react";
import { toast } from "sonner";

interface RazorpayOptions {
  amount: number;
  name?: string;
  description?: string;
  email?: string;
  contact?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

export const useRazorpay = () => {
  const loadScript = useCallback((src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(
    async ({
      amount,
      name = "Feza Mattress",
      description = "Order Purchase",
      email = "",
      contact = "",
      onSuccess,
      onError,
    }: RazorpayOptions) => {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // Create order on server
      try {
        const orderResponse = await fetch("/api/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        });

        const orderData = await orderResponse.json();

        if (orderData.error) {
          throw new Error(orderData.error);
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: orderData.amount,
          currency: orderData.currency,
          name,
          description,
          order_id: orderData.id,
          handler: function (response: any) {
            toast.success("Payment Successful!");
            onSuccess?.(response);
          },
          prefill: {
            name: "",
            email,
            contact,
          },
          theme: {
            color: "#000000",
          },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.on("payment.failed", function (response: any) {
          toast.error("Payment failed. Please try again.");
          onError?.(response.error);
        });
        paymentObject.open();
      } catch (error) {
        console.error("Payment initiation failed:", error);
        toast.error("Could not initiate payment. Check console for details.");
      }
    },
    [loadScript]
  );

  return { initiatePayment };
};
