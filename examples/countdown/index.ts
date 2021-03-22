import { control } from "./control";
import { view } from "./view";

//control({ present: render(view({ dispatch })) });

//view({ state, dispatch });

const state = (() => {
  let data = null;

  return { set: (value: any) => (data = value) };
})();

const dispatch = control({ render: () => state.set(""), nextEvent: 1 as any });
