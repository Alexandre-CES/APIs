import fs from 'fs';
import path from 'path'
import { ReturnObject } from '../interfaces/return-object';

//store path of directory that the API should run in 
export class PathService{
    private dirPath:string = '';

    //return directory
    getDirPath():string{
        return this.dirPath;
    }

    //set directory
    setDirPath(basePath:string):ReturnObject{

        //check if directory exist
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