export interface ProductData {
    slug: string
    name: string
    badge: string
    description: string
    features: string
    deliveryInfo: string
    rating: number
    reviewCount: number
    reviews: {
        name: string
        rating: number
        date: string
        title: string
        text: string
    }[]
}

export const ORTHO_PRODUCTS: ProductData[] = [
    {
        slug: "comfy-ortho-mattress",
        name: "Comfy Ortho Mattress",
        badge: "Bestseller",
        description:
            "Specially designed with firm support for spinal alignment and relief from back and neck pain. Comfy Ortho Mattress features high-density bonded foam that ensures your spine stays in its natural shape. The premium quilted fabric provides a soft touch while maintaining breathability for a cool sleep environment.",
        features:
            "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        deliveryInfo: "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        rating: 4.8,
        reviewCount: 50,
        reviews: [
            {
                name: "Lakshmi Nair",
                rating: 5,
                date: "2 months ago",
                title: "Best sleep I've had in years!",
                text: "I was struggling with back pain for months. After switching to the Comfy Ortho, I wake up pain-free. The firmness is just right - not too hard, not too soft.",
            },
            {
                name: "Arjun Menon",
                rating: 5,
                date: "1 month ago",
                title: "Excellent quality and service",
                text: "Delivery was fast and the mattress setup was easy. It feels very premium and durable. Highly recommended for anyone looking for orthopedic support.",
            },
            {
                name: "Fathima R.",
                rating: 4,
                date: "3 weeks ago",
                title: "Great support",
                text: "Very supportive mattress. Took a few nights to get used to the firmness coming from a soft foam mattress, but now I love it. My posture feels better.",
            },
        ],
    },
    {
        slug: "orthopedic-mattress",
        name: "Orthopedic Mattress",
        badge: "New Arrival",
        description:
            "Our classic Orthopedic Mattress is engineered with advanced multi-layer bonded foam technology delivering superior back support for all sleeping positions. Ideal for those who need therapeutic-grade firmness, it promotes proper spinal curvature and alleviates pressure points, ensuring you wake up refreshed and pain-free every morning.",
        features:
            "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        deliveryInfo: "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        rating: 4.7,
        reviewCount: 38,
        reviews: [
            {
                name: "Priya Sharma",
                rating: 5,
                date: "1 month ago",
                title: "Perfect orthopedic support!",
                text: "My doctor recommended an orthopedic mattress and this one is perfect. It provides firm support without being too hard. My lower back pain has reduced significantly.",
            },
            {
                name: "Ravi Kumar",
                rating: 5,
                date: "2 months ago",
                title: "Great investment for better sleep",
                text: "Worth every rupee. The quality is exceptional and the support is exactly what I needed. Family is very happy with the purchase.",
            },
            {
                name: "Anjali Verma",
                rating: 4,
                date: "3 weeks ago",
                title: "Solid construction and good support",
                text: "The mattress feels very sturdy and durable. It took a couple of weeks to adjust but now I sleep much better. Highly recommend for people with back issues.",
            },
        ],
    },
    {
        slug: "semi-ortho-mattress",
        name: "Semi Ortho Mattress",
        badge: "Popular",
        description:
            "The Semi Ortho Mattress strikes the perfect balance between plush comfort and orthopedic support. Featuring a medium-firm profile, it uses a combination of high-resilience foam and supportive base layers to cradle your body while maintaining optimal spinal alignment. It's the ideal choice for sleepers who want therapeutic benefits without sacrificing softness.",
        features:
            "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        deliveryInfo: "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        rating: 4.6,
        reviewCount: 42,
        reviews: [
            {
                name: "Suresh Nambiar",
                rating: 5,
                date: "6 weeks ago",
                title: "Perfect middle-ground",
                text: "I wanted something between super firm and soft. The Semi Ortho is exactly that. Comfortable yet supportive — my back feels great in the morning.",
            },
            {
                name: "Kavita Iyer",
                rating: 4,
                date: "1 month ago",
                title: "Great for couples with different preferences",
                text: "My husband likes firm and I like slightly softer. The Semi Ortho works perfectly for both of us. Very happy with this purchase.",
            },
            {
                name: "Mohammed Rashid",
                rating: 5,
                date: "2 weeks ago",
                title: "Excellent comfort and support",
                text: "This mattress exceeded my expectations. The semi-ortho feel is exactly right — supportive enough for back health but comfortable enough for a great night's sleep.",
            },
        ],
    },
    {
        slug: "ortho-care-mattress",
        name: "Ortho Care Mattress",
        badge: "Premium",
        description:
            "The Ortho Care Mattress is our most advanced orthopedic sleep solution, engineered with a premium high-density rebonded foam core and a specially treated anti-microbial fabric cover. Designed in consultation with orthopaedic specialists, it provides targeted zonal support for the lumbar, shoulder, and hip regions — delivering medically recommended spinal alignment for a truly restorative sleep experience.",
        features:
            "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        deliveryInfo: "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        rating: 4.9,
        reviewCount: 29,
        reviews: [
            {
                name: "Dr. Anand Pillai",
                rating: 5,
                date: "1 month ago",
                title: "Medically sound design",
                text: "As an orthopaedic physiotherapist, I'm very particular about mattresses. The Ortho Care is one of the few consumer mattresses that truly delivers on its orthopedic claims. Highly recommended.",
            },
            {
                name: "Sunita Reddy",
                rating: 5,
                date: "3 weeks ago",
                title: "Completely transformed my sleep",
                text: "After years of chronic back pain I finally found a mattress that works. The Ortho Care provides exceptional lumbar support and I wake up completely pain-free now.",
            },
            {
                name: "Vikram Singh",
                rating: 5,
                date: "2 weeks ago",
                title: "Premium quality, worth every penny",
                text: "The build quality is outstanding. It feels very different from regular mattresses — you can feel the zonal support at different points. My entire family now wants one!",
            },
        ],
    },
    // ── Non-ortho range ──────────────────────────────────────────────────────
    {
        slug: "pure-rest-mattress",
        name: "Pure Rest Mattress",
        badge: "Natural Choice",
        description:
            "The Pure Rest Mattress is a premium triple-layer sleep system combining the natural resilience of Latex, the everyday comfort of PU Comfort Foam, and a firm Ortho Foam (Rebonded) base. Latex conforms to your body contours for pressure relief, comfort foam eases you into sleep, while the ortho foam base keeps your spine perfectly aligned — giving you the best of natural and therapeutic sleep every night.",
        features:
            "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        deliveryInfo: "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        rating: 4.8,
        reviewCount: 34,
        reviews: [
            {
                name: "Deepa Krishnan",
                rating: 5,
                date: "3 weeks ago",
                title: "The most natural sleep I've ever had",
                text: "The latex layer is absolutely incredible — it has this springy, natural bounce that synthetic foams just can't replicate. Combined with the comfort layer beneath, every night feels luxurious. My back has never felt better.",
            },
            {
                name: "Anil George",
                rating: 5,
                date: "1 month ago",
                title: "Worth every rupee",
                text: "I was sceptical about the price but the Pure Rest has totally changed how I feel in the morning. No stiffness, no aches. The combination of latex and ortho base is genius.",
            },
            {
                name: "Meera Pillai",
                rating: 4,
                date: "2 months ago",
                title: "Great natural mattress",
                text: "Love that it uses latex. The mattress breathes really well — no more waking up hot in the night. Support is excellent too. Slight adjustment period but absolutely worth it.",
            },
        ],
    },
    {
        slug: "pure-rest-o-mattress",
        name: "Pure Rest O Mattress",
        badge: "Pure & Firm",
        description:
            "The Pure Rest O Mattress is a no-compromise dual-layer sleep solution built for those who want the purity of natural Latex with the firm, therapeutic support of Ortho Foam (Rebonded). Without additional comfort foam in between, the transition from the responsive latex surface to the ortho base is direct and precise — making it ideal for sleepers who need maximum back support while still enjoying the natural feel of latex.",
        features:
            "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        deliveryInfo: "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        rating: 4.7,
        reviewCount: 27,
        reviews: [
            {
                name: "Sanjay Thomas",
                rating: 5,
                date: "1 month ago",
                title: "Firm and natural — exactly what I needed",
                text: "I have chronic lower back issues and my physiotherapist recommended a firmer mattress. The Pure Rest O delivers that firmness with a natural latex top that makes it feel premium, not punishing.",
            },
            {
                name: "Rekha Nair",
                rating: 4,
                date: "6 weeks ago",
                title: "Excellent back support",
                text: "Very firm but in the best way. Perfect for those who prefer sleeping on a surface that doesn't sink in too much. The latex top prevents it from feeling like you're sleeping on a board.",
            },
            {
                name: "Kiran Mohan",
                rating: 5,
                date: "3 weeks ago",
                title: "Therapeutic and luxurious",
                text: "I've tried many orthopedic mattresses but the latex layer on the Pure Rest O is what sets it apart. It's the right blend of firmness and natural comfort. Highly recommend!",
            },
        ],
    },
    {
        slug: "prime-spring-mattress",
        name: "Prime Spring Mattress",
        badge: "Pocket Spring",
        description:
            "The Prime Spring Mattress combines individually wrapped Pocket Springs with a luxurious Memory Foam comfort layer for the ultimate hybrid sleep experience. Each pocket spring moves independently to absorb motion and provide targeted pressure relief, while the memory foam on top moulds to your unique body shape — ensuring zero partner disturbance and a hotel-grade feel night after night.",
        features:
            "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        deliveryInfo: "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        rating: 4.9,
        reviewCount: 46,
        reviews: [
            {
                name: "Rahul Nambiar",
                rating: 5,
                date: "2 weeks ago",
                title: "Hotel-quality sleep at home!",
                text: "The pocket springs give this mattress a bounce and airiness that pure foam mattresses can't match. The memory foam on top is the cherry on the cake. I feel like I'm sleeping in a 5-star hotel every night.",
            },
            {
                name: "Sheila Varghese",
                rating: 5,
                date: "1 month ago",
                title: "Zero motion transfer — a game changer",
                text: "My husband tosses and turns at night and I used to wake up constantly. Since we switched to the Prime Spring, I don't feel a thing. The pocket springs are incredible for motion isolation.",
            },
            {
                name: "Ashwin Patel",
                rating: 5,
                date: "3 weeks ago",
                title: "Best sleep investment ever",
                text: "The combination of memory foam and pocket springs is simply unbeatable. It supports you where you need it and cradles you where you're soft. Cannot recommend this enough.",
            },
        ],
    },
    {
        slug: "polarcloud-mattress",
        name: "PolarCloud Mattress",
        badge: "Cloud Comfort",
        description:
            "The PolarCloud Mattress is engineered for sleepers who want everything — the pressure-melting sensation of Memory Foam, the transitional cushioning of PU Comfort Foam, and the solid spinal support of an Ortho Foam (Rebonded) base. The three-layer stack creates a progressive feel: you sink gently into the memory foam, feel cradled by the comfort layer, and rest assured on the firm ortho base below — total comfort, total support.",
        features:
            "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        deliveryInfo: "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        rating: 4.8,
        reviewCount: 39,
        reviews: [
            {
                name: "Nisha Unnithan",
                rating: 5,
                date: "1 month ago",
                title: "Sleeping on a cloud!",
                text: "The name says it all. The PolarCloud feels like you're floating. The memory foam adapts so well to my body and the layers beneath give great support. I've been sleeping 8 hours straight ever since.",
            },
            {
                name: "Sunil Babu",
                rating: 5,
                date: "3 weeks ago",
                title: "Premium multi-layer experience",
                text: "You can actually feel the different layers working together. The memory foam hugs you, the comfort layer transitions smoothly, and the ortho base stops you from sinking too deep. Brilliant engineering.",
            },
            {
                name: "Preethi Raj",
                rating: 4,
                date: "2 months ago",
                title: "Comfortable and supportive",
                text: "Great mattress overall. The memory foam is very responsive and the ortho base keeps my back in check. My only note is it took a week to fully break in — after that, absolute perfection.",
            },
        ],
    },
    {
        slug: "polarcloud-o-mattress",
        name: "PolarCloud O Mattress",
        badge: "Ortho Cloud",
        description:
            "The PolarCloud O Mattress delivers the same exceptional three-layer construction as the PolarCloud — Memory Foam, PU Comfort Foam, and Ortho Foam (Rebonded) — with a specific focus on orthopedic benefit. The ortho base layer is enhanced for greater density and firmness, making this variant ideal for those who require clinical-level spinal support without giving up the cloud-like comfort of memory foam and the cushioning of comfort foam.",
        features:
            "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        deliveryInfo: "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses. If you're not satisfied, we'll pick it up for free and give you a full refund.",
        rating: 4.9,
        reviewCount: 31,
        reviews: [
            {
                name: "Dr. Leena Mathew",
                rating: 5,
                date: "3 weeks ago",
                title: "Perfect for back patients",
                text: "I recommend the PolarCloud O to my patients who need ortho support but find pure ortho mattresses too harsh. The memory foam top makes it comfortable while the ortho base does its therapeutic job perfectly.",
            },
            {
                name: "Joshi Krishnamurthy",
                rating: 5,
                date: "1 month ago",
                title: "The ortho version that doesn't compromise comfort",
                text: "I had the regular PolarCloud and then upgraded to the O variant on my doctor's advice. The firmer ortho base has made a real difference to my back. And it's still incredibly comfortable to sleep on.",
            },
            {
                name: "Divya Pillai",
                rating: 5,
                date: "2 weeks ago",
                title: "Best of both worlds",
                text: "Orthopedic support with memory foam comfort — I never thought I'd find this in one mattress. The PolarCloud O has exceeded every expectation. My back is finally pain-free.",
            },
        ],
    },
]

export function getProductBySlug(slug: string): ProductData | undefined {
    return ORTHO_PRODUCTS.find((p) => p.slug === slug)
}
