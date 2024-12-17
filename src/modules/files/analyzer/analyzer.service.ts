import { SimpleReturnObject } from "../interfaces/return-object";
import { GetSizeInterface } from "./interfaces/getSizeInterface";
import fs from 'fs';
import path from 'path';

import { handleFileErrors } from "../helpers/handle-file-errors";

export class AnalyzerService{
    
    // Get directory's files size 
    async getSize(baseDirPath:string): Promise<any | SimpleReturnObject>{

        try{
            //read directory
            const data = await fs.promises.readdir(baseDirPath);

            //initiate body
            let body: Array<number> = [];

            for(const file of data){

                const filePath = path.join(baseDirPath,file);
                const stats = await fs.promises.stat(filePath);

                body.push(stats.size)

            }

            return {
                status: 200,
                body:body
            }

        }catch(err){
            handleFileErrors(err)
        }
    }
}