import React from "react";

import MultiHash from "./MultiHash";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import "@testing-library/jest-dom";

const childEl = <div id="childDiv">Hello World!</div>;

test("Returns children", async () => {
  const dom = render(
    <BrowserRouter>
      <MultiHash hashes={{}}>{childEl}</MultiHash>
    </BrowserRouter>
  );

  const el = dom.baseElement.firstChild?.firstChild;

  expect(el).toHaveAttribute("id", "childDiv");
  expect(el).toHaveTextContent("Hello World!");
});
