import fs from 'fs';
import path from 'path'
import { ReturnObject } from '../interfaces/return-object';

export class PathService{
    private dirPath:string = '';

    getDirPath():string{
        return this.dirPath;
    }

    setDirPath(basePath:string):ReturnObject{
        if(!fs.existsSync(basePath)){
            return {
                status:404,
                message: 'Path not found'
            };
        }else{
            this.dirPath = path.resolve(basePath);
            return{
                status:200,
                message:'success'
            };
        }
    }
}