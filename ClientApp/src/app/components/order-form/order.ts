export class Order {
    userId: number;
    amount: number;
    pageCount: number;
    coverType: string;
    bookName: string;
    bindingType: string;
    format: string;
    sizeX: number;
    sizeY: number;
    status: string;
    id: any;
    notes: string;
    cuttingTimePer: number;
    bindingTimePer: number;
    coveringTimePer: number;

    constructor(
        userId: number, amount: number, pageCount: number, coverType: string, 
        bookName: string, bindingType: string, format: string, sizeX: number, sizeY: number,
        status: string, id = null, notes: any, cuttingTimePer: number, bindingTimePer: number, coveringTimePer: number
         ){

    this.userId= userId;
    this.amount= amount;
    this.pageCount= pageCount;
    this.coverType= coverType;
    this.bookName= bookName;
    this.bindingType= bindingType;
    this.format= format;
    this.sizeX= sizeX;
    this.sizeY= sizeY;
    this.status = status;
    this.id = id;
    this.notes = notes;
    this.cuttingTimePer = cuttingTimePer;
    this.bindingTimePer = bindingTimePer;
    this.coveringTimePer = coveringTimePer;
    }
}


