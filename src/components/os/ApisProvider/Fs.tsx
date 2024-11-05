import { ReactNode, useEffect } from "react";

import Fs from "../../../os/fs";
import { useWebContainerStore } from "../../../stores/webContainer";
import { useFsStore } from "../../../stores/fs";

function FsProvider({ children }: { children: ReactNode }) {
  const webContainer = useWebContainerStore((state) => state.container);
  const { fs, setFs } = useFsStore((state) => state);
  useEffect(() => {
    fs.startListeners();

    return () => {
      fs.stopListeners();
    };
  }, []);
  useEffect(() => {
    if (!fs.existContainer && webContainer) {
      setFs(new Fs(webContainer, true, false));
    }
  }, [webContainer]);

  return children;
}

export default FsProvider;
