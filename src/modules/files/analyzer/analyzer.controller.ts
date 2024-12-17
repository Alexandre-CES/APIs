import { PathService } from "../path/path.service";
import { AnalyzerService } from "./analyzer.service";
import { Request, Response } from "express";


export class AnalyzerController{
    constructor(
        private readonly pathService: PathService,
        private readonly analyzerService: AnalyzerService 
    ){}

    public async getSize(req:Request, res:Response){
        const result = await this.analyzerService.getSize(this.pathService.getDirPath());
        res.status(result.status).send(result.body)
    }
}