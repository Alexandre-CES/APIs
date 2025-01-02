import fs from 'fs';
import path from 'path';
import { FileTypes } from './interfaces/file-types.interface';
import { SimpleReturnObject } from '../interfaces/return-object';
import { handleFileErrors } from '../helpers/handle-file-errors';

export class OrganizerService{

    /*
        *organize user's chosen directory, creating folders based on file extensions

            There is already a default json file which contains the folders that should be created. 
            The user can, optionally, customize it passing a customJson at body, that should use the following structure:
            
            {
                "customJson":{
                    "folder1": [".ext1", ".ext2"],
                    "folder2": [".ext1", ".ext2"]
                }
            }

            Any other structure is going to fail.
    */
    async organize(baseDirPath: string, customJson?:FileTypes): Promise<SimpleReturnObject>{

        try {
            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            let fileTypes: FileTypes;

            if(customJson){
                fileTypes = customJson;
            }else{
                 // read file-types.json
                const jsonFilePath = path.join(process.cwd(), 'src/modules/files/organizer/json/file-types.json');
                const jsonData = await fs.promises.readFile(jsonFilePath);
                fileTypes = JSON.parse(jsonData.toString());
            }

            for (const file of data) {
                const filePath = path.join(baseDirPath, file);
                const stats = await fs.promises.stat(filePath);

                // if isn't a directory
                if (stats.isFile()) {
                    const ext = path.extname(file).toLowerCase();
                    let moved = false;
        
                    for (const directory in fileTypes) {
                        //stop loop if there are repeated extensions in different directories in the json file
                        if (moved) break; 

                        const fileExtensions: string[] = fileTypes[directory];

                        if (fileExtensions.includes(ext)) {
                            const dirPath = path.join(baseDirPath, directory);

                            //create dirpath if doesn't exist 
                            if (!fs.existsSync(dirPath)) {
                                fs.mkdirSync(dirPath, { recursive: true });
                            }

                            //copy file
                            const destFilePath = path.join(dirPath, file);
                            await fs.promises.copyFile(filePath, destFilePath);

                            //verify if copy exist before delete the original one
                            const copiedStats = await fs.promises.stat(destFilePath);
                            if (copiedStats.size === stats.size) {
                                await fs.promises.unlink(filePath);
                                moved = true;
                            }
                        }
                    }
                }
            }
    
            return {
                status:200,
                body:'Files organized successfully'
            }
        } catch(err) {
            return handleFileErrors(err);
        }
    }

    /*
        * organize files by type of date 
    
        The user will choose one of the following types of dates:
        
        -atime = access time
        -ctime = creation time
        -birthtime = birth time
        -mtime = modification time (default)

        if none or a non-existent is chosen, dateType will be replaced by the default(mtime)
    */
    async organizeByDate(baseDirPath:string, dateTypeString: string): Promise<SimpleReturnObject>{

        try{
            
            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            for(const file of data){
                const filePath = path.join(baseDirPath, file);
                const stats = await fs.promises.stat(filePath);

                //check if is file
                if(stats.isFile()){
                    let dateType: Date;

                    //set the chosen dateType
                    if(dateTypeString == 'atime'){
                        dateType = stats.atime;
                    }else if(dateTypeString == 'ctime'){
                        dateType = stats.ctime;
                    }else if(dateTypeString == 'birthTime'){
                        dateType = stats.birthtime;
                    }else{
                        dateType = stats.mtime;
                    }

                    const dateString: string = `${dateType.getMonth() + 1}-${dateType.getFullYear()}`;
                    const dirPath = path.join(baseDirPath, dateString);

                    if(!fs.existsSync(dirPath)){
                        fs.mkdirSync(dirPath, { recursive: true });
                    }

                    const destFilePath = path.join(dirPath, file);
                    await fs.promises.copyFile(filePath, destFilePath);

                    //verify if copy exist before delete the original one
                    const copiedStats = await fs.promises.stat(destFilePath);
                    if (copiedStats.size === stats.size) {
                        await fs.promises.unlink(filePath);
                    }
                }
            }

            return{
                status: 200,
                body:'Files organized successfully'
            }
        }catch(err){
            return handleFileErrors(err);
        }
    }
}