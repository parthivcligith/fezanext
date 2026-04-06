# 3D Tooth Pop-Out & Scroll-Down Animation Prompt

## 🎯 Core Concept

Create an eye-catching animation where a 3D tooth PNG image:
1. **Breaks out of its frame** with an explosive scale and transform effect
2. **Moves downward** continuously as the user scrolls
3. **Maintains floating motion** while descending
4. **Reacts to scroll velocity** for dynamic, physics-based movement

---

## 📹 Visual Effect Breakdown

### Phase 1: Pop-Out Effect (Initial Load)
- Tooth starts **inside a contained box** with overflow hidden
- On trigger, tooth **bursts out** with:
  - Scale from 0.8 → 1.5 (30% grow burst)
  - Immediate opacity spike (0 → 1)
  - Slight rotation (-5° → 0°) for dynamic feel
  - Duration: 0.6-0.8 seconds
  - Easing: `easeOut` (cubic or back easing)

### Phase 2: Scroll-Linked Descent
- **Scroll Progress** → **Y Position** transformation
- Tooth moves DOWN the viewport as user scrolls
- Translation range: 0px → 600-800px (down)
- Uses `useScroll()` hook with container offset
- Smooth spring physics applied for natural motion
- When user scrolls 100vh, tooth moves 600-800px down

### Phase 3: Continuous Floating (Layered)
- **Independent floating animation** on top of scroll movement
- Amplitude: ±15px (moves up/down)
- Duration: 4 seconds per cycle
- Easing: `easeInOut` for natural bob
- Works simultaneously with scroll movement (not replaced by it)

---

## 🎨 Implementation Strategy

### Layout Structure
```
<AuroraBackground (container with scroll tracking)>
  
  <motion.div (pop-out frame container - overflow: hidden)>
    
    <motion.img (tooth - pops out)>
      - Initial: scale(0.8), y: -50px, opacity: 0
      - Animate: scale(1.5), y: 0, opacity: 1
      - style={{ y: scrollY_transform + float_animation }}
    
    <motion.div (glow overlay - pops with tooth)>
  
</motion.div>

</AuroraBackground>
```

### Three-Layer Transform Stack
```javascript
const finalPosition = baseScrollPosition + floatingOffset + popOutAdjustment
```

1. **Base Scroll Movement** (dominant): Controlled by `useScroll()` + `useTransform()`
2. **Floating Bounce** (additive): Independent `animate={{ y: [0, -15, 0] }}`
3. **Pop-Out Burst** (initial): Entry animation with spring physics

---

## 🔧 Code Logic & Features

### 1. **Scroll Detection Setup**
```javascript
const containerRef = useRef<HTMLDivElement>(null)
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end center"], // Adjust trigger point
})

// Smooth spring physics
const smoothProgress = useSpring(scrollYProgress, {
  mass: 0.1,        // Light mass = responsive
  stiffness: 100,   // Moderate stiffness
  damping: 20,      // Smooth damping
  restDelta: 0.001  // Fine-tuned smoothness
})
```

### 2. **Scroll-to-Y Position Mapping**
```javascript
// When scroll completes 100%, tooth moves 600px down
const toothY = useTransform(
  smoothProgress, 
  [0, 1],           // Progress: 0% to 100%
  [0, 600]          // Y movement: 0px to 600px
)

// Optional: Scale growth while descending
const toothScale = useTransform(
  smoothProgress,
  [0, 1],
  [1, 1.2]          // Grows slightly as it descends
)

// Optional: Opacity fade out
const toothOpacity = useTransform(
  smoothProgress,
  [0, 0.7, 1],      // Fade at 70% scroll
  [1, 1, 0.3]       // Keep visible until near end
)
```

### 3. **Pop-Out Entry Animation**
```javascript
<motion.div
  initial={{
    opacity: 0,
    scale: 0.8,
    y: -50,           // Slightly up
    rotate: -5        // Subtle tilt
  }}
  animate={{
    opacity: 1,
    scale: 1.3,       // Pop out bigger
    y: 0,
    rotate: 0
  }}
  transition={{
    duration: 0.7,
    delay: 0.2,
    type: "spring",
    stiffness: 120,
    damping: 15       // Bouncy pop effect
  }}
>
```

### 4. **Floating Motion (Layered on Scroll)**
```javascript
<motion.img
  src="/images/tooth-hero.png"
  alt="3D Tooth"
  className="w-96 sm:w-[30rem] lg:w-[42rem]"
  // IMPORTANT: Combine scroll Y with float animation
  style={{
    y: toothY,  // Scroll-based movement
  }}
  animate={{
    y: [0, -15, 0],   // ADDITIVE floating
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }}
/>
```

**Why this works:**
- `style={{ y: toothY }}` = Scroll movement (primary)
- `animate={{ y: [...] }}` = Floating bounce (secondary)
- Framer Motion **stacks** these transforms automatically

### 5. **Glow Overlay Pop-Out**
```javascript
<motion.div
  className="absolute inset-0 pointer-events-none"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  // This pops out WITH the tooth
>
  <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-white/40 rounded-full blur-2xl" />
  <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl" />
</motion.div>
```

### 6. **Pedestal Shadow Movement (Optional)**
The pedestal/shadow can optionally:
- Fade and move down with the tooth
- Scale differently than the tooth
- Stay fixed in the viewport

```javascript
const pedestalY = useTransform(smoothProgress, [0, 1], [0, 300]) // Move slower
const pedestalOpacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 1, 0.2])

<motion.div style={{ y: pedestalY, opacity: pedestalOpacity }}>
  {/* Pedestal base */}
</motion.div>
```

---

## 🎬 Animation Timeline (Per Scroll)

