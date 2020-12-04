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
  /**
   * Array of hashes or hashes with scroll options
   *
   * Hashes can include or exclude leading "#"
   *
   * Length should be equal to children length
   *
   */
  hashes: ChildHash[];
  /**
   * Length should be equal to hashes length
   */
  children: ReactElement[];
}

const createChild = (
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

/**
 * Scrolls to corresponding child element when one of the hashes is present in the url
 */
const ChildrenHash: FC<ChildrenHashProps> = ({
  hashes,
  children,
  behavior,
  position,
  requiredPathname,
  scrollFunc,
}) => {
  warning(hashes.length === children.length, CHILDREN_HASH_UNEQUAL_LENGTHS);
  return (
    <>
      {children.map((child, i) => (
        <Fragment key={i}>
          {createChild(
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
