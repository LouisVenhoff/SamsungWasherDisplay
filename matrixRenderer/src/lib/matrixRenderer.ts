import { Canvas, createCanvas } from "canvas";
import { convertHexCharToBinaryMatrixChar } from "../helpers/fontParser";

const font = require("../../assets/font.json");

export class MatrixRenderer {

    private displayWidth: number;
    private displayHeight: number;
    private textPercentage: number;

    private textSpaceInPx: number;
    private iconSpaceInPx: number;

    constructor(displayWidth: number, displayHeight: number, textPercentage: number){
        this.displayWidth = displayWidth;
        this.displayHeight = displayHeight;
        this.textPercentage = textPercentage;

        this.textSpaceInPx = displayWidth * (textPercentage * 0.01);

        this.iconSpaceInPx = this.displayWidth - this.textSpaceInPx;

        //this.convertHexCharToBinaryMatrixChar(font["COLON"]);

        this.convertWord("W");
    }

    private convertWord(word: string){
        
        const upperedWord: string = word.toUpperCase();

        Array.from(upperedWord).forEach((char: string) => {
            convertHexCharToBinaryMatrixChar(font[char.toUpperCase()]);
        });
    }

    private renderWordOnCanvas(){
        const canvas: Canvas = createCanvas(this.textSpaceInPx, this.displayHeight);
    }


    

    

}