import { BookTransaction } from "./BookTransaction";
export class Book {
    Id: string = '';
    BookId: string = '';
    Title: string = '';
    Description: string = '';
    Image: string = '';
    ISBN: string = '';
    Category: string = '';
    PublishedYear: number = 0;
    Author: string = '';
    Status: string = '';
    isAvailable: boolean = true;
    bookTransactions: Array<BookTransaction> = [];
}

export class BookCategory {
    Id: string = '';
    CategoryId: number = 0;
    CategoryName: string = '';
}