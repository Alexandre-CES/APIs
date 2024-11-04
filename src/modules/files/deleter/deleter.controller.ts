import { DeleterService } from "./deleter.service";
import { Request, Response } from "express";

export class DeleterController{
    constructor(private readonly deleterService: DeleterService){}

    public async deleteAllDirFiles(req:Request, res:Response){
        const result = await this.deleterService.deleteAllDirFiles(req.body.dirPath);

        res.status(result.status).send(result.message);
    };
}