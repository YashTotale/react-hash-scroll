import { RefObject } from "react";

/**
 * The default scroll function used by all components of this library
 */
export const DEFAULT_SCROLL_FUNC = <T extends HTMLElement>(
  ref: RefObject<T>,
  behavior: ScrollBehavior,
  position: ScrollLogicalPosition
): void => {
  ref.current?.scrollIntoView({
    behavior,
    block: position,
    inline: position,
  });
};
