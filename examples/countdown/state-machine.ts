import { MkStateMachine } from "../../src";

export type StateMachine = MkStateMachine<{
  states: {
    Welcome: {};
    CountingDown: { count: number };
    Paused: { count: number };
    Boom: {};
  };
  events: {
    Tick: { data: {}; from: "CountingDown"; to: "CountingDown" | "Boom" };
    Init: {
      data: {};
      from: never;
      to: "Welcome";
    };
    Exit: {
      data: {};
      from: "Welcome" | "CountingDown" | "Boom" | "Paused";
      to: never;
    };
    Start: { data: {}; from: "Welcome" | "Boom"; to: "CountingDown" };
    Resume: { data: {}; from: "Paused"; to: "CountingDown" };
    Pause: { data: {}; from: "CountingDown"; to: "Paused" };
  };
}>;
