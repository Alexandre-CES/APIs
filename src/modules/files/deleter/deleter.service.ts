import { ReturnObject } from "../interfaces/return-object";
import fs from 'fs';
import path from 'path';
import { handleFileErrors } from "../helpers/handle-file-errors";

export class DeleterService{

    async deleteAllDirFiles(baseDirPath:string): Promise<ReturnObject>{
        
        try{
            const data = await fs.promises.readdir(baseDirPath);

            for(const file of data){
                const filePath = path.join(baseDirPath,file);
                fs.promises.rm(filePath, {recursive:true});
            }

            return {
                status:200,
                message: 'Directory cleared successfully'
            };

        }catch(err){
            return handleFileErrors(err);
        }
    }

    async deleteDirFilesFromAccessDate(baseDirPath:string, date:Date): Promise<ReturnObject>{

        try{
            const data = await fs.promises.readdir(baseDirPath);

            for(const file of data){

                const filePath = path.join(baseDirPath,file);
                const stats = await fs.promises.stat(filePath);

                if(stats.atime > date){
                    fs.promises.rm(filePath, {recursive:true});
                }
            }

            return {
                status: 200,
                message:'Files deleted successfully'
            };

        }catch(err){
            return handleFileErrors(err);
        }
    }

    async deleteDirFilesUpToAccessDate(baseDirPath:string, date:Date): Promise<ReturnObject>{

        try{
            const data = await fs.promises.readdir(baseDirPath);

            for(const file of data){

                const filePath = path.join(baseDirPath,file);
                const stats = await fs.promises.stat(filePath);

                if(stats.atime <= date){
                    fs.promises.rm(filePath, {recursive:true});
                }
            }

            return {
                status: 200,
                message:'Files deleted successfully'
            };

        }catch(err){
            return handleFileErrors(err);
        }
    }

    async deleteDirFilesByExtensions(baseDirPath:string, reqExtensions:string[]): Promise<ReturnObject>{
        try{

            const data = await fs.promises.readdir(baseDirPath);

            for(const file of data){
                const ext = path.extname(file).toLowerCase();

                if(reqExtensions.includes(ext)){
                    const filePath = path.join(baseDirPath, file);
                    await fs.promises.unlink(filePath);
                }

            }

            return {
                status:200,
                message:'Files deleted successfully'
            };
        }catch(err){
            return handleFileErrors(err);
        }
    }
}