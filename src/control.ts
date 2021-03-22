import { GetState, StateMachine, GetUnionState } from ".";

type GetControls<stateMachine extends StateMachine> = {
  [eventsKey in keyof stateMachine["events"]]: (_: {
    render: {
      [key in stateMachine["events"][eventsKey]["to"]]: (
        data: stateMachine["states"][key]
      ) => void;
    };
    nextEvent: () => {
      [key in keyof stateMachine["events"]]: (
        data: stateMachine["events"][key]["data"]
      ) => void;
    };
  }) => (
    state: stateMachine["states"][stateMachine["events"][eventsKey]["from"]]
  ) => void;
};

export const mkControl = <stateMachine extends StateMachine>(
  controls: GetControls<stateMachine>
) => ({
  render,
  nextEvent,
}: {
  render: (state: GetUnionState<stateMachine>) => void;
  nextEvent: () => {
    [key in keyof stateMachine["events"]]: (
      data: stateMachine["events"][key]["data"]
    ) => void;
  };
}) => (
  state?: GetUnionState<stateMachine>
): {
  [key in keyof stateMachine["events"]]: (
    data: stateMachine["events"][key]["data"]
  ) => void;
} =>
  Object.fromEntries(
    Object.entries(controls).map(([k, v]) => [
      k,
      v({ render: magicConstructor, nextEvent }),
    ])
  ) as any;

const magicConstructor = new Proxy(
  {},
  {
    get: function (target, name) {
      return (data: any) => ({ tag: name, ...data });
    },
  }
);
