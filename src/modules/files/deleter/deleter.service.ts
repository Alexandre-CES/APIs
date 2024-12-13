import { ReturnObject } from "../interfaces/return-object";
import fs from 'fs';
import path from 'path';
import { handleFileErrors } from "../helpers/handle-file-errors";

//Delete files from directory
export class DeleterService{

    //delete all files of the directory
    async deleteAllDirFiles(baseDirPath:string): Promise<ReturnObject>{
        
        try{
            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            //iterate for every file of directory, deleting them
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

    //Delete all files whose last access date is after the date in the request body
    async deleteFilesLastAccessedAfterDate(baseDirPath:string, date:Date): Promise<ReturnObject>{

        try{
            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            //iterate each file from directory
            for(const file of data){

                //catch stats of file
                const filePath = path.join(baseDirPath,file);
                const stats = await fs.promises.stat(filePath);

                //delete file if access date is after date
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

    //Delete all files whose last access date is before the date in the request body
    async deleteFilesLastAccessedBeforeDate(baseDirPath:string, date:Date): Promise<ReturnObject>{

        try{

            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            //iterate each file from directory
            for(const file of data){

                //catch stats of file
                const filePath = path.join(baseDirPath,file);
                const stats = await fs.promises.stat(filePath);

                 //delete file if access date is before date
                if(stats.atime < date){
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

    //Delete all files whose creation date is after date of request body 
    async deleteFilesCreatedAfterDate(baseDirPath:string, date:Date): Promise<ReturnObject>{
        try{

            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            //iterate each file from directory
            for(const file of data){

                //catch stats of file
                const filePath = path.join(baseDirPath,file);
                const stats = await fs.promises.stat(filePath);

                 //delete file if its creation date is after date 
                if(stats.ctime > date){
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

    //Delete all files whose creation date is before date of request body 
    async deleteFilesCreatedBeforeDate(baseDirPath:string, date:Date): Promise<ReturnObject>{
        
        try{
            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            //iterate each file from directory
            for(const file of data){

                //catch stats of file
                const filePath = path.join(baseDirPath,file);
                const stats = await fs.promises.stat(filePath);

                //delete file if its creation date is before date
                console.log(stats.ctime)
                if(stats.ctime < date){
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

    //delete all files whose extension is in extension list 
    async deleteDirFilesByExtensions(baseDirPath:string, reqExtensions:string[]): Promise<ReturnObject>{

        try{

            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            //iterate each file from directory
            for(const file of data){

                //get extension of file
                const ext = path.extname(file).toLowerCase();

                //delete file if its extension is in extension list
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