import { mkControl } from "../../src/control";
import { StateMachine } from "./state-machine";

const NEXT_TICK = 1000;
const COUNTDOWN_FROM = 10;
const COUNTDOWN_TO = 0;

export const control = mkControl<StateMachine>({
  Init: ({ render }) => () => render.Welcome({}),

  Exit: () => () => {},

  Start: ({ render, nextEvent }) => () => {
    setTimeout(() => nextEvent().Tick({}), NEXT_TICK);

    return render.CountingDown({ count: COUNTDOWN_FROM });
  },

  Resume: ({ render }) => ({ count }) => render.CountingDown({ count }),

  Pause: ({ render }) => ({ count }) => render.Paused({ count }),

  Tick: ({ render, nextEvent }) => ({ count }) => {
    if (count === COUNTDOWN_TO) {
      return render.Boom({});
    } else {
      setTimeout(() => nextEvent().Tick({}), NEXT_TICK);
      return render.CountingDown({ count: count - 1 });
    }
  },
});
