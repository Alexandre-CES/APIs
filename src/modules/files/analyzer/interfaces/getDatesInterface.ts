
interface ItemsDates{
    itemName: string;
    itemCreationDate: Date;
    itemModificationDate: Date;
    itemAccessDate: Date;
}

interface GetDatesBodyInterface{
    directory: string;
    itemsDates: ItemsDates[];
}

export interface GetDatesInterface{
    status: number;
    body: GetDatesBodyInterface;
}