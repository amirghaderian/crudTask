import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import React,{ ReactNode } from "react";
// Create rtl cache
interface RtlProps {
  children:ReactNode;
}

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const Rtl: React.FC<RtlProps> = ({ children }) => {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
};

export default Rtl;
