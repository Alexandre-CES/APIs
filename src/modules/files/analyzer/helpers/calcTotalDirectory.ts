
import fs from 'fs';
import path from 'path';

/*Return the total of folder's bytes
    It uses an recursive function to iterate each item of folder, calling this function again if it's another folder*/ 
export async function calcTotalDirectory(dirPath: string): Promise<number>{
    let totalSize: number = 0;

    const data = await fs.promises.readdir(dirPath);

    for(const item of data){
        const itemPath = path.join(dirPath,item);
        const stats = await fs.promises.stat(itemPath);

        //if directory, call this function again
        if (stats.isDirectory()){
            totalSize += await calcTotalDirectory(itemPath);
        //if not, just sum its size
        }else{
            totalSize += stats.size;
        }
    }

    return totalSize;
}