import { GetUnionState } from "../../src";
import { StateMachine } from "./state-machine";
import { control } from "./control";
import { mkState } from "../utils/observable-state";
import { view } from "./view";
import { render } from "../utils/cli-engine";

type State = GetUnionState<StateMachine>;

export const main = () => {
  const state = mkState<State>();

  const mkDispatch = control({
    render: state.set,
    nextEvent: () => {
      return mkDispatch(state.get());
    },
  });

  state.onChange(state => render(view({ state, dispatch: mkDispatch(state) })));

  mkDispatch().Init({});
};
