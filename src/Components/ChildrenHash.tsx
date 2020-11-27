// React Imports
import React, { FC, Fragment, ReactElement } from "react";
import warning from "tiny-warning";
import HashScroll from "./HashScroll";

//Utils
import { BaseScrollOptions } from "../Utils/types";
import { CHILDREN_HASH_UNEQUAL_LENGTHS } from "../Utils/messages";

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
  warning(hashes.length !== children.length, CHILDREN_HASH_UNEQUAL_LENGTHS);
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