| Scroll % | Tooth Y | Tooth Scale | Float Offset | Visual State |
|----------|---------|-------------|--------------|--------------|
| 0%       | 0px     | 1.3x        | 0px          | Pop-out peak, floating start |
| 25%      | 150px   | 1.25x       | -8px         | Descending, mid-float |
| 50%      | 300px   | 1.2x        | +5px         | Mid-viewport, floating cycle |
| 75%      | 450px   | 1.1x        | -10px        | Lower, fading slightly |
| 100%     | 600px   | 1.0x        | +0px         | Near bottom, minimal scale |

---

## ✨ Advanced Features & Customizations

### 1. **Scroll Velocity Damping**
Add responsiveness based on scroll speed:
```javascript
const scrollVelocity = useVelocity(scrollYProgress)

const velocityMultiplier = useTransform(
  scrollVelocity,
  [0, 1, 2],
  [0.8, 1, 1.2]
)

// Apply to glow opacity
style={{ opacity: velocityMultiplier }}
```

### 2. **Parallax Layers**
Create depth with multiple elements:
```javascript
const toothY1 = useTransform(smoothProgress, [0, 1], [0, 600])
const toothY2 = useTransform(smoothProgress, [0, 1], [0, 450])  // Shadow moves slower
const toothY3 = useTransform(smoothProgress, [0, 1], [0, 300])  // Text moves slowest
```

### 3. **Rotation During Descent (Optional)**
Add subtle spinning:
```javascript
const toothRotate = useTransform(
  smoothProgress,
  [0, 1],
  [0, 180]  // 180° rotation
)

style={{ y: toothY, rotate: toothRotate }}
```

### 4. **Perspective Depth**
Create 3D feel:
```javascript
<div style={{ perspective: "1000px" }}>
  <motion.img
    style={{
      y: toothY,
      rotateX: useTransform(scrollYProgress, [0, 1], [0, 15])
    }}
  />
</div>
```

### 5. **Breakpoint-Aware Animation**
Adjust scroll range by screen size:
```javascript
const isMobile = useMediaQuery('(max-width: 640px)')
const scrollRange = isMobile ? [0, 400] : [0, 600]
const toothY = useTransform(smoothProgress, [0, 1], scrollRange)
```

---

## 🎯 Fine-Tuning Parameters

### To Make Tooth Pop Faster
- Decrease `duration` in pop-out animation (0.5s instead of 0.8s)
- Increase `stiffness` in spring config (140 instead of 120)

### To Make Scroll Movement Slower
- Change `useTransform` range: `[0, 1], [0, 400]` (was 600)
- Increase spring `damping` (25 instead of 20)

### To Increase Float Height
- Change `animate={{ y: [0, -20, 0] }}` (was -15px)

### To Make Float Faster
- Change `duration: 2` (was 4 seconds)

### To Change Trigger Point
- Modify `offset: ["start start", "end center"]`
  - `"start start"` = Start animation when element enters viewport
  - `"end start"` = Start animation when element exits top
  - `"center center"` = When element is at viewport center

---

## 🏗️ Component Structure

```typescript
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  })

  const smoothProgress = useSpring(scrollYProgress, { /* ... */ })
  
  const toothY = useTransform(smoothProgress, [0, 1], [0, 600])
  const toothScale = useTransform(smoothProgress, [0, 1], [1, 1.2])
  const floatingY = useMotionTemplate`${toothY}`

  return (
    <div ref={containerRef}>
      {/* Pop-out frame container */}
      <motion.div style={{ overflow: "hidden", borderRadius: "20px" }}>
        
        {/* Main tooth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1.3, y: 0 }}
          transition={{ /* pop-out config */ }}
          style={{ y: toothY, scale: toothScale }}
        >
          <motion.img
            src="/tooth.png"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Glow overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* Glow elements */}
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  )
}
```

---

## 🚀 Implementation Checklist

- [ ] Set `ref={containerRef}` on AuroraBackground or parent
- [ ] Initialize `useScroll()` with correct offset
- [ ] Apply `useSpring()` for smooth physics
- [ ] Map scroll progress to Y position with `useTransform()`
- [ ] Add initial pop-out animation with spring
- [ ] Layer floating animation on top of scroll Y
- [ ] Ensure glow overlay pops out with tooth
- [ ] Test on mobile (adjust scroll range if needed)
- [ ] Verify overlay opacity/scale doesn't break glow effect
- [ ] Add optional scale/opacity transforms for parallax
- [ ] Test scroll velocity responsiveness

---

## 🎨 Visual Reference

```
Page Load:
  [Tooth] (scale: 0.8, opacity: 0, rotate: -5°)
  ↓ (0.7s spring animation)
  [Tooth] (scale: 1.3, opacity: 1, rotate: 0°) ← POP OUT!

User Scrolls Down:
  [Tooth] moves 600px down ← SCROLL MOVEMENT
  + [Floating -15px, -10px, +5px...] ← CONTINUOUS BOB
  = Dynamic, layered motion

Result:
  Tooth pops explosively into view, then gracefully descends
  while continuously floating, creating eye-catching effect
```

---

## 🔌 Dependencies

- `framer-motion` (v10+): `useScroll`, `useTransform`, `useSpring`, `motion`
- React: `useRef`
- Tailwind CSS: For styling container/effects

---

## 📝 Notes

- The floating animation runs infinitely and independently
- Spring physics make the scroll movement feel natural, not robotic
- Layer multiple transforms for complex, engaging motion
- Test on different scroll speeds - fast scroll should feel responsive
- Glow overlay should pop WITH the tooth, not separately
- Pedestal can stay static or move with different speed (parallax)
