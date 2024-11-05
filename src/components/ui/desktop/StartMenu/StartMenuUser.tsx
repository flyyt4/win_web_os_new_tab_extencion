import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

function StartMenuUser() {
  return (
    <div>
      <Popover placement="bottom" showArrow>
        <PopoverTrigger>
          <Button
            className="flex gap-2 items-center p-0 pr-2 justify-start"
            radius="sm"
            variant="light"
          >
            <Avatar src="https://placehold.co/500" />

            <h3>User Name</h3>
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <p>StartMenuUser</p>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default StartMenuUser;
