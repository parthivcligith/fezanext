# Feza Mattress Website

A premium, high-performance e-commerce platform for mattresses built with Next.js, Framer Motion, and Supabase.

## 🚀 Key Features

- **Rich Aesthetics**: Modern UI with glassmorphism, smooth gradients, and mobile-optimized layouts.
- **Interactive Animations**: Dynamic page transitions, micro-interactions on click/tap, and custom scroll-based effects.
- **Product Options**: Dynamic pricing and configuration for different mattress sizes, thicknesses, and custom tops.
- **Secure Payments**: Integrated with Razorpay for safe and easy transactions.
- **Database & Auth**: Powered by Supabase for user authentication (OAuth) and real-time data management.
- **Responsive Design**: Stunning experience across Desktop and Mobile devices.

## 🛠️ Technology Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context & Hooks
- **Backend / DB**: [Supabase](https://supabase.com/)
- **Payment Gateway**: [Razorpay](https://razorpay.com/)

## 🏁 Getting Started

### 1. Prerequisites
- Node.js 18+ installed.
- A Supabase project and Razorpay account.

### 2. Environment Setup
Create a `.env.local` file in the root directory and add the following variables:

```bash
# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Installation
```bash
npm install
```

### 4. Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the result.

## 📦 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/new).

---

Designed and built with ❤️ by the Feza Team.
