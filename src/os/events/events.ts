import mitt from "mitt";

type AllEvents = {
  "os:webcontainer:boot": undefined;
};

type Events = Record<keyof AllEvents, AllEvents[keyof AllEvents]>;

export const events = mitt<Events>();
