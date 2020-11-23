// React Imports
import React, { FC, RefObject, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_BEHAVIOR, DEFAULT_POSITION } from "../Utils/constants";
import { BaseHashOptions } from "../Utils/types";

export type MultiHashes<T> = Record<
  string,
  RefObject<T> | [RefObject<T>, Partial<BaseHashOptions>]
>;

export interface MultiHashProps extends Partial<BaseHashOptions> {
  /**
   * An object specifying the hashes and the refs they point to
   *
   * Hashes can include or exclude leading "#"
   *
   * Each hash corresponds to a ref or a ref with options
   *
   * Example:
   * ```
   *  const ref1 = createRef<HTMLDivElement>();
   *  const ref2 = createRef<HTMLAnchorElement>();
   *  const hashes = {
   *    "hash1": ref1,
   *    "#hash2": [ref2,
   *      {
   *        behavior: "auto",
   *        position: "nearest",
   *        requiredPathname: ["/docs", "/contact"],
   *      }
   *    ],
   *  };
   * ```
   */
  hashes: MultiHashes<HTMLElement>;
}

const createHashFunc = (
  ref: RefObject<HTMLElement>,
  options: Partial<BaseHashOptions>,
  defaultOptions: Partial<BaseHashOptions>,
  pathname: string
) => {
  const { behavior, position, requiredPathname } = defaultOptions;

  let req = options.requiredPathname ?? requiredPathname;

  if (typeof req === "string") req = [req];

  return () => {
    if (req === undefined || req.includes(pathname)) {
      ref.current?.scrollIntoView({
        behavior: options.behavior ?? behavior,
        block: options.position ?? position,
        inline: options.position ?? position,
      });
    }
  };
};

const MultiHash: FC<MultiHashProps> = ({
  hashes,
  children,
  behavior = DEFAULT_BEHAVIOR,
  position = DEFAULT_POSITION,
  requiredPathname,
}) => {
  const { hash: urlHash, pathname } = useLocation();

  const hashFuncs: Record<string, () => void> = {};

  const defaultOptions = { behavior, position, requiredPathname };

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
    const scrollFunc = hashFuncs[urlHash];

    scrollFunc?.();
  }, [urlHash, hashFuncs]);

  return <>{children}</>;
};

export default MultiHash;
