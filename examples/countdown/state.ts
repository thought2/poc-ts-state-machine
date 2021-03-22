type State<T> = {
  set: (data: undefined | T) => void;
  get: () => undefined | T;
  onChange: (newListener: (data: T) => void) => void;
};

export const mkState = <T>(): State<T> => {
  let data: undefined | T = undefined;
  let listener: undefined | ((data: T) => void) = undefined;

  return {
    set: value => {
      data = value;
      if (listener && data) {
        listener(data);
      }
    },
    get: () => data,
    onChange: (newListener): void => {
      listener = newListener;
    },
  };
};
