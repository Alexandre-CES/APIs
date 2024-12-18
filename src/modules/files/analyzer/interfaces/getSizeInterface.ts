
export interface GetSizeInterfaceBody{
    fileName: string;
    fileSize: string;
}

export interface GetSizeInterface{
    status: number;
    body: GetSizeInterfaceBody[];
}