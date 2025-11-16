import { Canvas, createCanvas } from "canvas";
import { convertHexCharToBinaryMatrixChar } from "../helpers/fontParser";
import fs from "fs";
const hexToRgb = require("hex-to-rgb");

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
        
        this.renderWordOnCanvas();
    }

    private convertWord(word: string){
        
        const upperedWord: string = word.toUpperCase();

        Array.from(upperedWord).forEach((char: string) => {
            convertHexCharToBinaryMatrixChar(font[char.toUpperCase()]);
        });
    }

    private renderWordOnCanvas(){
        const canvas: Canvas = createCanvas(this.textSpaceInPx, this.displayHeight);

        const context = canvas.getContext("2d");

        const canvasData = context.createImageData(this.textSpaceInPx, this.displayHeight);

        let data: Uint8ClampedArray = canvasData.data;

        data = this.setPixel(data, 4, 4, "#675423");

        context.putImageData(canvasData, 0, 0);

        const output = fs.createWriteStream("test.png");
        const imageStream = canvas.createPNGStream();

        imageStream.pipe(output);
        output.on("finish", () => {console.log("Ready!")});
        
    }

    private setPixel(canvasData: any, x: number, y: number, color: string){
        const index = (y * this.textSpaceInPx + x) * 4;

        console.log(hexToRgb(color)); //[255, 255, 255];

        const colorRgb: number[] = hexToRgb(color);

        canvasData[index] = colorRgb[0];
        canvasData[index + 1] = colorRgb[1];
        canvasData[index + 2] = colorRgb[2];
        canvasData[index + 3] = 255;

        return canvasData;
    }


    

    

}