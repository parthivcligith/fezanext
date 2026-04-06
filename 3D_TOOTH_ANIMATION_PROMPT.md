# 3D Tooth Animation Component - Detailed Prompt & Logic

## Overview
This is a sophisticated **3D-looking tooth animation component** used in the hero section of a dental clinic website. It combines scroll-based physics, floating animations, and visual depth effects to create an engaging, modern hero experience.

---

## Core Features

### 1. **Scroll-Linked Parallax Animation**
- **Velocity Smoothing**: Uses Framer Motion's `useSpring()` with custom physics
  - Mass: 0.1 (light)
  - Stiffness: 100 (responsive)
  - Damping: 20 (smooth easing)
  - RestDelta: 0.001 (precision)

- **Scroll Detection**: 
  - Tracks scroll from "start start" to "end start"
  - Uses `useScroll()` hook on container ref
  - Creates smooth, physics-based motion

- **Parallax Transformations**:
  ```javascript
  const toothY = useTransform(smoothProgress, [0, 1], [0, 500])
  const toothScale = useTransform(smoothProgress, [0, 1], [1, 1.8])
  const textY = useTransform(smoothProgress, [0, 1], [0, 50])
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  ```
  - Y-axis moves down 500px as user scrolls
  - Scale grows from 1 to 1.8x
  - Text moves subtly (50px)
  - Background fades at 50% progress

### 2. **Floating Animation (Idle State)**
```javascript
animate={{
  y: [0, -10, 0],
}}
transition={{
  duration: 4,
  repeat: Number.POSITIVE_INFINITY,
  ease: "easeInOut",
}}
```
- **Gentle bobbing motion**: Moves up/down by 10px
- **Duration**: 4 seconds per cycle
- **Infinite loop**: Continuous floating effect
- **Easing**: easeInOut for smooth, natural motion

### 3. **Visual Depth & Lighting Effects**

#### Pedestal Shadow (Depth)
```javascript
<motion.div
  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-8 
             bg-foreground/5 rounded-full blur-xl"
/>
```
- Subtle shadow beneath tooth for elevation illusion
- Gaussian blur for soft, realistic shadow
- Fades opacity with animation

#### Glow Overlay (3D Appearance)
```javascript
<motion.div
  className="absolute inset-0 pointer-events-none"
  animate={{
    opacity: [0.3, 0.5, 0.3],
  }}
  transition={{
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  }}
>
  <div className="absolute top-1/4 left-1/3 w-24 h-24 
                  bg-white/40 rounded-full blur-2xl" />
  <div className="absolute top-1/3 right-1/4 w-16 h-16 
                  bg-accent/20 rounded-full blur-xl" />
</motion.div>
```
- Two-point light source effect
- Primary highlight: white/40 (top-left)
- Secondary highlight: accent/20 (right side)
- Pulsing opacity [0.3 → 0.5 → 0.3] over 3 seconds
- Creates illusion of 3D surface reflectivity

### 4. **Pedestal/Base Structure**
```javascript
{/* Pedestal Shadow */}
<motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2">
  <div className="w-48 h-6 bg-gradient-to-b from-muted to-accent/30 rounded-full shadow-lg" />
  <div className="w-40 h-4 bg-gradient-to-b from-accent/40 to-accent/20 rounded-full mx-auto -mt-1" />
</motion.div>
```
- **Two-layered design**: Creates depth with overlapping circles
- **Gradient**: from-muted to accent/30
- **Shadow**: shadow-lg for elevation
- **Animation**: Fades in over 0.8s with 0.6s delay

---

## Motion Layers

### Layer 1: Container Scroll Animation
- **Trigger**: Parent scroll event on hero section
- **Property Modified**: `y` transform (toothY)
- **Effect**: Tooth moves down 500px as user scrolls

### Layer 2: Floating Bob
- **Independent**: Runs regardless of scroll
- **Movement**: ±10px on Y-axis
- **Cycle**: 4-second loop
- **Effect**: Life-like idle bobbing

### Layer 3: Glow Pulsing
- **Timing**: 3-second cycle (different from float)
- **Opacity**: Oscillates 0.3 → 0.5
- **Effect**: Dynamic lighting/reflectivity

### Layer 4: Opacity Fade
- **Trigger**: Scroll progress 0-50%
- **Effect**: Hero content fades out as user scrolls down

---

## Animation Timing & Delays

| Element | Initial State | Delay | Duration | Trigger |
|---------|--------------|-------|----------|---------|
| Tooth Image | opacity: 0, scale: 0.8, y: 50 | 0.4s | 1s | Mount |
| Pedestal Shadow | scale: 0, opacity: 0 | 0.8s | 1s | Mount |
| Pedestal | opacity: 0, y: 30 | 0.6s | 0.8s | Mount |
| Floating Motion | - | - | 4s | Continuous |
| Glow Pulse | - | - | 3s | Continuous |
| Scroll Parallax | - | - | Dynamic | Scroll Event |

