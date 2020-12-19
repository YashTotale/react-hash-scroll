### MultiHash

#### Summary

Component that pairs hashes with refs and scrolls when one of the hashes is present in the url to a corresponding ref

#### Demo

[![View Multi Hash Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-hash-scroll-demos-ge3b4?initialpath=multi-hash&module=/src/Demos/MultiHashDemo.tsx)

#### Props

`hashes`

- **Required**
- An object specifying the hashes and the refs or refs with options ([behavior](#behavior), [position](#position), [requiredPathname](#requiredpathname), [scrollFunc](#scrollfunc)) they correspond to
- Hashes can include or exclude leading "#"

[`behavior`](#behavior)

- Applies to all hashes unless overridden by a ref with options

[`position`](#position)

- Applies to all hashes unless overridden by a ref with options

[`requiredPathname`](#requiredpathname)

- Applies to all hashes unless overridden by a ref with options

[`scrollFunc`](#scrollfunc)

- Applies to all hashes unless overridden by a ref with options

#### Example

```javascript
import React from "react";
import { BrowserRouter } from "react-router-dom"; //Can use HashRouter or MemoryRouter as well
import { MultiHash } from "react-hash-scroll";

const App = () => {
  const ref1 = React.createRef();
  const ref2 = React.createRef();
  const ref3 = React.createRef();

  return (
    <BrowserRouter>
      <MultiHash
        hashes={{
          "#div": ref1,
          "#heading": [ref2, { behavior: "smooth" }],
          "#paragraph": [
            ref3,
            { position: "start", requiredPathname: ["/docs", "/contact"] },
          ],
        }}
        requiredPathname="/docs"
      />
      <div ref={ref1}>Element #1</div>
      <h4 ref={ref2}>Element #2</h4>
      <p ref={ref3}>Element #3</p>
    </BrowserRouter>
  );
};
```
