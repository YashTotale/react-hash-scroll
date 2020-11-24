import { RefObject } from "react";

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
