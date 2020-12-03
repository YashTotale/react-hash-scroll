### ChildrenHash

#### Summary

Scrolls to corresponding child element when one of the hashes is present in the url

#### Demo

[![View Children Hash Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-hash-scroll-demos-ge3b4?initialpath=children-hash&module=/src/Demos/ChildrenHashDemo.tsx)

#### Props

`hashes`

- **Required**
- Array of hashes or hashes with scroll options ([behavior](#behavior), [position](#position), [requiredPathname](#requiredpathname), [scrollFunc](#scrollfunc))
- Hashes can include or exclude leading "#"
- Length should be equal to children length

[`behavior`](#behavior)

[`position`](#position)

[`requiredPathname`](#requiredpathname)

[`scrollFunc`](#scrollfunc)

#### Example

```javascript
import React from "react";
import { BrowserRouter } from "react-router-dom"; //Can use HashRouter or MemoryRouter as well
import { ChildrenHash } from "react-hash-scroll";

const App = () => {
  return (
    <BrowserRouter>
      <ChildrenHash
        hashes={[
          "#div",
          { hash: "#heading", behavior: "smooth" },
          { hash: "#paragraph", position: "end" },
        ]}
        requiredPathname={["/login", "/signup"]}
      >
        <div ref={ref1}>Element #1</div>
        <h4 ref={ref2}>Element #2</h4>
        <p ref={ref3}>Element #3</p>
      </ChildrenHash>
    </BrowserRouter>
  );
};
```
