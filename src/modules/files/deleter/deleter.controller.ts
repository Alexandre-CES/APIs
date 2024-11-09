import { DeleterService } from "./deleter.service";
import { PathService } from "../path/path.service";
import { Request, Response } from "express";
import { parseReqBodyDate } from "../helpers/handle-file-errors";

export class DeleterController{
    constructor(
        private readonly deleterService: DeleterService,
        private readonly pathService: PathService
    ){}

    public async deleteAllDirFiles(req:Request, res:Response){
        const result = await this.deleterService.deleteAllDirFiles(this.pathService.getDirPath());
        res.status(result.status).send(result.message);
    };

    public async deleteDirFilesFromAccessDate(req:Request, res:Response){
        const validDate = parseReqBodyDate(req.body.date);
        if(validDate.isValid){
            const result = await this.deleterService.deleteDirFilesFromAccessDate(
                this.pathService.getDirPath(),
                validDate.date
            );
            res.status(result.status).send(result.message);
        }else{
            res.status(403).send('Invalid date');
        }
    }

    public async deleteDirFilesUpToAccessDate(req:Request, res:Response){
        const validDate = parseReqBodyDate(req.body.date);
        if(validDate.isValid){
            const result = await this.deleterService.deleteDirFilesUpToAccessDate(
                this.pathService.getDirPath(),
                validDate.date
            );
            res.status(result.status).send(result.message);
        }else{
            res.status(403).send('Invalid date');
        }
    }

    public async deleteDirFilesByExtensions(req:Request, res:Response){
        const result = await this.deleterService.deleteDirFilesByExtensions(
            this.pathService.getDirPath(),
            req.body.extensionList
        );

        res.status(result.status).send(result.message);
    }
}