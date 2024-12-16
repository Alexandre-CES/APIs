import { SimpleReturnObject } from "../interfaces/return-object";

//make status code optional 
interface CustomError extends Error { 
    code?: string;
}

//Return status code and message of error
export function handleFileErrors(err:unknown): SimpleReturnObject{
    if(err instanceof Error && 'code' in err){
        const errorCode = (err as CustomError).code;
        switch (errorCode) { 
            case 'ENOENT': 
                return {
                    status:404,
                    body:'File or directory not found.'
                }
            case 'EACCES': 
                return {
                    status:403,
                    body:'Permission denied.'
                }
            default: 
                return {
                    status:500,
                    body:'Internal server error.'
                }
        } 
    }else{
        return{
            status:500,
            body: 'Unknown error'
        }
    }
}

interface ParsedDateResult{
    isValid: boolean;
    date: Date;
}

//parse string date to Date() format and check if is valid
export function parseReqBodyDate(reqDate:string): ParsedDateResult{
    const date = new Date(reqDate);
    const isValid = !isNaN(date.getTime());

    return{
        isValid,
        date: date
    }
}

//verify if extension list is correct, return true or false
export function verifyReqBodyExtensionList(extensionList: string[]): boolean{
    if(extensionList instanceof Array){
        return true;
    }else{
        return false;
    }
}