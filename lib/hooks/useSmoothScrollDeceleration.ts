import { useEffect } from "react";

let currentAnimationFrameId: number | null = null;
let scrollTimeout: NodeJS.Timeout | null = null;
let decelerationLockedUntil = 0;

export function cancelScrollDeceleration() {
  if (currentAnimationFrameId !== null) {
    cancelAnimationFrame(currentAnimationFrameId);
    currentAnimationFrameId = null;
  }
  if (scrollTimeout !== null) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  }
}

export function lockScrollDeceleration(durationMs = 1400) {
  decelerationLockedUntil = Date.now() + durationMs;
  cancelScrollDeceleration();
}

export function useSmoothScrollDeceleration() {
  useEffect(() => {
    let velocity = 0;
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      // Skip while deceleration is locked for programmatic scroll actions.
      if (Date.now() < decelerationLockedUntil) {
        return;
      }

      velocity = e.deltaY;
      isScrolling = true;

      if (scrollTimeout !== null) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        isScrolling = false;

        // Apply easing with higher friction for smoother deceleration
        let currentVelocity = velocity * 0.1;
        const friction = 0.99;
        let lastTime = performance.now();

        const animate = (currentTime: number) => {
          const deltaTime = Math.min(currentTime - lastTime, 16.67);
          lastTime = currentTime;

          window.scrollBy(0, currentVelocity);
          currentVelocity *= friction;

          if (Math.abs(currentVelocity) > 0.05) {
            currentAnimationFrameId = requestAnimationFrame(animate);
          } else {
            currentAnimationFrameId = null;
          }
        };

        currentAnimationFrameId = requestAnimationFrame(animate);
      }, 50);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeout !== null) {
        clearTimeout(scrollTimeout);
      }
      if (currentAnimationFrameId !== null) {
        cancelAnimationFrame(currentAnimationFrameId);
      }
    };
  }, []);
}
