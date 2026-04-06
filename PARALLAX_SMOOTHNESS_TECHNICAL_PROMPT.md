# Technical Prompt: Smooth Parallax Effect Animation (Up & Down)

## Overview
This document details the technical implementation of smooth, jank-free parallax animations where elements move smoothly in response to scroll events, with no stuttering or frame drops.

---

## Core Problem: Why Parallax Gets Janky

**Common Issues:**
- Direct scroll event listeners firing 60+ times/sec (blocking main thread)
- Synchronous DOM updates on every scroll event
- Layouts/reflows before paint cycles
- Missing GPU acceleration (transform instead of position)
- Insufficient damping causing jerky motion
- Spring config mismatch with visual expectations

---

## Solution Architecture

### 1. Scroll Detection Layer (Framer Motion)

```
useScroll() Hook Implementation:
└─ Tracks: scrollYProgress (0 to 1 as user scrolls target element)
   ├─ Target: containerRef (specific DOM element)
   ├─ Offset: ["start start", "end start"] (viewport trigger points)
   └─ Output: MotionValue (reactive, non-blocking)
```

**Why This Works:**
- Non-blocking: Runs on separate animation frame
- Passive: Doesn't interfere with scroll performance
- Reactive: Automatically updates without manual event listeners
- Granular: Scroll progress normalized to 0-1 range

**Technical Details:**
```javascript
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"], // When element enters until leaves viewport
})
// scrollYProgress: MotionValue<number> (0 → 1)
```

---

### 2. Spring Smoothing (The Critical Layer)

```javascript
const smoothProgress = useSpring(scrollYProgress, {
  mass: 0.1,          // Lower = faster response, snappier
  stiffness: 100,     // Higher = tighter spring, less overshoot
  damping: 20,        // Higher = less oscillation, more stable
  restDelta: 0.001    // Precision threshold for "at rest" detection
})
```

**What This Does:**
- **Mass (0.1):** Object "weight" - lower mass responds faster to scroll
- **Stiffness (100):** Spring tension - prevents laggy feel
- **Damping (20):** Energy dissipation - smooths overshoot
- **restDelta (0.001):** Stops animation when close enough to target

**Spring Physics Equation:**
```
acceleration = (stiffness * (target - current) - damping * velocity) / mass
```

**Visual Effect:**
- Without spring: Jerky, frame-by-frame movement
- With spring: Smooth interpolation between scroll events
- Good config: Feels like element has "weight" but no lag

---

### 3. Transform Mapping (Linear Relationships)

```javascript
const toothY = useTransform(smoothProgress, [0, 1], [0, 500])
const toothScale = useTransform(smoothProgress, [0, 1], [1, 1.8])
const textY = useTransform(smoothProgress, [0, 1], [0, 50])
const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
```

**Mapping Logic:**
```
Input range  → Output range
[0, 1]       → [0, 500]  (linear interpolation)
|            |
Start scroll End scroll
(0% Y)       (500px Y)
```

**Mathematical Formula:**
```
output = outputStart + (outputEnd - outputStart) * (input - inputStart) / (inputEnd - inputStart)
output = 0 + (500 - 0) * (smoothProgress - 0) / (1 - 0)
output = 500 * smoothProgress
```

---

### 4. GPU-Accelerated Rendering

```javascript
// ✅ Good: GPU accelerated
style={{ 
  transform: `translateY(${toothY}px) scale(${toothScale})`,
  willChange: "transform"
}}

// ❌ Bad: CPU heavy
style={{ 
  top: `${toothY}px`,  // Triggers layout recalculation
  width: `${scale * 100}%`  // Reflow on every frame
}}
```

**Why Transform is Better:**
1. **Compositing:** Browser renders to separate layer
2. **No Layout:** Doesn't trigger reflow/repaint
3. **GPU:** Uses graphics card, not CPU
4. **Performance:** 60fps on mobile devices

**will-change Property:**
```css
will-change: transform;  /* Tell browser to optimize for transforms */
```

---

## Multi-Layer Animation Stack

### Element: Tooth Image

```
Layer 1: Scroll Response
├─ Y Position: toothY (0 → 500px, based on scroll)
├─ Scale: toothScale (1 → 1.8, grows as scrolls)
└─ Duration: Instant (follows scroll directly)

Layer 2: Floating Animation
├─ Y Offset: animate={{ y: [0, -10, 0] }}
├─ Duration: 4 seconds (continuous)
├─ Easing: easeInOut (smooth wave)
└─ Type: Loop (Number.POSITIVE_INFINITY)

Layer 3: Entry Animation
├─ Initial: { opacity: 0, scale: 0.8, y: 50 }
├─ Animate: { opacity: 1, scale: 1, y: 0 }
├─ Duration: 1 second
└─ Delay: 0.4 seconds

Combined Transform:
transform = translate(scrollY + floatingY) scale(scrollScale) rotate(scrollRotation)
```

**Order Matters:**
1. Apply scroll transform FIRST (primary motion)
2. Add floating animation (secondary, additive)
3. Initial state irrelevant after scroll starts

---

## Smoothness Optimization Parameters

### Parameter Tuning Table

| Parameter | Value | Effect | Notes |
|-----------|-------|--------|-------|
| **mass** | 0.1 | Lower = snappier response | Decrease for instant feel |
| **stiffness** | 100 | Higher = tighter spring | Increase if laggy |
| **damping** | 20 | Higher = less bounce | Increase to eliminate overshoot |
| **restDelta** | 0.001 | Lower = more precise | Don't go below 0.0001 |
| **Scroll offset** | ["start start", "end start"] | When animation activates | Adjust trigger point |
| **Transform range** | [0, 500] | Total pixel travel | Increase for more movement |
| **Float duration** | 4s | Bounce cycle time | Shorter = faster bob |
| **Float distance** | ±10px | Bounce height | Increase for more float |

