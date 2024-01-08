export class Order {
    userId!: number;
    amount!: number;
    pageCount!: number;
    coverType!: string;
    bookName!: string;
    bindingType!: string;
    format!: string;
    sizeX!: number;
    sizeY!: number;

    constructor(userId: number, amount: number, pageCount: number, coverType: string, 
        bookName: string, bindingType: string, format: string, sizeX: number, sizeY: number){

    this.userId= userId;
    this.amount= amount;
    this.pageCount= pageCount;
    this.coverType= coverType;
    this.bookName= bookName;
    this.bindingType= bindingType;
    this.format= format;
    this.sizeX= sizeX;
    this.sizeY= sizeY;
    }
}


