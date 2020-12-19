### useHashScroll

#### Summary

Creates a ref that scrolls to its assigned element when a specified hash is present in the url

#### Demo

[![View useHashScroll Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-hash-scroll-demos-ge3b4?initialpath=use-hash-scroll&module=/src/Demos/UseHashScrollDemo.tsx)

#### Params

`hash`

- **Required**
- The hash that should trigger scroll
- Can include or exclude leading "#"
- Type: `string`
- Examples:
  - "#example"
  - "example"

`options`

- Object specifying optional scroll options

  - [`behavior`](#behavior)

  - [`position`](#position)

  - [`requiredPathname`](#requiredpathname)

  - [`scrollFunc`](#scrollfunc)

#### Example

```javascript
import React from "react";
import { BrowserRouter } from "react-router-dom"; //Can use HashRouter or MemoryRouter as well
import { useHashScroll } from "react-hash-scroll";

const App = () => {
  return (
    <BrowserRouter>
      <Example
        hash="#element1"
        options={{
          behavior: "smooth",
        }}
      >
        Element #1
      </Example>
      <Example hash="#element2">Element #2</Example>
      <Example hash="#element3">Element #3</Example>
    </BrowserRouter>
  );
};

const Example = ({ children, hash, options }) => {
  const scrollRef = useHashScroll(hash, options); //options is optional

  return <div ref={scrollRef}>Scrolled to when the hash is in the url</div>;
};
```
