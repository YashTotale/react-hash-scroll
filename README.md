<br>
<p align="center">
    <a href="https://github.com/YashTotale/react-hash-scroll/blob/main/static/icon.svg"><img src="https://raw.githubusercontent.com/YashTotale/react-hash-scroll/cc2728f850fb8332a9ba22717faf70e1e74a30a6/static/icon.svg" alt="React Hash Scroll" width="200"></a>
  <br>
  <h1 align="center" style="text-align: center">
    React Hash Scroll
  </h1>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/react-hash-scroll"><img src="https://img.shields.io/npm/v/react-hash-scroll?logo=npm&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Version" alt="Version"></a>&nbsp;
    <a href="https://travis-ci.com/github/YashTotale/react-hash-scroll"><img src="https://img.shields.io/travis/com/YashTotale/react-hash-scroll?logo=travis-ci&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Build" alt="Build"></a>&nbsp;
    <a href="https://lgtm.com/projects/g/YashTotale/react-hash-scroll/context:javascript"><img src="https://img.shields.io/lgtm/grade/javascript/github/YashTotale/react-hash-scroll?logo=lgtm&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Code%20Quality" alt="Code Quality"></a>&nbsp;
</p>

_Table Of Contents_

- [Installation](#installation)
- [Usage](#usage)
  - [HashScroll](#hashscroll)
  - [MultiHash](#multihash)
- [Component API](#component-api)
  - [HashScroll](#hashscroll-1)
  - [MultiHash](#multihash-1)
  - [Reused Props](#reused-props)
- [Contributing](#contributing)

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

- In this example, the div with text "Element #1" will be scrolled to the center of the page when the url hash is "#hash1".
- The div with text "Element #2" will only be scrolled to when both the hash and the pathname are "#hash2" and "/docs", respectively.

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
    </BrowserRouter>
  );
};

const HashChild = React.forwardRef((props, ref)) => ( // Must forward refs for custom HashScroll children
  <div ref={ref}>{props.children}</div>
)
```

### MultiHash

In this example, the elements will only be scrolled to on the "/docs" page.

- The div with text "Element #1" will be scrolled to when the url hash is "#div".
- Similarly, the h4 with text "Element #2" will be scrolled to smoothly when the hash is "#heading".
- Finally, if the hash is "#paragraph", the p with text "Element #3" will be scrolled to the top of the page.

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
          "#paragraph": [ref3, { position: "start" }],
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

## Component API

### HashScroll

Scrolls to child element when the specified hash is present in the url

- **hash**: string (_Required_)

  - The [hash](<https://www.oho.com/blog/explained-60-seconds-hash-symbols-urls-and-seo#:~:text=A%20hash%20sign%20(%23)%20in,specific%20subsection%20of%20that%20document.>) that should trigger scroll to the element
  - Can include or exclude leading "#"
  - Examples:
    - "#example"
    - "example"

- [behavior](#user-content-prop-behavior)
- [position](#user-content-prop-position)
- [requiredPathname](#user-content-prop-required-pathname)
- [scrollFunc](#user-content-prop-scroll-func)

- **children**: ReactElement (_Required_)

  - Must be a singular child
  - Custom children must forward refs to a dom element
  - Examples:

    ```javascript
    <HashScroll
      hash="#example"
      position="start"
      behavior="smooth"
      requiredPathname="/contact"
    >
      <div></div>
    </HashScroll>
    ```

    ```javascript
    <HashScroll
      hash="#example"
      position="nearest"
      behavior="auto"
      requiredPathname=["/docs/api", "/home"]
    >
      <CustomChild /> //This component MUST forward ref to a dom element
    </HashScroll>
    ```

### MultiHash

Component that pairs hashes with refs and scrolls to a corresponding ref when one of the hashes is present in the url

- hashes _(Required)_

  - An object specifying the hashes and the refs they correspond to
  - Hashes can include or exclude leading "#"
  - Each hash corresponds to a ref or a ref with options ([behavior](#user-content-prop-behavior), [position](#user-content-prop-position), [requiredPathname](#user-content-prop-required-pathname), [scrollFunc](#user-content-prop-scroll-func))
  - Example:

    ```javascript
    const ref1 = createRef();
    const ref2 = createRef();
    const hashes = {
      hash1: ref1,
      "#hash2": [
        ref2,
        {
          behavior: "auto",
          requiredPathname: ["/docs", "/contact"],
        },
      ],
    };

    return <MultiHash hashes={hashes} />;
    ```

- [behavior](#user-content-prop-behavior)
  - Applies to all hashes unless overriden by a ref with options
- [position](#user-content-prop-position)
  - Applies to all hashes unless overriden by a ref with options
- [requiredPathname](#user-content-prop-required-pathname)
  - Applies to all hashes unless overriden by a ref with options
- [scrollFunc](#user-content-prop-scroll-func)
  - Applies to all hashes unless overriden by a ref with options

### Reused Props

Props that are used by multiple components

- <span id="user-content-prop-behavior" name="user-content-prop-behavior">**behavior**: [ScrollBehavior](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions/behavior)</span>

  - The behavior of the scroll
  - Note: not all browsers have implemented options for [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) (which is what React Hash Scroll uses internally) - see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) and [Can I Use](https://caniuse.com/scrollintoview) - there is also a [browser polyfill](https://github.com/iamdustan/smoothscroll) for smooth scrolling which you can install separately so smooth scrolling will work in all browsers
  - Type:
    - "smooth": Smooth scroll (_Default_)
    - "auto": Instant scroll

- <span id="user-content-prop-position" name="user-content-prop-position">**position**: [ScrollPosition](https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts#L20072)</span>

  - The position of the element on the page after it is scrolled to
  - Like [behavior](#user-content-prop-behavior), some browsers don't support [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) options yet, so this property may not work on all browsers.
  - Type:
    - "center": Element will scroll to center of page (_Default_)
    - "end": Element will scroll to bottom of page
    - "start": Element will scroll to top of page
    - "nearest": Element will scroll to center/end/start depending on which one is closest

- <span id="user-content-prop-required-pathname" name="user-content-prop-required-pathname">**requiredPathname**: string | string[]</span>

  - Only scroll on a specific pathname(s)
  - Note: "/" matches to the website name with no pathname
  - **Don't** end pathnames with "/" (Ex. "/test/")
  - For example, to only scroll on:
    - **/home/contact**: "/home/contact"
    - **/docs** or **/features**: ["/docs", "/features"]

- <span id="user-content-prop-scroll-func" name="user-content-prop-scroll-func">**scrollFunc**: (ref, [behavior](#user-content-prop-behavior), [position](#user-content-prop-position)) => void</span>
  - A custom scroll function that overrides the default [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) function used by React Hash Scroll
  - Parameters:
    - ref: The ref object that contains the target element
    - [behavior](#user-content-prop-behavior): The defined scroll behavior for the element or the default behavior
    - [position](#user-content-prop-position): The defined scroll position for the element or the default position

## Contributing

- Go to the [github repository](https://github.com/YashTotale/react-hash-scroll)
- Open a new [issue](https://github.com/YashTotale/react-hash-scroll/issues/new/choose) or [pull request](https://github.com/YashTotale/react-hash-scroll/pulls)

_Check out [first contributions](https://github.com/firstcontributions/first-contributions/blob/master/README.md) if you are new to contributing_
