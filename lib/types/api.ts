export type Endpoint<TResponse = unknown> = string & {
    readonly __response?: TResponse;
};
