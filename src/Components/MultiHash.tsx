// React Imports
import React, { FC, RefObject, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_BEHAVIOR, DEFAULT_POSITION } from "../Utils/constants";
import { BaseScrollOptions } from "../Utils/types";

export type MultiHashes<T> = Record<
  string,
  RefObject<T> | [RefObject<T>, Partial<BaseScrollOptions>]
>;

export interface MultiHashProps extends Partial<BaseScrollOptions> {
  /**
   * An object specifying the hashes and the refs they point to
   *
   * Hashes can include or exclude leading "#"
   *
   * Each hash corresponds to a ref or a ref with options
   *
   * Example:
   *
   *  ```javascript
   *  const ref1 = createRef();
   *  const ref2 = createRef();
   *  const hashes = {
   *    hash1: ref1,
   *    "#hash2": [
   *      ref2,
   *      {
   *        behavior: "auto",
   *        position: "nearest",
   *        requiredPathname: ["/docs", "/contact"],
   *      },
   *    ],
   *  };
   *  return <MultiHash hashes={hashes} />;
   *  ```
   */
  hashes: MultiHashes<HTMLElement>;
}

const createHashFunc = (
  ref: RefObject<HTMLElement>,
  options: Partial<BaseScrollOptions>,
  defaultOptions: Partial<BaseScrollOptions>,
  pathname: string
) => {
  const { behavior, position, requiredPathname, scrollFunc } = defaultOptions;

  let req = options.requiredPathname ?? requiredPathname;

  if (typeof req === "string") req = [req];

  const b = options.behavior ?? behavior ?? DEFAULT_BEHAVIOR;

  const p = options.position ?? position ?? DEFAULT_POSITION;

  return () => {
    if ((req === undefined || req.includes(pathname)) && ref.current) {
      if (options.scrollFunc) options.scrollFunc(ref, b, p);
      else if (scrollFunc) scrollFunc(ref, b, p);
      else
        ref.current.scrollIntoView({
          behavior: b,
          block: p,
          inline: p,
        });
    }
  };
};

/**
 * Component that pairs hashes with refs and scrolls to a corresponding ref when one of the hashes is present in the url
 */
const MultiHash: FC<MultiHashProps> = ({
  hashes,
  children,
  behavior,
  position,
  requiredPathname,
  scrollFunc,
}) => {
  const { hash: urlHash, pathname } = useLocation();

  const hashFuncs: Record<string, () => void> = {};

  const defaultOptions = { behavior, position, requiredPathname, scrollFunc };

  useMemo(() => {
    for (let hash in hashes) {
      const value = hashes[hash];

      if (hash.charAt(0) !== "#") {
        hash = "#" + hash;
      }

      if (Array.isArray(value))
        hashFuncs[hash] = createHashFunc(
          value[0],
          value[1],
          defaultOptions,
          pathname
        );
      else
        hashFuncs[hash] = createHashFunc(value, {}, defaultOptions, pathname);
    }
  }, [hashes, defaultOptions, pathname]);

  useEffect(() => {
    const scroll = hashFuncs[urlHash];

    scroll?.();
  }, [urlHash, hashFuncs]);

  return <>{children}</>;
};

export default MultiHash;
