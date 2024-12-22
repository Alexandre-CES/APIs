import fs from 'fs';
import path from 'path';
import { SimpleReturnObject } from "../interfaces/return-object";
import { GetSizeInterface } from "./interfaces/getSizeInterface";
import { GetDatesInterface } from './interfaces/getDatesInterface';
import { handleFileErrors } from "../helpers/handle-file-errors";
import { calcTotalDirectory } from "./helpers/calcTotalDirectory";
import { parseSize } from "./helpers/parseSize";

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

    /*
        TODO: getDates: return (creation, modification, access) date from files of directory
    */
    async getDates(baseDirPath:string):Promise<GetDatesInterface | SimpleReturnObject>{
        try{

            return{

            }
        }catch(err){
            return handleFileErrors(err);
        }
    }
}