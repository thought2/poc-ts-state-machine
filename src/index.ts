export type StateNames = string;

export type EventName = string;

export type States<stateNames extends StateNames> = Record<stateNames, unknown>;

export type Events<stateNames extends StateNames> = Record<
  EventName,
  { readonly data: unknown; readonly from: stateNames; readonly to: stateNames }
>;

type Brand = {
  readonly StateMachine: unique symbol;
};

type StateMachineSpec<stateNames extends StateNames> = {
  readonly states: States<stateNames>;
  readonly events: Events<stateNames>;
};

export type StateMachine = StateMachineSpec<string> & Brand;

export type MkStateMachine<
  stateMachine extends StateMachineSpec<keyof stateMachine["states"] & string>
> = stateMachine & Brand;

type Union<T> = T[keyof T];

type TaggedUnion<T> = Union<Tagged<T>>;

export type GetUnionState<stateMachine extends StateMachine> = TaggedUnion<
  stateMachine["states"]
>;

type Tagged<T> = { [key in keyof T]: { tag: key } & T[key] };

export type GetState<
  state extends keyof stateMachine["states"],
  stateMachine extends StateMachine
> = stateMachine[state];

export type GetEventsForState<
  stateName extends keyof stateMachine["states"],
  stateMachine extends StateMachine
> = Union<
  {
    [key in keyof stateMachine["events"]]: stateName extends stateMachine["events"][key]["from"]
      ? key
      : never;
  }
>;

export type GetEventData<
  eventName extends keyof stateMachine["events"],
  stateMachine extends StateMachine
> = stateMachine["events"][eventName]["data"];
