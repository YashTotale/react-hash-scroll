<h1 align="center">
  <br>
    <a href="https://github.com/YashTotale/react-hash-scroll/blob/main/static/icon.svg"><img src="https://raw.githubusercontent.com/YashTotale/react-hash-scroll/cc2728f850fb8332a9ba22717faf70e1e74a30a6/static/icon.svg" alt="React Hash Scroll" width="200"></a>
  <br>
  <br>
  <b>React Hash Scroll</b>
  <br>
  <br>
  <!-- Version -->
  <a href="https://www.npmjs.com/package/react-hash-scroll"><img src="https://img.shields.io/npm/v/react-hash-scroll?logo=npm&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Version" alt="Version"></a>&nbsp;
</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/react-hash-scroll"><img src="https://img.shields.io/npm/dw/react-hash-scroll?logo=npm&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Downloads" alt="Downloads"></a>&nbsp;
    <a href="https://travis-ci.com/github/YashTotale/react-hash-scroll"><img src="https://img.shields.io/travis/com/YashTotale/react-hash-scroll?logo=travis-ci&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Build" alt="Build"></a>&nbsp;
    <a href="https://lgtm.com/projects/g/YashTotale/react-hash-scroll/context:javascript"><img src="https://img.shields.io/lgtm/grade/javascript/github/YashTotale/react-hash-scroll?logo=lgtm&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Code%20Quality" alt="Code Quality"></a>&nbsp;
</p>

_Table Of Contents_

- [Installation](#installation)
- [Usage](#usage)
  - [HashScroll](#hashscroll)
  - [MultiHash](#multihash)
- [Components](#components)

---

## Installation

Using [npm](https://www.npmjs.com):

```shell
npm install --save react-hash-scroll
```

Using [yarn](https://yarnpkg.com/):

```shell
yarn add react-hash-scroll
```

---

## Usage

**Note**: [react-router-dom](https://reactrouter.com/web/) is required as a peer dependency and all components must be wrapped in a [Router](https://reactrouter.com/web/api/BrowserRouter)

### HashScroll

```javascript
import React from "react";
import { BrowserRouter } from "react-router-dom"; //Can use HashRouter or MemoryRouter as well
import { HashScroll } from "react-hash-scroll";

const App = () => {
  return (
    <BrowserRouter>
      <HashScroll hash="#hash1">
        <HashChild>Scroll #1</HashChild>
      </HashScroll>
      <HashScroll hash="#hash2">
        <div>Scroll #2</div>
      </HashScroll>
    </BrowserRouter>
  );
};

const HashChild = React.forwardRef((props, ref)) => ( // Must forward refs for custom component children
  <div ref={ref}>{props.children}</div>
)
```

### MultiHash

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
          "#paragraph": [ref3, { position: "center" }],
        }}
      />
      <div ref={ref1}>Element #1</div>
      <h4 ref={ref2}>Element #3</h4>
      <p ref={ref3}>Element #2</p>
    </BrowserRouter>
  );
};
```

## Components
