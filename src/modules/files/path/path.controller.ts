import { PathService } from "./path.service";
import { Request, Response } from "express";

export class PathController{
    constructor(private readonly pathService:PathService){}

    public getDirPath(req:Request,res:Response){
        res.send(this.pathService.getDirPath());
    }

    public setDirPath(req: Request, res:Response){
        const result = this.pathService.setDirPath(req.body.dirPath);

        res.status(result.status).send(result.message);
    }
}