---

## Technical Implementation Details

### Libraries Used
- **Framer Motion**: Animation orchestration
- **React Hooks**: useRef, useState (if needed)
- **Tailwind CSS**: Styling and shadows

### Key Hooks
1. **useRef**: Container reference for scroll tracking
2. **useScroll**: Detects scroll progress within container
3. **useSpring**: Smooths scroll values with physics
4. **useTransform**: Maps scroll progress to animation values
5. **motion**: Framer Motion component for animations

### CSS Classes & Effects
- `drop-shadow-2xl`: Heavy shadow on tooth image
- `will-change-transform`: GPU acceleration hint
- `blur-2xl` / `blur-xl`: Gaussian blur on glow
- `rounded-full`: Circular pedestal shape
- `gradient-to-b`: Vertical gradient on pedestal

---

## Performance Optimizations

1. **will-change-transform**: GPU acceleration on animated elements
2. **drop-shadow-2xl**: Hardware-accelerated shadow
3. **pointer-events-none**: Overlay doesn't capture events
4. **Smooth motion values**: Physics-based spring prevents jank
5. **Limited glow points**: Only 2 light sources, not many

---

## Customization Points

### 1. Adjust Scroll Distance
```javascript
const toothY = useTransform(smoothProgress, [0, 1], [0, 500]) // Change 500 to desired pixel distance
```

### 2. Scale Growth
```javascript
const toothScale = useTransform(smoothProgress, [0, 1], [1, 1.8]) // Change 1.8 to new scale
```

### 3. Float Height & Speed
```javascript
animate={{ y: [0, -10, 0] }}  // Change -10 for height
transition={{ duration: 4 }}   // Change 4 for speed
```

### 4. Glow Intensity
```javascript
bg-white/40   // Change 40 to 20-60 for opacity variation
bg-accent/20  // Adjust opacity here
opacity: [0.3, 0.5, 0.3]  // Change pulsing range
```

### 5. Pedestal Styling
```javascript
from-muted to-accent/30  // Adjust gradient colors
w-48 h-6  // Change dimensions
```

---

## Interactive Behavior

### Entrance Animation (On Page Load)
1. **0.4s**: Tooth fades in and scales up
2. **0.6s**: Pedestal appears
3. **0.8s**: Pedestal shadow appears
4. **After 0.8s**: Continuous floating begins

### Scroll Interaction
- **Scroll down**: Tooth moves down + scales up + text fades
- **Scroll up**: Reverse all transformations
- **Physics**: Spring dampening creates natural, smooth feel

### Continuous Effects
- **Floating**: Smooth ±10px bob every 4 seconds
- **Glow**: Pulsing light reflection every 3 seconds

---

## Visual Hierarchy

```
Background (Aurora + depth text)
  ↓
Content Grid (2 columns: text + tooth)
  ├── Left: Title, Description, CTA (with text Y parallax)
  └── Right: Tooth Container (with Y parallax + scale)
      ├── Pedestal Shadow (bottom, blurred)
      ├── Pedestal Base (layered circles)
      ├── Tooth Image (floating + drop shadow)
      └── Glow Overlay (pulsing light sources)
```

---

## Asset Requirements

- **Image**: `/images/tooth-hero.png` (PNG with transparency)
- **Size**: Responsive (w-96 sm:w-[30rem] lg:w-[42rem])
- **Quality**: High-res for sharpness on large displays

---

## Browser Compatibility

- Modern browsers with Framer Motion support
- Requires CSS transforms and filters
- Hardware acceleration supported on:
  - Chrome/Chromium
  - Firefox
  - Safari
  - Edge

---

## Code Structure

```typescript
HeroSection Component
├── Container Reference (scroll tracking)
├── Scroll Detection (useScroll + useSpring)
├── Transform Calculations (useTransform)
├── Background Layer (Aurora + depth text)
└── Main Content Grid
    ├── Left Column (Text + CTA)
    │   ├── Label animation
    │   ├── Title with depth layers
    │   ├── Description
    │   └── Button
    └── Right Column (3D Tooth)
        ├── Pedestal Shadow
        ├── Pedestal Base
        ├── Tooth Image + Float Animation
        └── Glow Overlay + Pulse Animation
```

---

## Key Takeaways

✅ **Scroll-Based Physics**: Spring smoothing creates natural deceleration  
✅ **Multi-Layer Motion**: Float, glow, and scroll animations work independently  
✅ **Visual Depth**: Shadows, gradients, and glow create 3D illusion  
✅ **Performance-Optimized**: GPU acceleration on transforms  
✅ **Responsive Design**: Scales across breakpoints (sm, lg)  
✅ **Continuous Motion**: Life-like floating and pulsing effects  
✅ **Interactive**: Responds to user scroll with smooth parallax  

---

## Usage Example

To use this component in your app:

```typescript
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      {/* Rest of page content */}
    </div>
  )
}
```

The component is fully self-contained and handles all animation logic internally.
