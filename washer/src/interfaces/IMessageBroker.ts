export interface IMessageBroker{
    connect: () => Promise<boolean>;
    publish: (payload: any) => Promise<boolean>;

    isConnected: boolean
}