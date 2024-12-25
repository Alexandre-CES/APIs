
//parse bytes to a formated string
export function parseSize(size: number): string{
    
    const sizes: string[] = ['B','KB','MB','GB','TB'];
    let i = 0;
    while (size >= 1024){ 
        size /= 1024;
        i += 1;
    }    

    let parsedSize: string = `${size.toFixed(2)} ${sizes[i]}`; 
    return parsedSize;
}