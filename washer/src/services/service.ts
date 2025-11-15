import cron from "node-cron";

export abstract class Service{

    protected cronSchedule:string;
    
    protected running:boolean = false;

    constructor(cronSchedule: string){
        this.cronSchedule = cronSchedule;
    }   

    public start(){
        cron.schedule(this.cronSchedule, () => {
            this.doWork();
        });
    }

    abstract doWork():void | Promise<void>;
}