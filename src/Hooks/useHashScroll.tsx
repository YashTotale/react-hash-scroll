// React Imports
import { useRef, useEffect, RefObject } from "react";
import { useLocation } from "react-router-dom";

import { BaseScrollOptions } from "../Utils/types";
import { DEFAULT_SCROLL_FUNC } from "../Utils/functions";
import {
  DEFAULT_SCROLL_BEHAVIOR,
  DEFAULT_SCROLL_POSITION,
} from "../Utils/constants";

function useHashScroll<T extends HTMLElement>(
  hash: string,
  options: Partial<BaseScrollOptions> = {}
): RefObject<T> {
  const { hash: urlHash, pathname } = useLocation();

  const ref = useRef<T>(null);

  const {
    behavior = DEFAULT_SCROLL_BEHAVIOR,
    position = DEFAULT_SCROLL_POSITION,
    scrollFunc = DEFAULT_SCROLL_FUNC,
  } = options;

  let { requiredPathname } = options;

  if (hash.charAt(0) !== "#") {
    hash = "#" + hash;
  }

  if (typeof requiredPathname === "string") {
    requiredPathname = [requiredPathname];
  }

  useEffect(() => {
    if (
      urlHash === hash &&
      (requiredPathname === undefined || requiredPathname.includes(pathname))
    ) {
      if (ref.current) {
        scrollFunc(ref, behavior, position);
      }
    }
  }, [
    urlHash,
    ref,
    hash,
    requiredPathname,
    pathname,
    scrollFunc,
    behavior,
    position,
  ]);

  return ref;
}

export default useHashScroll;
