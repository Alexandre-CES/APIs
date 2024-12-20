import { SimpleReturnObject } from "../interfaces/return-object";
import { GetSizeInterface } from "./interfaces/getSizeInterface";
import fs from 'fs';
import path from 'path';

import { handleFileErrors } from "../helpers/handle-file-errors";
import { parseSize } from "./helpers/parseSize";

export class AnalyzerService{
    
    // Get directory's files size 
    async getSize(baseDirPath:string): Promise<GetSizeInterface | SimpleReturnObject>{

        try{
            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            let sizeInBytes:number = 0;

            //catch info of each file
            const filesSize = await Promise.all(data.map(async (file) =>{

                const filePath = path.join(baseDirPath,file);
                const stats = await fs.promises.stat(filePath);
                const statsSize = stats.size
                
                const fileSize = parseSize(statsSize);
                sizeInBytes += statsSize;

                return{
                    fileName: file,
                    fileSize: fileSize
                };
            }));

            const size = parseSize(sizeInBytes);

            const body = {
                directory: baseDirPath,
                size: size,
                filesSize: filesSize
            }

            return {
                status: 200,
                body:body
            }
        }catch(err){
            return handleFileErrors(err);
        }
    }
}