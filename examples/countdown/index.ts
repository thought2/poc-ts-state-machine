import { GetUnionState } from "../../src";
import { StateMachine } from "./state-machine";
import { control } from "./control";
import { mkState } from "./state";
import { view } from "./view";
import { render } from "./engine";

type State = GetUnionState<StateMachine>;

const state = mkState<State>();

const mkDispatch = control({
  render: state.set,
  nextEvent: () => {
    return mkDispatch(state.get());
  },
});

state.onChange(state => render(view({ state, dispatch: mkDispatch(state) })));

mkDispatch().Init({});

setInterval(function () {
  console.log("timer that keeps nodejs processing running");
}, 1000 * 60 * 60);
