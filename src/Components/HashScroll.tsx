import { useRef, FC, ReactElement, cloneElement, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_SCROLL_BEHAVIOR,
  DEFAULT_SCROLL_POSITION,
} from "../Utils/constants";
import { BaseScrollOptions } from "../Utils/types";

export interface HashScrollProps extends Partial<BaseScrollOptions> {
  /**
   * The [hash](https://www.oho.com/blog/explained-60-seconds-hash-symbols-urls-and-seo#:~:text=A%20hash%20sign%20(%23)%20in,specific%20subsection%20of%20that%20document.) that should trigger scroll to the element
   *
   * Can include or exclude leading "#"
   *
   * Examples:
   * - "#example"
   * - "example"
   *
   * Type: string
   */
  hash: string;
  /**
   * The Element to scroll to
   */
  children: ReactElement<any, any>;
}

/**
 * Scrolls to child element when the specified hash is present in the url
 *
 * Note: **ONLY** 1 child element allowed
 */
const HashScroll: FC<HashScrollProps> = ({
  hash,
  children,
  behavior = DEFAULT_SCROLL_BEHAVIOR,
  position = DEFAULT_SCROLL_POSITION,
  requiredPathname,
  scrollFunc,
}) => {
  const { hash: urlHash, pathname } = useLocation();

  const childRef = useRef<HTMLElement>(null);

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
      if (childRef.current) {
        if (scrollFunc) scrollFunc(childRef, behavior, position);
        else
          childRef.current.scrollIntoView({
            behavior,
            block: position,
            inline: position,
          });
      }
    }
  }, [urlHash, childRef, hash]);

  return cloneElement(children, {
    ref: childRef,
  });
};

export default HashScroll;
