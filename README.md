<br>
<p align="center">
    <a href="https://github.com/YashTotale/react-hash-scroll/blob/main/static/icon.svg"><img src="https://raw.githubusercontent.com/YashTotale/react-hash-scroll/cc2728f850fb8332a9ba22717faf70e1e74a30a6/static/icon.svg" alt="React Hash Scroll" width="200"></a>
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
- [Website !Website](#website-)
- [Components](#components)
  - [Reused Props](#reused-props)
    - [behavior](#behavior)
    - [position](#position)
    - [requiredPathname](#requiredpathname)
    - [scrollFunc](#scrollfunc)
  - [HashScroll](#hashscroll)
    - [Props](#props)
    - [Example](#example)
  - [MultiHash](#multihash)
    - [Props](#props-1)
    - [Example](#example-1)
  - [ChildrenHash](#childrenhash)
    - [Props](#props-2)
    - [Example](#example-2)
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

- Most other libraries rely on scrolling by id, whereas this library relies on ref scrolling, making it more robust for large projects
- This library offers built-in [TypeScript](https://www.typescriptlang.org/) support
- Extensive testing makes this library more dependable
- This library provides components that are very customizable, making it more likely that they will fit your use case

---

## Website ![Website](https://img.shields.io/website?url=https%3A%2F%2Freact-hash-scroll.web.app%2F)

The [website](https://react-hash-scroll.web.app/) compiles all the information and demos on this library in one easy-to-access place.

---

<!-- DON'T EDIT COMPONENTS HERE! EDIT COMPONENTS IN docs/Components folder! -->

## Components

**Note**: [react-router-dom](https://reactrouter.com/web/) is required as a peer dependency and all components must be wrapped in a [Router](https://reactrouter.com/web/api/BrowserRouter)

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

---

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

---

### MultiHash

Component that pairs hashes with refs and scrolls to a corresponding ref when one of the hashes is present in the url

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

Scrolls to corresponding child element when one of the hashes is present in the url

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

---

## Contributing

- Go to the [github repository](https://github.com/YashTotale/react-hash-scroll)
- Open a new [issue](https://github.com/YashTotale/react-hash-scroll/issues/new/choose) or [pull request](https://github.com/YashTotale/react-hash-scroll/pulls)

_Check out [first contributions](https://github.com/firstcontributions/first-contributions/blob/master/README.md) if you are new to contributing_

---

## More Info (Badges)

<!-- NPM Badges -->
<p align="center">
    <a href="https://www.npmjs.com/package/react-hash-scroll"><img src="https://img.shields.io/npm/dw/react-hash-scroll?logo=npm&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Downloads" alt="Downloads"></a>&nbsp;
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
