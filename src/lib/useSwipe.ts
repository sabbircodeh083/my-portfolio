"use client";

import { useRef, type TouchEvent } from "react";

/** Minimum horizontal travel before a drag counts as a swipe. */
const MIN_DISTANCE = 56;
/** A swipe must be this much more horizontal than vertical. */
const DIRECTION_RATIO = 1.4;

interface SwipeOptions {
  /** `1` for a left swipe (forwards), `-1` for a right swipe (backwards). */
  onSwipe: (direction: -1 | 1) => void;
  /** Return true for touches that should stay with the element (e.g. a link). */
  shouldIgnore?: (target: EventTarget | null) => boolean;
}

/**
 * Touch handlers that turn a horizontal drag into a swipe, while leaving taps
 * and vertical page scrolling alone. Spread the result onto any element:
 *
 * ```tsx
 * <section {...useSwipe({ onSwipe: (direction) => step(direction) })}>
 * ```
 */
export function useSwipe({ onSwipe, shouldIgnore }: SwipeOptions) {
  const start = useRef<{ x: number; y: number } | null>(null);

  function onTouchStart(event: TouchEvent<HTMLElement>) {
    if (shouldIgnore?.(event.target)) {
      start.current = null;
      return;
    }

    const touch = event.touches[0];
    start.current = { x: touch.clientX, y: touch.clientY };
  }

  function onTouchEnd(event: TouchEvent<HTMLElement>) {
    const origin = start.current;
    start.current = null;
    if (!origin) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - origin.x;
    const deltaY = touch.clientY - origin.y;

    // Ignore taps, vertical scrolling, and short drags.
    if (Math.abs(deltaX) < MIN_DISTANCE || Math.abs(deltaX) < Math.abs(deltaY) * DIRECTION_RATIO) {
      return;
    }

    onSwipe(deltaX < 0 ? 1 : -1);
  }

  return { onTouchStart, onTouchEnd };
}
