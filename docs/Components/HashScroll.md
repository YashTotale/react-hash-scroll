### HashScroll

Scrolls to child element when the specified hash is present in the url

#### Props

`hash`

- **Required**
- Type: `string`
- The [hash](<https://www.oho.com/blog/explained-60-seconds-hash-symbols-urls-and-seo#:~:text=A%20hash%20sign%20(%23)%20in,specific%20subsection%20of%20that%20document.>) that should trigger scroll to the element
- Can include or exclude leading "#"
- Examples:
  - "#example"
  - "example"

[`behavior`](#behavior)

[`position`](#position)

[`requiredPathname`](#requiredpathname)

[`scrollFunc`](#scrollfunc)

`children`

- **Required**
- Type: `ReactElement`
- Must be a singular child (which **CANNOT** be text)
- Custom children must forward refs to a dom element

#### Example

```javascript
import React from "react";
import { BrowserRouter } from "react-router-dom"; //Can use HashRouter or MemoryRouter as well
import { HashScroll } from "react-hash-scroll";

const App = () => {
  return (
    <BrowserRouter>
      <HashScroll hash="#hash1" position="center">
        <HashChild>Element #1</HashChild>
      </HashScroll>
      <HashScroll hash="#hash2" requiredPathname="/docs">
        <div>Element #2</div>
      </HashScroll>
      <HashScroll hash="#example" position="end">
        Hello! (This does not work! Neither does <>Hello!</>) Children must be elements!
      </HashScroll>
    </BrowserRouter>
  );
};

const HashChild = React.forwardRef((props, ref)) => ( // Must forward refs for custom HashScroll children
  <div ref={ref}>{props.children}</div>
)
```