---

## Diagnosing Jank Issues

### Problem: Animation Stutters When Scrolling

**Causes & Fixes:**

1. **Scroll Listener on Main Thread**
   - ❌ Problem: `window.addEventListener('scroll', handler)`
   - ✅ Fix: Use `useScroll()` (off main thread)

2. **Direct DOM Manipulation**
   - ❌ Problem: `element.style.top = scrollY + 'px'`
   - ✅ Fix: Use `useTransform()` + Framer Motion

3. **Wrong Spring Config**
   - ❌ Problem: `damping: 5` (bouncy), `mass: 1` (sluggish)
   - ✅ Fix: `damping: 20`, `mass: 0.1` (smooth response)

4. **Missing will-change**
   - ❌ Problem: No optimization hints to browser
   - ✅ Fix: Add `will-change: transform` on animated elements

5. **Too Many Transforms**
   - ❌ Problem: `transform: rotate(${r}) scale(${s}) translate(${x}, ${y})`
   - ✅ Fix: Batch transforms, use matrix3d for complex animations

6. **Floating Animation Conflicts**
   - ❌ Problem: `animate={{ y: toothY }}` overrides scroll motion
   - ✅ Fix: Stack layers - scroll on parent, float on child

---

## Advanced Smoothing Techniques

### Technique 1: Velocity-Based Damping

```javascript
// React to scroll speed, not just position
const { scrollYProgress, scrollY } = useScroll()
const velocity = useVelocity(scrollY)

const dampedProgress = useTransform(
  [scrollYProgress, velocity],
  ([progress, vel]) => {
    const speedFactor = Math.min(Math.abs(vel) / 500, 1)
    return progress * (1 - speedFactor * 0.3) // Slower response at high speed
  }
)
```

**Effect:** Element "lags behind" more on fast scrolls, appears heavier

### Technique 2: Easing Functions for Transform Ranges

```javascript
// Custom easing on transform output
const toothY = useTransform(
  smoothProgress,
  [0, 0.5, 1],              // Input checkpoints
  [0, 200, 500],            // Output checkpoints
  { mixer: (a, b, t) => interpolate(a, b, t, "easeInOut") }
)
```

**Effect:** Acceleration/deceleration on movement (slow start, fast middle, slow end)

### Technique 3: Responsive Spring Config

```javascript
const isMobile = useMediaQuery("(max-width: 768px)")

const springConfig = isMobile 
  ? { mass: 0.15, stiffness: 80, damping: 15 }  // More responsive for mobile
  : { mass: 0.1, stiffness: 100, damping: 20 }  // Standard desktop

const smoothProgress = useSpring(scrollYProgress, springConfig)
```

**Effect:** Different smoothness curves per device

---

## Performance Benchmarking

### Metrics to Measure

```javascript
// FPS Counter (add to page)
let fps = 0
let lastTime = performance.now()
let frameCount = 0

function measureFPS() {
  frameCount++
  const currentTime = performance.now()
  
  if (currentTime - lastTime >= 1000) {
    fps = frameCount
    frameCount = 0
    lastTime = currentTime
    console.log(`[v0] FPS: ${fps}`)
  }
  
  requestAnimationFrame(measureFPS)
}

// Chrome DevTools Performance Tab:
// 1. Open DevTools → Performance tab
// 2. Click record, scroll element, stop
// 3. Look for:
//    - Frame rate dips below 60fps?
//    - Long tasks blocking main thread?
//    - Jank in the timeline?
```

---

## Implementation Checklist

- [ ] Use `useScroll()` for scroll detection (not manual listeners)
- [ ] Apply `useSpring()` to smooth scroll progress
- [ ] Use `useTransform()` for position/scale mappings
- [ ] Apply `transform` property (not `top`/`left`/`width`)
- [ ] Add `will-change: transform` to animated elements
- [ ] Test spring config on target devices
- [ ] Verify 60fps with DevTools Performance tab
- [ ] Add floating animations to separate child elements
- [ ] Test with slow/fast scrolling patterns
- [ ] Profile on mobile devices (most likely to show jank)

---

## Code Template: Optimized Parallax

```javascript
'use client'

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

export function SmoothParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Step 1: Detect scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })
  
  // Step 2: Smooth the scroll progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  })
  
  // Step 3: Map scroll progress to visual properties
  const yPosition = useTransform(smoothProgress, [0, 1], [0, 500])
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.8])
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  
  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Animated Element */}
      <motion.div
        style={{
          y: yPosition,
          scale: scale,
          opacity: opacity,
        }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        {/* Floating sub-animation */}
        <motion.img
          src="/your-image.png"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-96 h-auto"
        />
      </motion.div>
    </div>
  )
}
```

---

## Summary

**For Buttery Smooth Parallax:**

1. **Scroll Detection:** `useScroll()` (reactive, non-blocking)
2. **Smoothing:** `useSpring()` with tuned config (0.1 mass, 100 stiffness, 20 damping)
3. **Transforms:** `useTransform()` mapping ranges (linear interpolation)
4. **GPU:** Use `transform`, not `position` properties
5. **Layering:** Stack scroll motion + floating animation separately
6. **Testing:** Measure 60fps in DevTools, test on mobile

Result: Smooth, jank-free parallax that responds instantly to scroll with natural physics.
