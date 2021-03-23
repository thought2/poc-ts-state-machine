import { GetUnionState, GetState } from "../../src";
import { mkView } from "../../src/view";
import { Cli } from "./engine";
import { StateMachine } from "./state-machine";

export const view = mkView<StateMachine, Cli>({
  Welcome: ({ state, dispatch }) => ({
    text: ["Welcome!", "", "[ Press 's' to start or 'e' to exit. ]", ""],
    events: {
      s: () => dispatch.Start({}),
      e: () => dispatch.Exit({}),
    },
  }),

  CountingDown: ({ state: { count }, dispatch }) => ({
    text: [
      `Countdown: ${count.toString()} ...`,
      "",
      "[ Press 'p' to pause or 'e' to exit ]",
      "",
    ],
    events: { p: () => dispatch.Pause({}), e: () => dispatch.Exit({}) },
  }),

  Paused: ({ state: { count }, dispatch }) => ({
    text: [
      `Paused at ${count}`,
      "",
      "[ Press 'r' to resume or 'e' to exit. ]",
      "",
    ],
    events: { r: () => dispatch.Resume({}), e: () => dispatch.Exit({}) },
  }),

  Boom: ({ dispatch }) => ({
    text: ["BOOOOOOM!!!", "", "[ Press 's' to restart or 'e' to exit. ]", ""],
    events: { s: () => dispatch.Start({}), e: () => dispatch.Exit({}) },
  }),
});
