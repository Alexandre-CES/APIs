import fs from 'fs';
import path from 'path'
import { SimpleReturnObject } from '../interfaces/return-object';

//store path of directory that the API should run in 
export class PathService{
    private dirPath:string = '';

    //return directory
    getDirPath():string{
        return this.dirPath;
    }

    //set directory
    setDirPath(basePath:string):SimpleReturnObject{

        //check if directory exist
        if(!fs.existsSync(basePath)){
            return {
                status:404,
                body: 'Path not found'
            };
        }else{
            this.dirPath = path.resolve(basePath);
            return{
                status:200,
                body:'success'
            };
        }
    }
}