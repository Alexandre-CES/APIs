import { SimpleReturnObject } from "../interfaces/return-object";
import fs from 'fs';
import path from 'path';
import { handleFileErrors } from "../helpers/handle-file-errors";

//Delete files from directory
export class DeleterService{

    //delete all files of the directory
    async deleteAllDirFiles(baseDirPath:string): Promise<SimpleReturnObject>{
        
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
                body: 'Directory cleared successfully'
            };

        }catch(err){
            return handleFileErrors(err);
        }
    }

    /*
        *Delete all files whose date is after the date in the request body

        for default, the type of date is access time (atime), but user can give the dateTypeString at req.body, wich can be:

        -mtime = modification time
        -ctime = creation time
        -birthtime = birth time
    */
    async deleteFilesAfterDate(
        baseDirPath:string,
        date:Date,
        dateTypeString: string
    ): Promise<SimpleReturnObject>{

        try{
            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            //iterate each file from directory
            for(const file of data){

                //catch stats of file
                const filePath = path.join(baseDirPath,file);
                const stats = await fs.promises.stat(filePath);

                let dateType: Date;

                //set the chosen dateType
                if(dateTypeString == 'mtime'){
                    dateType = stats.mtime;
                }else if(dateTypeString == 'ctime'){
                    dateType = stats.ctime;
                }else if(dateTypeString == 'birthTime'){
                    dateType = stats.birthtime;
                }else{
                    dateType = stats.atime;
                }

                //delete file if dateType is after date
                if(dateType > date){
                    fs.promises.rm(filePath, {recursive:true});
                }
            }

            return {
                status: 200,
                body:'Files deleted successfully'
            };

        }catch(err){
            return handleFileErrors(err);
        }
    }

    /*
        *Delete all files whose date is before the date in the request body

        for default, the type of date is access time (atime), but user can give the dateTypeString at req.body, wich can be:

        -mtime = modification time
        -ctime = creation time
        -birthtime = birth time
    */
    async deleteFilesBeforeDate(
        baseDirPath:string,
        date:Date,
        dateTypeString: string
    ): Promise<SimpleReturnObject>{

        try{

            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            //iterate each file from directory
            for(const file of data){

                //catch stats of file
                const filePath = path.join(baseDirPath,file);
                const stats = await fs.promises.stat(filePath);

                let dateType: Date;

                //set the chosen dateType
                if(dateTypeString == 'mtime'){
                    dateType = stats.mtime;
                }else if(dateTypeString == 'ctime'){
                    dateType = stats.ctime;
                }else if(dateTypeString == 'birthTime'){
                    dateType = stats.birthtime;
                }else{
                    dateType = stats.atime;
                }

                 //delete file if dateType is before date
                if(dateType < date){
                    fs.promises.rm(filePath, {recursive:true});
                }
            }

            return {
                status: 200,
                body:'Files deleted successfully'
            };

        }catch(err){
            return handleFileErrors(err);
        }
    }

    //delete all files whose extension is in extension list 
    async deleteDirFilesByExtensions(baseDirPath:string, reqExtensions:string[]): Promise<SimpleReturnObject>{

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
                body:'Files deleted successfully'
            };
        }catch(err){
            return handleFileErrors(err);
        }
    }
}