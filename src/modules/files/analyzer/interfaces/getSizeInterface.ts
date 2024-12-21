
interface ItemsSize{
    itemName: string;
    itemSize: string;
    itemType: 'folder' | 'file';
}

interface GetSizeInterfaceBody{
    directory: string;
    size: string;
    itemsSize: ItemsSize[];
}

export interface GetSizeInterface{
    status: number;
    body: GetSizeInterfaceBody;
}

/*
    *structure example:
    
    status: 200,
    body:{
        directory: 'C:/Downloads',
        size: 13.87 GB,
        filesSize:[
            {
                fileName: 'file1',
                fileSize: 123.34 MB
            }
        ]
    }
*/