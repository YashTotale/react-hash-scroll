export interface BaseHashOptions {
  /**
   * The behavior of the scroll
   *
   * Type:
   * - "smooth": Smooth scroll
   * - "auto": Instant scroll
   */
  behavior: ScrollBehavior;
  /**
   * The position of the element on the page when it is scrolled to
   *
   * Type:
   * - "center": Element will scroll to center of page
   * - "end": Element will scroll to bottom of page
   * - "start": Element will scroll to top of page
   * - "nearest": Element will scroll to center/end/start depending on which one is closest
   */
  position: ScrollLogicalPosition;
  /**
   * Only scroll on a specific pathname(s)
   *
   * For example, to only scroll on:
   * - __/home/contact__: "/home/contact"
   * - __/docs__ or __/features__: ["/docs", "/features"]
   *
   * Note: "/" matches to the website name with no pathname (Ex. github.com)
   *
   * **Don't** end pathnames with "/" (Ex. "/test/")
   *
   * Type:
   * - string
   * - string[]
   */
  requiredPathname: string | string[];
}
