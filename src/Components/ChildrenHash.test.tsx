import React from "react";
import ChildrenHash, { ChildHash } from "./ChildrenHash";
import { CHILDREN_HASH_UNEQUAL_LENGTHS } from "../Utils/messages";

import { render, RenderResult } from "@testing-library/react";
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

const hashesArr: ChildHash[][] = [
  [],
  ["1"],
  ["1", "2"],
  ["1", "2", "3"],
  ["1", "2", "3", "4"],
];

const renderer = (func: (dom: RenderResult, hashes: ChildHash[]) => void) => {
  hashesArr.forEach((hashes) => {
    const dom = render(
      <BrowserRouter>
        <ChildrenHash hashes={hashes}>{childEl}</ChildrenHash>
      </BrowserRouter>
    );

    func(dom, hashes);
  });
};

test("Returns children", () => {
  console.warn = jest.fn();

  renderer((dom) => {
    childEl.forEach((x, i) => {
      const el = dom.baseElement.firstChild?.childNodes[i];

      expect(el).toHaveAttribute("id", (i + 1).toString());
      expect(el).toHaveTextContent("Hello World!");
    });
  });
});

test("Logs warning to console", () => {
  jest.spyOn(console, "warn").mockImplementation();

  renderer((dom, hashes) => {
    if (hashes.length !== childEl.length)
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(CHILDREN_HASH_UNEQUAL_LENGTHS)
      );
  });
});
