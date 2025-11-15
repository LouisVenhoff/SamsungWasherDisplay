export interface IMessageBrokerReader<T>{
    connect: () => Promise<boolean>,
    subscribe: (queue: string, messageHandler: (message: T) => void) => Promise<boolean>; 
}