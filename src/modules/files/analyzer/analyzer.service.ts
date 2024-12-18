import { SimpleReturnObject } from "../interfaces/return-object";
import { GetSizeInterface, GetSizeInterfaceBody } from "./interfaces/getSizeInterface";
import fs from 'fs';
import path from 'path';

import { handleFileErrors } from "../helpers/handle-file-errors";

export class AnalyzerService{
    
    // Get directory's files size 
    async getSize(baseDirPath:string): Promise<GetSizeInterface | SimpleReturnObject>{

        try{
            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            //catch info of each file
            const body = await Promise.all(data.map(async (file) =>{
                const filePath = path.join(baseDirPath,file);
                const stats = await fs.promises.stat(filePath);
                const fileSize = (stats.size * 0.001).toString()+' KB' ;

                return{
                    fileName: file,
                    fileSize: fileSize
                };
            }));

            return {
                status: 200,
                body:body
            }
        }catch(err){
            return handleFileErrors(err);
        }
    }
}