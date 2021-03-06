import { mkControl } from "../../src/control";
import { StateMachine } from "./state-machine";

const NEXT_TICK = 1000;
const COUNTDOWN_FROM = 10;
const COUNTDOWN_TO = 0;

export const control = mkControl<StateMachine>({
  Init: ({ render }) => () => () => render.Welcome({}),

  Exit: () => () => () => {},

  Start: ({ render, nextEvent }) => () => () => {
    setTimeout(() => nextEvent().Tick({}), NEXT_TICK);

    return render.CountingDown({ count: COUNTDOWN_FROM });
  },

  Resume: ({ render, nextEvent }) => state => () => {
    setTimeout(() => nextEvent().Tick({}), NEXT_TICK);

    render.CountingDown({ count: state.count });
  },

  Pause: ({ render }) => state => () => render.Paused({ count: state.count }),

  Tick: ({ render, nextEvent }) => state => () => {
    // WILL BE CAPTURED BY THE SYSTEM SOON:
    if (state.tag !== "CountingDown") return;

    if (state.count === COUNTDOWN_TO) {
      return render.Boom({});
    } else {
      setTimeout(() => nextEvent().Tick({}), NEXT_TICK);
      return render.CountingDown({ count: state.count - 1 });
    }
  },
});
