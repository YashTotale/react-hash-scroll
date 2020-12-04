//React Imports
import { FC, ReactElement, cloneElement } from "react";
import useHashScroll from "../Hooks/useHashScroll";

//Utils
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
  behavior,
  position,
  requiredPathname,
  scrollFunc,
}) => {
  const childRef = useHashScroll(hash, {
    behavior,
    position,
    requiredPathname,
    scrollFunc,
  });

  return cloneElement(children, {
    ref: childRef,
  });
};

export default HashScroll;
