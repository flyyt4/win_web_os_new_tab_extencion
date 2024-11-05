import { useEffect } from "react";
import { Window, WindowDrag } from "../../window";
import { useXTerm } from "react-xtermjs";
import { useWebContainerStore } from "../../../../stores/webContainer";

function Terminal() {
  const { instance: xterm, ref } = useXTerm();
  const webContainer = useWebContainerStore((state) => state.container);
  useEffect(() => {
    const connectShell = async () => {
      if (xterm && webContainer) {
        const shellProcess = await webContainer.spawn("bash", []);
        const shellWriter = shellProcess.input.getWriter();
        shellProcess.output.pipeTo(
          new WritableStream({
            write: (chunk) => xterm.write(chunk),
          })
        );
        xterm.onData((data) => {
          shellWriter.write(data);
        });
      }
    };
    connectShell();
  }, [xterm, webContainer]);
  return (
    <Window>
      <div className="grid grid-rows-[2rem_1fr] w-[50vw] h-[30vh]">
        <WindowDrag>
          <div className="size-full bg-white"></div>
        </WindowDrag>
        <div ref={ref}></div>
      </div>
    </Window>
  );
}

export default Terminal;
