import { ReturnObject } from "../interfaces/return-object";
import { GetSizeInterface } from "./interfaces/getSizeInterface";
import fs from 'fs';
import path from 'path';

import { handleFileErrors } from "../helpers/handle-file-errors";

export class AnalyzerService{
    
    // Get directory's files size 
    async getSize(baseDirPath:string): Promise<any | ReturnObject>{

        try{
            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            //initiate body
            let body = {}

            for(const file of data){

                const filePath = path.join(baseDirPath,file);
                const stats = await fs.promises.stat(filePath);

                console.log(stats.blksize)
            }

            return {
                code: 200,
                body:body
            }

        }catch(err){
            handleFileErrors(err)
        }
    }
}