import { useRef, FC, ReactElement, cloneElement, useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface HashScrollProps {
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
  /**
   * The behaviour of the scroll
   *
   * Type:
   * - "smooth": Smooth scroll
   * - "auto": Instant scroll
   */
  behaviour?: "smooth" | "auto";
  /**
   * The position of the element on the page when it is scrolled to
   *
   * Type:
   * - "center": Element will scroll to center of page
   * - "end": Element will scroll to bottom of page
   * - "start": Element will scroll to top of page
   * - "nearest": Element will scroll to center/end/start depending on which one is closest
   */
  position?: "center" | "end" | "nearest" | "start";
  /**
   * Only scroll on a specific pathname(s)
   *
   * For example, to only scroll on:
   * - __/home/contact__: "/home/contact"
   * - __/docs__ or __/features__: ["/docs", "/features"]
   *
   * Note: "/" matches to no pathname
   *
   * **Don't** end pathnames with "/" (Ex. "/test/")
   *
   * Type:
   * - string
   * - string[]
   */
  requiredPathname?: string | string[];
}

/**
 * Scrolls to child element when the specified hash is present in the url
 */
const HashScroll: FC<HashScrollProps> = ({
  hash,
  children,
  behaviour = "smooth",
  position = "center",
  requiredPathname,
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
      childRef?.current?.scrollIntoView({
        behavior: behaviour,
        block: position,
        inline: position,
      });
    }
  }, [urlHash, childRef, hash]);

  return cloneElement(children, { ref: childRef });
};

export default HashScroll;
