// React Imports
import React, { FC, Fragment, ReactElement } from "react";
import { BaseScrollOptions } from "../Utils/types";
import HashScroll from "./HashScroll";
import warning from "tiny-warning";

export type ChildHash =
  | string
  | (Partial<BaseScrollOptions> & { hash: string });

export interface ChildrenHashProps extends Partial<BaseScrollOptions> {
  hashes: ChildHash[];
  children: ReactElement[];
}

const createReffed = (
  child: ReactElement,
  defaultOptions: Partial<BaseScrollOptions>,
  hash?: ChildHash
) => {
  if (!hash) return child;
  if (typeof hash === "string")
    return (
      <HashScroll {...defaultOptions} hash={hash}>
        {child}
      </HashScroll>
    );
  return (
    <HashScroll {...defaultOptions} {...hash}>
      {child}
    </HashScroll>
  );
};

const ChildrenHash: FC<ChildrenHashProps> = ({
  hashes,
  children,
  behavior,
  position,
  requiredPathname,
  scrollFunc,
}) => {
  warning(
    hashes.length !== children.length,
    "The number of hashes and children should be the same so that each child corresponds to a hash"
  );
  return (
    <>
      {children.map((child, i) => (
        <Fragment key={i}>
          {createReffed(
            child,
            {
              behavior,
              position,
              requiredPathname,
              scrollFunc,
            },
            hashes[i]
          )}
        </Fragment>
      ))}
    </>
  );
};

export default ChildrenHash;
