//var amqp = require("amqplib/callback_api");
import amqplib, { Channel, ChannelModel } from 'amqplib';


export class Rabbit{

    private queue: string;
    
    private connected:boolean = false;

    private connection:ChannelModel | null = null;

    private channel:Channel | null = null;

    constructor(queue: string){
        this.queue = queue;
    }


    private get isConnected():boolean{
        return this.connected;
    }


    public async connect(){
        const queue:string = "washerStates";

        this.connection = await amqplib.connect("amqp://localhost");

        this.channel = await this.connection.createChannel();
        
        if(!this.connection || !this.channel) return;

        //this.channel.assertQueue(this.queue);

        this.connected = true;
    }

    public async publish(){
        
        if(!this.connected) return;

        this.channel!.sendToQueue(this.queue, Buffer.from("Hello World!"));
    }


}