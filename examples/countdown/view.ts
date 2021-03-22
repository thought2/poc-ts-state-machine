import { GetUnionState, GetState } from "../../src";
import { mkView } from "../../src/view";
import { Cli } from "./engine";
import { StateMachine } from "./state-machine";

export const view = mkView<StateMachine, Cli>({
  Welcome: ({ state, dispatch }) => ({
    text: ["Press 's' to start or 'e' to exit.", "Welcome!"],
    events: { s: () => dispatch.Start({}), e: () => dispatch.Exit({}) },
  }),

  CountingDown: ({ state: { count }, dispatch }) => ({
    text: [
      "Press 'p' to pause or 'e' to exit",
      `Countdown: ${count.toString()}`,
    ],
    events: { p: () => dispatch.Pause({}), e: () => dispatch.Exit({}) },
  }),

  Paused: ({ dispatch }) => ({
    text: ["Press 'r' to resume or 'e' to exit."],
    events: { r: () => dispatch.Resume({}), e: () => dispatch.Exit({}) },
  }),

  Boom: ({ dispatch }) => ({
    text: ["Press 's' to restart or 'e' to exit."],
    events: { s: () => dispatch.Start({}), e: () => dispatch.Exit({}) },
  }),
});
