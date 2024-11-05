import StartMenuApp from "./StartMenuApp";

function StartMenuApps() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold select-none">Pinned Apps</h3>
      <div
        className="size-full flex flex-wrap flex-row"
        onDrop={(e) => console.log(e.target)}
      >
        <StartMenuApp
          icon="https://img.icons8.com/?size=96&id=pGHcje298xSl&format=png"
          link="ms://word"
          name="Word"
        />
        <StartMenuApp
          icon="https://img.icons8.com/?size=96&id=pGHcje298xSl&format=png"
          link="ms://word"
          name="Word"
        />
        <StartMenuApp
          icon="https://img.icons8.com/?size=96&id=pGHcje298xSl&format=png"
          link="ms://word"
          name="Word"
        />
        <StartMenuApp
          icon="https://img.icons8.com/?size=96&id=pGHcje298xSl&format=png"
          link="ms://word"
          name="Word"
        />
        <StartMenuApp
          icon="https://img.icons8.com/?size=96&id=pGHcje298xSl&format=png"
          link="ms://word"
          name="Word"
        />
      </div>
    </div>
  );
}

export default StartMenuApps;
