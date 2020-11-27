// React Imports
import React, { FC, Fragment, ReactElement } from "react";
import { BaseScrollOptions } from "../Utils/types";
import HashScroll from "./HashScroll";

export type ChildHash =
  | string
  | (Partial<BaseScrollOptions> & { hash: string });

export interface ChildrenHashProps extends BaseScrollOptions {
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
