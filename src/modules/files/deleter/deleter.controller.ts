import { DeleterService } from "./deleter.service";
import { PathService } from "../path/path.service";
import { Request, Response } from "express";
import { parseReqBodyDate, verifyReqBodyExtensionList } from "../helpers/handle-file-errors";

export class DeleterController{
    constructor(
        private readonly deleterService: DeleterService,
        private readonly pathService: PathService
    ){}

    public async deleteAllDirFiles(req:Request, res:Response){
        const result = await this.deleterService.deleteAllDirFiles(this.pathService.getDirPath());
        res.status(result.status).send(result.body);
    };

    public async deleteFilesLastAccessedAfterDate(req:Request, res:Response){
        const validDate = parseReqBodyDate(req.body.date);
        if(validDate.isValid){
            const result = await this.deleterService.deleteFilesLastAccessedAfterDate(
                this.pathService.getDirPath(),
                validDate.date
            );
            res.status(result.status).send(result.body);
        }else{
            res.status(403).send('Invalid date');
        }
    }

    public async deleteFilesLastAccessedBeforeDate(req:Request, res:Response){
        const validDate = parseReqBodyDate(req.body.date);
        if(validDate.isValid){
            const result = await this.deleterService.deleteFilesLastAccessedBeforeDate(
                this.pathService.getDirPath(),
                validDate.date
            );
            res.status(result.status).send(result.body);
        }else{
            res.status(403).send('Invalid date');
        }
    }

    public async deleteFilesCreatedAfterDate(req:Request, res:Response){
        const validDate = parseReqBodyDate(req.body.date);
        if(validDate.isValid){
            const result = await this.deleterService.deleteFilesCreatedAfterDate(
                this.pathService.getDirPath(),
                validDate.date
            );
            res.status(result.status).send(result.body);
        }else{
            res.status(403).send('Invalid date'); 
        }
    }

    public async deleteFilesCreatedBeforeDate(req:Request, res:Response){
        const validDate = parseReqBodyDate(req.body.date);
        if(validDate.isValid){
            const result = await this.deleterService.deleteFilesCreatedBeforeDate(
                this.pathService.getDirPath(),
                validDate.date
            );
            res.status(result.status).send(result.body);
        }else{
            res.status(403).send('Invalid date'); 
        }
    }

    public async deleteFilesModifiedAfterDate(req:Request, res:Response){
        const validDate = parseReqBodyDate(req.body.date);
        if(validDate.isValid){
            const result = await this.deleterService.deleteFilesModifiedAfterDate(
                this.pathService.getDirPath(),
                validDate.date
            );
            res.status(result.status).send(result.body);
        }else{
            res.status(403).send('Invalid date'); 
        }
    }

    public async deleteFilesModifiedBeforeDate(req:Request, res:Response){
        const validDate = parseReqBodyDate(req.body.date);
        if(validDate.isValid){
            const result = await this.deleterService.deleteFilesModifiedBeforeDate(
                this.pathService.getDirPath(),
                validDate.date
            );
            res.status(result.status).send(result.body);
        }else{
            res.status(403).send('Invalid date'); 
        }
    }

    public async deleteDirFilesByExtensions(req:Request, res:Response){
        if(verifyReqBodyExtensionList(req.body.extensionList)){
            const result = await this.deleterService.deleteDirFilesByExtensions(
                this.pathService.getDirPath(),
                req.body.extensionList
            );
            res.status(result.status).send(result.body);
        }else{
            res.status(403).send('Extension list must be array!');
        }
    }
}