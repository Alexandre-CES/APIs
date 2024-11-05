import { ReturnObject } from "../interfaces/return-object";
import fs, { stat } from 'fs';
import path from 'path';
import { handleErrors } from "../helpers/files-error-handle";

export class DeleterService{

    async deleteAllDirFiles(reqDirPath:string): Promise<ReturnObject>{
        if(!fs.existsSync(reqDirPath)){
            return {
                status:400,
                message:'Path not found!'
            };
        }

        try{
            const data = await fs.promises.readdir(reqDirPath);

            for(const file of data){
                const filePath = path.join(reqDirPath,file);
                fs.promises.rm(filePath, {recursive:true});
            }

            return {
                status:200,
                message: 'Directory cleared successfully'
            };

        }catch(err){
            return handleErrors(err);
        }
    }

    async deleteDirFilesFromAccessDate(reqDirPath:string, reqDate:Date): Promise<ReturnObject>{

        if(!fs.existsSync(reqDirPath)){
            return {
                status: 400,
                message: 'Path not found'
            };
        }

        try{
            const data = await fs.promises.readdir(reqDirPath);

            for(const file of data){

                const filePath = path.join(reqDirPath,file);
                const stats = await fs.promises.stat(filePath);
                const date = new Date(reqDate);

                if(stats.atime > date){
                    fs.promises.rm(filePath, {recursive:true});
                }
            }

            return {
                status: 200,
                message:'Successfully deleted files'
            };

        }catch(err){
            return handleErrors(err);
        }
    }

    async deleteDirFilesToAccessDate(reqDirPath:string, reqDate:Date): Promise<ReturnObject>{

        if(!fs.existsSync(reqDirPath)){
            return {
                status: 400,
                message: 'Path not found'
            };
        }

        try{
            const data = await fs.promises.readdir(reqDirPath);

            for(const file of data){

                const filePath = path.join(reqDirPath,file);
                const stats = await fs.promises.stat(filePath);
                const date = new Date(reqDate);

                if(stats.atime <= date){
                    fs.promises.rm(filePath, {recursive:true});
                }
            }

            return {
                status: 200,
                message:'Successfully deleted files'
            };

        }catch(err){
            return handleErrors(err);
        }
    }
}