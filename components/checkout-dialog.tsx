"use client"

import { useState } from "react"
import { useRazorpay } from "@/hooks/use-razorpay"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Truck, ShieldCheck, CreditCard } from "lucide-react"

interface CheckoutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    amount: number;
    productName: string;
    description: string;
}

export function CheckoutDialog({ open, onOpenChange, amount, productName, description }: CheckoutDialogProps) {
    const { initiatePayment } = useRazorpay()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const phone = formData.get("phone") as string
        const address = formData.get("address") as string

        if (!name || !email || !phone || !address) {
            toast.error("Please fill all details")
            setIsLoading(false)
            return
        }

        try {
            await initiatePayment({
                amount,
                name: "Feza Mattress",
                description,
                email,
                contact: phone,
                onSuccess: () => {
                    toast.success("Order placed successfully!")
                }
            })
            // Close the dialog immediately so the overlay doesn't block the Razorpay popup
            onOpenChange(false)
        } catch (error) {
            console.error("Checkout error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none rounded-3xl shadow-2xl">
                <div className="bg-black text-white p-6 pb-8">
                    <DialogHeader className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium mb-2">
                             <ShoppingBag className="w-4 h-4" />
                             <span>Secure Checkout</span>
                        </div>
                        <DialogTitle className="text-2xl font-bold text-white">Complete Your Order</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            You're just one step away from better sleep.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-6 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-zinc-400">Total Amount</p>
                                <p className="text-2xl font-bold text-white">{formatPrice(amount)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Product</p>
                                <p className="text-sm font-semibold text-zinc-300">{productName}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-tight text-zinc-500">Full Name</Label>
                                <Input 
                                    id="name" 
                                    name="name" 
                                    placeholder="Enter your full name" 
                                    className="h-12 rounded-xl border-zinc-200 focus:ring-black focus:border-black transition-all" 
                                    required 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-tight text-zinc-500">Email</Label>
                                    <Input 
                                        id="email" 
                                        name="email" 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        className="h-12 rounded-xl border-zinc-200 focus:ring-black focus:border-black transition-all" 
                                        required 
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-tight text-zinc-500">Phone</Label>
                                    <Input 
                                        id="phone" 
                                        name="phone" 
                                        type="tel" 
                                        placeholder="Mobile number" 
                                        className="h-12 rounded-xl border-zinc-200 focus:ring-black focus:border-black transition-all" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="address" className="text-xs font-bold uppercase tracking-tight text-zinc-500">Shipping Address</Label>
                                <Textarea 
                                    id="address" 
                                    name="address" 
                                    placeholder="Full address (House no, Street, City, ZIP)" 
                                    className="min-h-[100px] rounded-xl border-zinc-200 focus:ring-black focus:border-black transition-all py-3" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-2">
                            <Button 
                                type="submit" 
                                className="w-full h-14 bg-black hover:bg-zinc-900 text-white font-bold rounded-2xl shadow-xl shadow-black/10 transition-all flex items-center justify-center gap-2" 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        <span>Proceed to Payment</span>
                                    </>
                                )}
                            </Button>
                            
                            <div className="flex items-center justify-center gap-6 py-2 border-t border-zinc-100 mt-2">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                    <Truck className="w-3.5 h-3.5 text-zinc-300" />
                                    <span>Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
                                    <span>Secure Pay</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
