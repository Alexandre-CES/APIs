import { ReturnObject } from "../interfaces/return-object";

interface CustomError extends Error { 
    code?: string;
}

export function handleErrors(err:unknown): ReturnObject{
    if(err instanceof Error && 'code' in err){
        const errorCode = (err as CustomError).code;
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
