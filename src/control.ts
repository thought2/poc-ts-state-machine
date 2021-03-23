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
    state: stateMachine["states"][stateMachine["events"][eventsKey]["from"]] & {
      tag: stateMachine["events"][eventsKey]["from"];
    }
  ) => (data: stateMachine["events"][eventsKey]["data"]) => void;
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
      v({
        render: magicConstructor(tag => (data: any) =>
          render({
            tag,
            ...data,
          })
        ),
        nextEvent,
      })(state),
    ])
  ) as any;

const magicConstructor = (handler: (key: string | symbol) => void) =>
  new Proxy(
    {},
    {
      get: function (target, name) {
        return handler(name);
      },
    }
  );
