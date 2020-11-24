import React from "react";

import HashScroll from "./HashScroll";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import "@testing-library/jest-dom";

const childEl = <div id="childDiv">Hello World!</div>;

const hash = "#hash";

test("Returns children", async () => {
  const e = render(
    <BrowserRouter>
      <HashScroll hash={hash}>{childEl}</HashScroll>
    </BrowserRouter>
  );

  const el = e.baseElement.firstChild?.firstChild;

  expect(el).toHaveAttribute("id", "childDiv");
  expect(el).toHaveTextContent("Hello World!");
});
