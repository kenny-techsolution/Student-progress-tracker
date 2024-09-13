"use client";

import { PropsWithChildren, useState } from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";

export const AntdProvider = ({ children }: PropsWithChildren) => {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    return <script dangerouslySetInnerHTML={{ __html: extractStyle(cache) }} />;
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};
