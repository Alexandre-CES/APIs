
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