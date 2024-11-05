import type OnlyFirst from "./onlyFist";

type OneOf<F, S> = OnlyFirst<F, S> | OnlyFirst<S, F>;

export default OneOf;
