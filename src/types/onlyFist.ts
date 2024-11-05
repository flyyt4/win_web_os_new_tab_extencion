type OnlyFirst<F, S> = F & { [Key in keyof Omit<S, keyof F>]?: never };

export default OnlyFirst;
