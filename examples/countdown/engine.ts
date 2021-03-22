import { GetUnionState, GetState } from "../../src";
import { StateMachine } from "./state-machine";
import * as readline from "readline";

export type Cli = {
  text: string[];
  events: Record<string, () => void>;
};

export const render = (cli: Cli) => {
  process.stdin.removeAllListeners();

  process.stdin.on("data", pressedKey => {
    Object.entries(cli.events).forEach(([key, event]) => {
      if (pressedKey.toString() === key) event();
    });
  });

  clearScreen();
  console.log(cli.text.join("\n"));
};

const clearScreen = () => console.log("\x1B[2J");
