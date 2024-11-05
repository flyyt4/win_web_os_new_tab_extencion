import StartMenuUser from "./StartMenuUser";
import StartMenuSearchBar from "./StartMenuSearchBar";
import StartMenuApps from "./StartMenuApps";
import StartMenuWidgets from "./StartMenuWidgets";
import StartMenuProgramsAndResult from "./StartMenuProgramsAndResult";
import StartMenuActions from "./StartMenuActions";

function StartMenu({ close }: { close: () => void }) {
  console.log(close);
  return (
    <div className="size-full grid grid-rows-[1fr_10fr]">
      <div className="grid grid-cols-[1fr_2fr] items-center p-2 gap-8 bg-default/50">
        <StartMenuUser />
        <StartMenuSearchBar />
      </div>
      <div className="grid grid-cols-2">
        <div className="grid grid-rows-2 p-2">
          <StartMenuApps />

          <div className="relative">
            <StartMenuWidgets />
            <StartMenuActions />
          </div>
        </div>
        <div>
          <StartMenuProgramsAndResult />
        </div>
      </div>
    </div>
  );
}

export default StartMenu;
