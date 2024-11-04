import { ReturnObject } from "../interfaces/return-object";
import fs from 'fs';
import path from 'path';

export class DeleterService{

    async deleteAllDirFiles(reqDirPath:string): Promise<ReturnObject>{
        if(!fs.existsSync(reqDirPath)){
            return {
                status:400,
                message:'Path not found!'
            }
        }

        try{
            const data = await fs.promises.readdir(reqDirPath);

            for(const file of data){
                const filePath = path.join(reqDirPath,file);
                fs.promises.rm(filePath, {recursive:true});
            }

            return {
                status:200,
                message: 'Directory cleared successfully'
            }
        }catch(err){
            if(err instanceof Error && 'code' in err){
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
            }else{
                return{
                    status:500,
                    message: 'Unknown error'
                }
            }
        }
    }
}