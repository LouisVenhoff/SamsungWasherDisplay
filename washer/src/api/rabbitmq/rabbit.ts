//var amqp = require("amqplib/callback_api");
import amqplib, { Channel, ChannelModel } from 'amqplib';
import { IMessageBroker } from '../../interfaces/IMessageBroker';


export class Rabbit implements IMessageBroker{

    private queue: string;
    
    private connected:boolean = false;

    private connection:ChannelModel | null = null;

    private channel:Channel | null = null;

    constructor(queue: string){
        this.queue = queue;
    }


    public get isConnected():boolean{
        return this.connected;
    }


    public async connect():Promise<boolean>{
        
        try{
            this.connection = await amqplib.connect("amqp://localhost");

            this.channel = await this.connection.createChannel();
        
            if(!this.connection || !this.channel) return false;
        }
        catch(err:any){
            
            console.log("Error while connecting to RabbitMQ Broker", err);

            return false;
        }

        

        //this.channel.assertQueue(this.queue);

        this.connected = true;

        console.log("Connected to RabbitMQ Broker!")
        return true;

    }

    public async publish(payload: any):Promise<boolean>{
        if(!this.connected) return false;

        try{
            this.channel!.sendToQueue(this.queue, Buffer.from(payload));
        }
        catch(err: any){
            console.log("Error while publishing payload!", err);
            return false;
        }

        return true;
    }


}