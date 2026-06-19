"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

interface CheckoutOptions {
  amount: number;
  customerName: string;
  email: string;
  contact: string;
  address: string;
  productName?: string;
  description?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const initiateCheckout = useCallback(
    async ({
      amount,
      customerName,
      email,
      contact,
      address,
      productName,
      description,
      onSuccess,
      onError,
    }: CheckoutOptions) => {
      setIsProcessing(true);
      
      try {
        // Simulate a small premium processing delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Construct WhatsApp text message
        const message = `*New Order from Feza Mattress Website*
-----------------------------------------
*Customer Details:*
• *Name:* ${customerName}
• *Phone:* ${contact}
• *Email:* ${email}
• *Shipping Address:* ${address}

*Order Summary:*
• *Product:* ${productName || "Mattress"}
• *Details:* ${description || "Standard Product"}
• *Total Amount:* ₹${amount.toLocaleString('en-IN')}
-----------------------------------------
Please confirm this order. Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = "919605600615";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in a new window/tab
        window.open(whatsappUrl, "_blank");
        
        toast.success("Order details sent to WhatsApp!");
        onSuccess?.();
      } catch (error: any) {
        console.error("WhatsApp checkout failed:", error);
        toast.error("Could not complete checkout. Please try again.");
        onError?.(error);
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  return { initiateCheckout, isProcessing };
};
