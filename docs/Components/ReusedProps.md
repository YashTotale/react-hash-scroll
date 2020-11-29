### Reused Props

Props that are used by multiple components

#### behavior

- The behavior of the scroll
- Note: not all browsers have implemented options for [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) (which is what React Hash Scroll uses internally) - see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) and [Can I Use](https://caniuse.com/scrollintoview) - there is also a [browser polyfill](https://github.com/iamdustan/smoothscroll) for smooth scrolling which you can install separately so smooth scrolling will work in all browsers
- Type:
  - "smooth": Smooth scroll (_Default_)
  - "auto": Instant scroll

#### position

- The position of the element on the page after it is scrolled to
- Like [behavior](#behavior), some browsers don't support [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) options yet, so this property may not work on all browsers.
- Type:
  - "center": Element will scroll to center of page (_Default_)
  - "end": Element will scroll to bottom of page
  - "start": Element will scroll to top of page
  - "nearest": Element will scroll to center/end/start depending on which one is closest

#### requiredPathname

- Only scroll on a specific pathname(s)
- Note: "/" matches to the website name with no pathname
- **Don't** end pathnames with "/" (Ex. "/test/")
- For example, to only scroll on:
  - **/home/contact**: "/home/contact"
  - **/docs** or **/features**: ["/docs", "/features"]
- Type: `string | string[]`

#### scrollFunc

- A custom scroll function that overrides the default [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) function used by React Hash Scroll
- Parameters:
  - ref: The ref object that contains the target element
  - [behavior](#behavior): The defined scroll behavior for the element or the default behavior
  - [position](#position): The defined scroll position for the element or the default position
- Type: `(ref,`[`behavior`](#behavior)`,`[`position`](#position)`) => void`
