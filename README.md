<br>
<p align="center">
    <a href="https://www.npmjs.com/package/react-hash-scroll"><img src="https://raw.githubusercontent.com/YashTotale/react-hash-scroll/main/static/icon.png" alt="React Hash Scroll" width="200"></a>
  <br>
  <h2 align="center">
    <a href="https://react-hash-scroll.web.app/">React Hash Scroll</a>
  </h2>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/react-hash-scroll"><img src="https://img.shields.io/npm/v/react-hash-scroll?logo=npm&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Version" alt="Version"></a>&nbsp;
    <a href="https://github.com/YashTotale/react-hash-scroll/actions?query=workflow%3A%22Node+CI%22"><img src="https://img.shields.io/github/workflow/status/YashTotale/react-hash-scroll/Node%20CI?logo=github&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Build" alt="Build"></a>&nbsp;
    <a href="https://lgtm.com/projects/g/YashTotale/react-hash-scroll/context:javascript"><img src="https://img.shields.io/lgtm/grade/javascript/github/YashTotale/react-hash-scroll?logo=lgtm&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Code%20Quality" alt="Code Quality"></a>&nbsp;
</p>

_Table Of Contents_

- [Installation](#installation)
- [Why this one](#why-this-one)
- [Website](#website)
- [Components](#components)
  - [HashScroll](#hashscroll)
    - [Summary](#summary)
    - [Demo](#demo)
    - [Props](#props)
    - [Example](#example)
  - [MultiHash](#multihash)
    - [Summary](#summary-1)
    - [Demo](#demo-1)
    - [Props](#props-1)
    - [Example](#example-1)
  - [ChildrenHash](#childrenhash)
    - [Summary](#summary-2)
    - [Demo](#demo-2)
    - [Props](#props-2)
    - [Example](#example-2)
- [Hooks](#hooks)
  - [useHashScroll](#usehashscroll)
    - [Summary](#summary-3)
    - [Demo](#demo-3)
    - [Params](#params)
    - [Example](#example-3)
- [Reused Props](#reused-props)
  - [behavior](#behavior)
  - [position](#position)
  - [requiredPathname](#requiredpathname)
  - [scrollFunc](#scrollfunc)
- [Contributing](#contributing)
- [More Info (Badges)](#more-info-badges)

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

Using [unpkg](https://unpkg.com/):

```html
<!-- These 3 are required as peer dependencies -->
<script src="https://unpkg.com/react/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>

<script src="https://unpkg.com/react-hash-scroll/umd/react-hash-scroll.min.js"></script>
```

You can then access the library as `window.ReactHashScroll`

---

## Why this one

There are a lot of hash scrolling React libraries out there, so why should you pick this one?

- Most other libraries rely on scrolling by id, whereas React Hash Scroll relies on ref scrolling, making it more robust for large projects
- React Hash Scroll offers built-in [TypeScript](https://www.typescriptlang.org/) support
- Extensive testing makes React Hash Scroll more dependable
- Components provided by React Hash Scroll are very customizable, making it more likely that they will fit your use case

---

## Website

<a href="https://react-hash-scroll.web.app/"><img src="https://img.shields.io/website?url=https%3A%2F%2Freact-hash-scroll.web.app%2F&style=flat-square&logo=firebase" alt="Website"></a>

The [website](https://react-hash-scroll.web.app/) compiles all the information and demos on this library in one easy-to-access place.

---

<!-- DON'T EDIT COMPONENTS HERE! EDIT COMPONENTS IN docs/Components folder! -->

## Components

**Note**: [react-router-dom](https://reactrouter.com/web/) is required as a peer dependency and all components must be wrapped in a [Router](https://reactrouter.com/web/api/BrowserRouter)

### HashScroll

#### Summary

Scrolls to the child element when the specified hash is present in the url

#### Demo

[![View Hash Scroll Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-hash-scroll-demos-ge3b4?initialpath=hash-scroll&module=/src/Demos/HashScrollDemo.tsx)

#### Props

`hash`

- **Required**
- The [hash](<https://www.oho.com/blog/explained-60-seconds-hash-symbols-urls-and-seo#:~:text=A%20hash%20sign%20(%23)%20in,specific%20subsection%20of%20that%20document.>) that should trigger scroll to the element
- Can include or exclude leading "#"
- Type: `string`
- Examples:
  - "#example"
  - "example"

`children`

- **Required**
- Must be a singular child (which **MUST** be a DOM element and **CANNOT** be text)
- Custom children must forward refs to a DOM element
- Type: `ReactElement`

[`behavior`](#behavior)

[`position`](#position)

[`requiredPathname`](#requiredpathname)

[`scrollFunc`](#scrollfunc)

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

---

### MultiHash

#### Summary

Component that pairs hashes with refs and scrolls to a corresponding ref when one of the hashes is present in the url

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

---

### ChildrenHash

#### Summary

Scrolls to a corresponding child element when one of the hashes is present in the url

#### Demo

[![View Children Hash Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-hash-scroll-demos-ge3b4?initialpath=children-hash&module=/src/Demos/ChildrenHashDemo.tsx)

#### Props

`hashes`

- **Required**
- Array of hashes or hashes with scroll options ([behavior](#behavior), [position](#position), [requiredPathname](#requiredpathname), [scrollFunc](#scrollfunc))
- Hashes can include or exclude leading "#"
- Type: `string[] | BaseScrollOptionsWithHash[]`

`children`

- **Required**
- Number of children should equal the number of hashes
- Type: `ReactElement[]`

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
        <div>Element #1</div>
        <h4>Element #2</h4>
        <p>Element #3</p>
      </ChildrenHash>
    </BrowserRouter>
  );
};
```

---

## Hooks

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

---

## Reused Props

Props that are used by multiple components

### behavior

- The behavior of the scroll
- Note: not all browsers have implemented options for [`Element.scrollIntoView`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) (which is what React Hash Scroll uses internally)
  - See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) and [Can I Use](https://caniuse.com/scrollintoview) for a comprehensive list
  - There is also a [browser polyfill](https://github.com/iamdustan/smoothscroll) for smooth scrolling which you can install separately so smooth scrolling will work in all browsers
- Type:
  - "smooth": Smooth scroll (_Default_)
  - "auto": Instant scroll

### position

- The position of the element on the page after it is scrolled to
- Like [behavior](#behavior), some browsers don't support [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) options yet, so this property may not work on all browsers.
- Type:
  - "center": Element will scroll to center of page (_Default_)
  - "end": Element will scroll to bottom of page
  - "start": Element will scroll to top of page
  - "nearest": Element will scroll to center/end/start depending on which one is closest

### requiredPathname

- Only scroll on a specific pathname(s)
- Note: "/" matches to the website name with no pathname
- **Don't** end pathnames with "/" (Ex. "/test/")
- For example, to only scroll on:
  - **/home/contact**: "/home/contact"
  - **/docs** or **/features**: ["/docs", "/features"]
- Type: `string | string[]`

### scrollFunc

- A custom scroll function that overrides the default [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) function used by React Hash Scroll
- Parameters:
  - ref: The ref object that contains the target element
  - [behavior](#behavior): The defined scroll behavior for the element or the default behavior
  - [position](#position): The defined scroll position for the element or the default position
- Type: `(ref,`[`behavior`](#behavior)`,`[`position`](#position)`) => void`

---

## Contributing

- Go to the [github repository](https://github.com/YashTotale/react-hash-scroll)
- Open a new [issue](https://github.com/YashTotale/react-hash-scroll/issues/new/choose) or [pull request](https://github.com/YashTotale/react-hash-scroll/pulls)

_Check out [first contributions](https://github.com/firstcontributions/first-contributions/blob/master/README.md) if you are new to contributing_

---

## More Info (Badges)

<!-- NPM Badges -->
<p align="center">
    <a href="https://www.npmjs.com/package/react-hash-scroll"><img src="https://img.shields.io/npm/dt/react-hash-scroll?logo=npm&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Downloads" alt="Downloads"></a>&nbsp;
    <a href="https://www.npmjs.com/package/react-hash-scroll"><img src="https://img.shields.io/bundlephobia/min/react-hash-scroll?logo=npm&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Minified%20Size" alt="Minified Size"></a>&nbsp;
</p>

---

<!-- Dependency Badges -->
<p align="center">
    <a href="https://snyk.io/vuln/npm:react-hash-scroll"><img src="https://img.shields.io/snyk/vulnerabilities/npm/react-hash-scroll?logo=snyk&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Vulnerabilities" alt="Vulnerabilities"></a>&nbsp;
    <a href="https://depfu.com/repos/github/YashTotale/react-hash-scroll"><img src="https://img.shields.io/depfu/YashTotale/react-hash-scroll?logo=dependabot&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Dependencies" alt="Dependencies"></a>&nbsp;
</p>

---

<!-- Code Alerts/Issues Badges -->

<p align="center">
    <a href="https://codeclimate.com/github/YashTotale/react-hash-scroll/issues"><img src="https://img.shields.io/codeclimate/issues/YashTotale/react-hash-scroll.svg?style=for-the-badge&logo=code-climate&labelColor=000000&label=Issues" alt="Issues"></a>&nbsp;
    <a href="https://lgtm.com/projects/g/YashTotale/react-hash-scroll/alerts/?mode=list"><img src="https://img.shields.io/lgtm/alerts/github/YashTotale/react-hash-scroll?logo=lgtm&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Lgtm%20Alerts" alt="Alerts"></a>&nbsp;
</p>

---

<!-- Code Maintainability Badges -->

<p align="center">
    <a href="https://codeclimate.com/github/YashTotale/react-hash-scroll/trends/technical_debt"><img src="https://img.shields.io/codeclimate/tech-debt/YashTotale/react-hash-scroll.svg?style=for-the-badge&logo=code-climate&labelColor=000000&label=Technical%20Debt" alt="Technical Debt"></a>&nbsp;
    <a href="https://codeclimate.com/github/YashTotale/react-hash-scroll"><img src="https://img.shields.io/codeclimate/maintainability-percentage/YashTotale/react-hash-scroll.svg?style=for-the-badge&logo=code-climate&labelColor=000000&label=Maintainability" alt="Maintainability"></a>&nbsp;
</p>

---

<!-- Commit Badges -->

<p align="center">
    <a href="https://github.com/YashTotale/react-hash-scroll/commits/main"><img src="https://img.shields.io/github/last-commit/YashTotale/react-hash-scroll?style=for-the-badge&logo=github&labelColor=000000&label=Last%20Commit&color=007EC6" alt="Last Commit"></a>&nbsp;
    <a href="https://github.com/YashTotale/react-hash-scroll/pulse/monthly"><img src="https://img.shields.io/github/commit-activity/w/YashTotale/react-hash-scroll?style=for-the-badge&logo=github&labelColor=000000&label=Commit%20Activity&color=007EC6" alt="Commit Activity"></a>&nbsp;
</p>

---

<!-- Workflow Badges -->

<p align="center">
    <a href="https://github.com/YashTotale/react-hash-scroll/actions?query=workflow%3A%22Website+Deploy+%28Push%29%22"><img src="https://img.shields.io/github/workflow/status/YashTotale/react-hash-scroll/Website%20Deploy%20(Push)?label=Website%20Deploy%20%28Push%29&style=flat-square&logo=github&labelColor=000000&logoColor=FFFFF" alt="Website Deploy (Push)"></a>&nbsp;
    <a href="https://github.com/YashTotale/react-hash-scroll/actions?query=workflow%3A%22Node+Package+Deploy%22"><img src="https://img.shields.io/github/workflow/status/YashTotale/react-hash-scroll/Node%20Package%20Deploy?label=Node%20Package%20Deploy&style=flat-square&logo=github&labelColor=000000&logoColor=FFFFF" alt="Node.js Package Deploy"></a>&nbsp;
    <a href="https://github.com/YashTotale/react-hash-scroll/actions?query=workflow%3A%22CodeQL+Analysis%22"><img src="https://img.shields.io/github/workflow/status/YashTotale/react-hash-scroll/CodeQL%20Analysis?label=CodeQL%20Analysis&style=flat-square&logo=github&labelColor=000000&logoColor=FFFFF" alt="CodeQL Analysis"></a>&nbsp;

</p>
