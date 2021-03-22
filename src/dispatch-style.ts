import {
  StateMachine,
  GetUnionState,
  Void,
  GetEventData,
  GetEventsForState,
} from ".";

export type GetDispatchStyleViews<stateMachine extends StateMachine, Render> = {
  [stateKey in keyof stateMachine["states"]]: (_: {
    state: stateMachine["states"][stateKey];
    dispatch: {
      [eventsKey in GetEventsForState<stateKey, stateMachine>]: (
        data: GetEventData<eventsKey, stateMachine>
      ) => Void;
    };
  }) => Render;
};

export const mkView = <stateMachine extends StateMachine, Render>(
  views: GetDispatchStyleViews<stateMachine, Render>
): ((_: {
  state: GetUnionState<stateMachine>;
  dispatch: {
    [key in keyof stateMachine["events"]]: (
      data: GetEventData<key, stateMachine>
    ) => Void;
  };
}) => Render) => 1 as any;
