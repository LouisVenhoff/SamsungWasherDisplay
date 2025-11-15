import { IMessageBrokerReader } from "../../interfaces/IMessageBrokerReader";
import amqplib, { Channel, ChannelModel, ConsumeMessage } from "amqplib";

export class RabbitReader<T> implements IMessageBrokerReader<T> {
    
    private connected: boolean = false;
    private connection:ChannelModel | null = null;
    private channel: Channel | null = null;

    public get isConnected(): boolean{
        return this.connected;
    }

    public async connect(): Promise<boolean>{
        try{
            this.connection = await amqplib.connect("amqp://localhost");
            if(!this.connection) return false;

            this.channel = await this.connection.createChannel();
            if(!this.channel) return false;

            this.connected = true;
            return true;
        }
        catch{
            return false;
        }
    }

    public async subscribe(queue: string, onMessageHandler:(message:T) => void): Promise<boolean>{
        if(!this.connected && !this.channel) return false;

        try{
            this.channel!.consume(queue, (msg: ConsumeMessage | null) => {
                if(!msg) return;
                
                this.channel!.ack(msg)
                
                const parsedData:T = JSON.parse(msg.content.toString());
                onMessageHandler(parsedData);
    
                return true
            });
        }
        catch(err: any){
            console.log(`Error while subscribing: ${err}`);
        }

        return false;
    }



}