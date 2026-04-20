import { ProductCard } from "@/components/ui/product-card-1";

// Sample data for the product card
const productData = {
  id: "demo-iphone-16",
  imageUrl: "/images/comfy6.png", // Using local mattress image
  title: "Feza Comfy Ortho Mattress (King Size, 8 Inch)",
  rating: 4.8,
  ratingsCount: 15420,
  reviewsCount: 1205,
  specifications: [
    "Premium Ortho Foam Base",
    "High-Density Bonded Foam for Spinal Support",
    "Breathable Quilted Fabric Cover",
    "7-Year Manufacturer Warranty",
    "100-Night Trial Period",
  ],
  price: 18500,
  originalPrice: 28460,
  isAssured: true,
  exchangeOffer: "4,500",
  bankOffer: "10% Instant Discount on HDFC Bank Cards",
};

export default function ProductCardDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted p-4">
      <div className="max-w-4xl w-full">
        <ProductCard {...productData} />
      </div>
    </div>
  );
}
