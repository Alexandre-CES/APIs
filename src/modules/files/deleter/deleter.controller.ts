import { DeleterService } from "./deleter.service";
import { Request, Response } from "express";
import { parseReqBodyDate } from "../helpers/handle-file-errors";

export class DeleterController{
    constructor(private readonly deleterService: DeleterService){}

    public async deleteAllDirFiles(req:Request, res:Response){
        const result = await this.deleterService.deleteAllDirFiles(req.body.dirPath);
        res.status(result.status).send(result.message);
    };

    public async deleteDirFilesFromAccessDate(req:Request, res:Response){
        const validDate = parseReqBodyDate(req.body.date);
        if(validDate.isValid){
            const result = await this.deleterService.deleteDirFilesFromAccessDate(req.body.dirPath, validDate.date);
            res.status(result.status).send(result.message);
        }else{
            res.status(403).send('Invalid date');
        }
    }

    public async deleteDirFilesUpToAccessDate(req:Request, res:Response){
        const validDate = parseReqBodyDate(req.body.date);
        if(validDate.isValid){
            const result = await this.deleterService.deleteDirFilesUpToAccessDate(req.body.dirPath, validDate.date);
            res.status(result.status).send(result.message);
        }else{
            res.status(403).send('Invalid date');
        }
        
    }
}