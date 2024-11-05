import { useWebContainerStore } from "./stores/webContainer";
import { WebContainer } from "@webcontainer/api";
import { events } from "./os/events/events";

let container: WebContainer | null = null;

events.on("os:webcontainer:boot", async () => {
  if (!container) {
    container = await WebContainer.boot();
    useWebContainerStore.getState().setContainer(container);
  }
});
