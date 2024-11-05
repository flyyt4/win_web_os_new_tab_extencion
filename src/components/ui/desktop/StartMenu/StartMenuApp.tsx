import Link from "../../../os/Link";
import { Button } from "@nextui-org/react";

function StartMenuApp({
  link,
  icon,
  name,
}: {
  link: string;
  icon: string;
  name: string;
}) {
  return (
    <Link href={link}>
      <Button
        className="p-0"
        variant="light"
        style={{
          width: "5rem",
          height: "5rem",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <img src={icon} alt={name} className="w-8" />
          <span className="text-xs text-center">{name}</span>
        </div>
      </Button>
    </Link>
  );
}

export default StartMenuApp;
