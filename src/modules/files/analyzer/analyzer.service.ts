import { SimpleReturnObject } from "../interfaces/return-object";
import { GetSizeInterface } from "./interfaces/getSizeInterface";
import fs from 'fs';
import path from 'path';

import { handleFileErrors } from "../helpers/handle-file-errors";
import { calcTotalDirectory } from "./helpers/calcTotalDirectory";
import { parseSize } from "./helpers/parseSize";

/*
TODO: Return of getSize do not include directories, so i need to do something about it.
*/
export class AnalyzerService{
    
    // Get directory's files size 
    async getSize(baseDirPath:string): Promise<GetSizeInterface | SimpleReturnObject>{

        try{
            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            let sizeInBytes:number = 0;

            //catch info of each file
            const itemsSize = await Promise.all(data.map(async (item) =>{

                const itemPath = path.join(baseDirPath,item);
                const stats = await fs.promises.stat(itemPath);

                let itemSize:string;
                let itemType:'folder' | 'file';

                //if folder, calc his total based on his files and folders
                if(stats.isDirectory()){
                    const directorySize = await calcTotalDirectory(itemPath);
                    sizeInBytes += directorySize;
                    itemSize = parseSize(directorySize);

                    itemType = 'folder';

                //if file, just get his size
                }else{
                    const statsSize = stats.size;
                    sizeInBytes += statsSize;
                    itemSize = parseSize(statsSize);

                    itemType = 'file';
                }

                return{
                    itemName: item,
                    itemSize: itemSize,
                    itemType: itemType
                };
            }));

            const totalSize = parseSize(sizeInBytes);

            const body = {
                directory: baseDirPath,
                size: totalSize,
                itemsSize: itemsSize
            };

            return {
                status: 200,
                body:body
            };
        }catch(err){
            return handleFileErrors(err);
        }
    }
}