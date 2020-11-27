import React from "react";

import ChildrenHash from "./ChildrenHash";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import "@testing-library/jest-dom";

const childEl = [
  <div key={1} id="1">
    Hello World!
  </div>,
  <div key={2} id="2">
    Hello World!
  </div>,
  <div key={3} id="3">
    Hello World!
  </div>,
];

const hashesArr = [
  [],
  ["1"],
  ["1", "2"],
  ["1", "2", "3"],
  ["1", "2", "3", "4"],
];

test("Returns children", async () => {
  hashesArr.forEach((hashes) => {
    const dom = render(
      <BrowserRouter>
        <ChildrenHash hashes={hashes}>{childEl}</ChildrenHash>
      </BrowserRouter>
    );

    childEl.forEach((x, i) => {
      const el = dom.baseElement.firstChild?.childNodes[i];

      expect(el).toHaveAttribute("id", (i + 1).toString());
      expect(el).toHaveTextContent("Hello World!");
    });
  });
});
