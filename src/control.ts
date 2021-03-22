import { GetState, StateMachine, Void, GetUnionState } from ".";

type GetControls<stateMachine extends StateMachine> = {
  [eventsKey in keyof stateMachine["events"]]: (_: {
    render: {
      [key in stateMachine["events"][eventsKey]["to"]]: (
        data: stateMachine["states"][key]
      ) => Void;
    };
    nextEvent: {
      [key in keyof stateMachine["events"]]: (
        data: stateMachine["events"][key]["data"]
      ) => Void;
    };
  }) => (
    state: stateMachine["states"][stateMachine["events"][eventsKey]["from"]]
  ) => void;
};

export const mkControl = <stateMachine extends StateMachine>(
  controls: GetControls<stateMachine>
) => (_: {
  render: (state: GetUnionState<stateMachine>) => void;
  nextEvent: {
    [key in keyof stateMachine["events"]]: (
      data: stateMachine["events"][key]["data"]
    ) => void;
  };
}) => (state: GetUnionState<stateMachine>, event: 1): void => 1 as any;
