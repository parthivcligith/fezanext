# Text Marquee / Velocity Scroll Component - Structured Prompt

## Component Overview

This is a reusable **Text Marquee component** that displays text with dynamic scroll-based velocity animation. The text scrolls smoothly in both directions and responds to the user's scrolling speed on the page, creating an engaging parallax-like effect.

---

## Component Usage

```tsx
<VelocityScroll
  text="SHANU'S DENTAL COMFORTABLE DENTISTRY"
  default_velocity={1}
  className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-foreground/10 drop-shadow-sm md:text-7xl md:leading-[5rem]"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | Required | The text to display and animate in the marquee |
| `default_velocity` | `number` | `5` | Base animation speed (pixels per millisecond); negative values animate in opposite direction |
| `className` | `string` | Optional | Tailwind CSS classes for styling the text (font size, color, tracking, opacity, etc.) |

---

## Core Logic & Implementation

### 1. **Key Dependencies**
- **framer-motion**: For animation and motion values
  - `useMotionValue()`: Stores the X position value
  - `useScroll()`: Detects page scroll position
  - `useVelocity()`: Calculates scroll speed
  - `useSpring()`: Smooths velocity transitions
  - `useTransform()`: Maps velocity to animation multiplier
  - `useAnimationFrame()`: Runs animation frame-by-frame
- **React Hooks**: `useEffect`, `useState`, `useRef`
- **Utility**: `cn()` from `@/lib/utils` for className merging

---

### 2. **Internal Structure**

#### **ParallaxText Component** (Nested Child)
This is the internal component that handles the actual marquee animation for a single direction.

**Props:**
- `children` (string): The text to animate
- `baseVelocity` (number): Direction and speed factor
- `className` (string): Styling classes

**Key Calculations:**
- **Dynamic Repetitions**: Automatically calculates how many times to repeat the text so it fills the entire viewport width
  ```tsx
  const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
  ```
- **Wraparound Math**: Uses the `wrap()` utility function to create seamless looping
  ```tsx
  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);
  ```

---

### 3. **Animation Logic Breakdown**

#### **Step 1: Scroll Detection**
```tsx
const { scrollY } = useScroll();
const scrollVelocity = useVelocity(scrollY);
```
- Tracks the user's scroll position and calculates scroll speed

#### **Step 2: Velocity Smoothing**
```tsx
const smoothVelocity = useSpring(scrollVelocity, {
  damping: 50,
  stiffness: 400,
});
```
- Smooths the velocity value to prevent jerky movements

#### **Step 3: Velocity Factor Mapping**
```tsx
const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
  clamp: false,
});
```
- Converts scroll velocity (0-1000) to a multiplier (0-5)
- When user scrolls fast, the multiplier increases, speeding up the marquee

#### **Step 4: Direction Based on Scroll**
```tsx
if (velocityFactor.get() < 0) {
  directionFactor.current = -1; // Scroll down
} else if (velocityFactor.get() > 0) {
  directionFactor.current = 1; // Scroll up
}
```
- Changes text animation direction based on scroll direction

#### **Step 5: Animation Frame Update**
```tsx
useAnimationFrame((t, delta) => {
  let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
  moveBy += directionFactor.current * moveBy * velocityFactor.get();
  baseX.set(baseX.get() + moveBy);
});
```
- Updates position every frame
- `delta`: Milliseconds since last frame
- Combines base velocity + scroll-induced velocity

---

### 4. **The `wrap()` Function**

This utility creates seamless looping by wrapping position values within a range:

```tsx
export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
```

**Example**: If text occupies 25% of viewport, when it reaches 100%, it wraps back to 0% seamlessly.

---

### 5. **Responsive Behavior**

- **Auto-Repetition on Resize**: Recalculates text repetitions when window is resized
  ```tsx
  window.addEventListener("resize", calculateRepetitions);
  ```
- **Responsive Text**: Use Tailwind responsive prefixes in className
  ```tsx
  className="text-4xl md:text-7xl" // Scales from mobile to desktop
  ```

---

## Component Architecture

```
VelocityScroll
├── Section Container
├── ParallaxText (forward direction)
│   ├── Container Div (overflow-hidden)
│   ├── Motion.div (with transform: x)
│   └── Repeated Text Spans
└── ParallaxText (reverse direction)
    ├── Container Div (overflow-hidden)
    ├── Motion.div (with transform: x)
    └── Repeated Text Spans
```

---

## Customization Points

### 1. **Speed Control**
```tsx
<VelocityScroll
  text="Your Text"
  default_velocity={2}  // Higher = faster base animation
/>
```

### 2. **Styling**
```tsx
<VelocityScroll
  text="Your Text"
  className="text-white text-6xl font-bold" // Any Tailwind classes
/>
```

### 3. **Text Content**
Any string can be passed to the `text` prop:
```tsx
<VelocityScroll text="CUSTOM TEXT HERE" />
```

### 4. **Velocity Sensitivity**
To change how much scroll speed affects animation, modify these values:
```tsx
// In ParallaxText component
const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
  // Change [0, 5] to [0, 10] for more sensitive response
  clamp: false,
});
```

### 5. **Damping/Stiffness** (Smoothness)
```tsx
const smoothVelocity = useSpring(scrollVelocity, {
  damping: 50,    // Higher = less bouncy
  stiffness: 400, // Lower = slower response
});
```

---

## Performance Considerations

1. **Animation Frame**: Uses `useAnimationFrame()` which runs at 60fps (or device refresh rate)
2. **Transform Only**: Only the `x` position is animated (GPU-accelerated)
3. **Clamping Disabled**: `clamp: false` allows values beyond 0-5 range for natural scrolling feel
4. **Repetitions**: Dynamically calculated for efficiency (only repeats as needed)

---

## Browser Support

- Requires **framer-motion** v6+
- Modern browsers supporting CSS transforms and requestAnimationFrame
- Mobile-friendly with smooth touch scrolling

---

## Integration Example

```tsx
// app/page.tsx
import { VelocityScroll } from "@/components/ui/scroll-based-velocity"

export default function Home() {
  return (
    <main>
      <section className="py-10 bg-background overflow-hidden">
        <VelocityScroll
          text="SHANU'S DENTAL COMFORTABLE DENTISTRY"
          default_velocity={1}
          className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-foreground/10 drop-shadow-sm md:text-7xl md:leading-[5rem]"
        />
      </section>
    </main>
  )
}
```

---

## Summary

The **VelocityScroll** component is a sophisticated marquee that:
- ✅ Animates text horizontally with automatic wrapping
- ✅ Responds to user scroll speed in real-time
- ✅ Renders in both forward and reverse directions simultaneously
- ✅ Automatically adapts to container width (responsive)
- ✅ Fully customizable (speed, styling, content)
- ✅ GPU-accelerated for smooth performance
