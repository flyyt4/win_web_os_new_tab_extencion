import { ReactNode, useEffect } from "react";
import FsProvider from "./Fs";
import events from "../../../os/events";

function ApisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    events.emit("os:webcontainer:boot");
  }, []);
  return <FsProvider>{children}</FsProvider>;
}

export default ApisProvider;
