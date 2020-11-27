import { RefObject } from "react";

/**
 * The default scroll function used by all components of this library
 */
export const DEFAULT_SCROLL_FUNC = (
  ref: RefObject<HTMLElement>,
  behavior: ScrollBehavior,
  position: ScrollLogicalPosition
): void =>
  ref.current?.scrollIntoView({
    behavior,
    block: position,
    inline: position,
  });
