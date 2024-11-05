import { Tooltip } from "@nextui-org/react";
import { Reorder } from "framer-motion";
import { useState } from "react";

interface Widget {
  src: string;
  name: string;
}

function StartMenuWidgets() {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      name: "Youtube",
    },
  ]);
  return (
    <Reorder.Group axis="y" values={widgets} onReorder={setWidgets}>
      {widgets.map((widget) => (
        <Reorder.Item key={widget.src} value={widget} className="p-1">
          <Tooltip content={widget.name} delay={2000}>
            <iframe src={widget.src} />
          </Tooltip>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

export default StartMenuWidgets;
