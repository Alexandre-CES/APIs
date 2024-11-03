import fs from 'fs';
import path from 'path';
import { FileTypes } from './interfaces/file-types.interface';
import { ReturnObject } from '../interfaces/return-object';

export class OrganizerService{

    async organize(reqDirPath: string): Promise<ReturnObject>{
        if (!fs.existsSync(reqDirPath)) { 
            return {
                status:400,
                message:'Path not found'
            }
          }
      
        try {
            const data = await fs.promises.readdir(reqDirPath);
    
            // read file-types.json
            const jsonFilePath = path.join(process.cwd(), 'src/modules/files/organizer/data/file-types.json');
            const jsonData = await fs.promises.readFile(jsonFilePath);
            const fileTypes: FileTypes = JSON.parse(jsonData.toString());
    
            for (const file of data) {
                const filePath = path.join(reqDirPath, file);
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
                        const dirPath = path.join(reqDirPath, directory);
        
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
            if (err instanceof Error && 'code' in err) { 
                const errorCode = (err as any).code;
                switch (errorCode) { 
                    case 'ENOENT': 
                        return {
                            status:404,
                            message:'File or directory not found.'
                        }
                    case 'EACCES': 
                        return {
                            status:403,
                            message:'Permission denied.'
                        }
                    default: 
                        return {
                            status:500,
                            message:'Internal server error.'
                        }
                } 
            } else { 
                return {
                    status:500,
                    message:'Unknown error.'
                }
            }
        }
    }
}