import fs from 'fs';
import path from 'path';
import { FileTypes } from './interfaces/file-types.interface';
import { ReturnObject } from '../interfaces/return-object';
import { handleFileErrors } from '../helpers/handle-file-errors';

export class OrganizerService{

    async organize(baseDirPath: string): Promise<ReturnObject>{

        try {
            
            const data = await fs.promises.readdir(baseDirPath);

            // read file-types.json
            const jsonFilePath = path.join(process.cwd(), 'src/modules/files/organizer/data/file-types.json');
            const jsonData = await fs.promises.readFile(jsonFilePath);
            const fileTypes: FileTypes = JSON.parse(jsonData.toString());
    
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
                message:'Files organized successfully'
            }
        } catch(err) {
            return handleFileErrors(err);
        }
    }
}