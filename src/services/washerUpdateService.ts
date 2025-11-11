import {Service} from "./service";

export class WasherUpdateService extends Service{
    

    private samsungAuthToken:string;

    constructor(samsungAuthToken:string){
        super("* * * * * *");

        this.samsungAuthToken = samsungAuthToken;
    }

    doWork(): void | Promise<void> {
        console.log(this.samsungAuthToken);
    }

    

    
}