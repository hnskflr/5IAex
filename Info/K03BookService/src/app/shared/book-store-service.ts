import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "./book";

@Injectable()
export class BookStoreService {

    baseUrl: string = "http://localhost:3000/";

    constructor(private http: HttpClient) { }

    resetStore() {
        return this.http.delete(this.baseUrl + "books", { responseType: "text" });
    }
    
    getAllBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.baseUrl + "books");
    }
    
    searchBook(searchTerm: string): Observable<Book[]> {
        return this.http.get<Book[]>(this.baseUrl + "books/search/" + searchTerm);
    }

    createBook(book: Book) {
        return this.http.post(this.baseUrl + "book", book, { responseType: "text" });
    }
    
    deleteBook(isbn: string) {
        return this.http.delete(this.baseUrl + "book/" + isbn, { responseType: "text" });
    }
    
    getBook(isbn: string): Observable<Book> {
        return this.http.get<Book>(this.baseUrl + "book/" + isbn);
    }
    
    updateBook(isbn: string, book: Book) {
        var params = new HttpParams({fromString: JSON.stringify(book)});
        var headers = new HttpHeaders({"responseType": "text"});
        return this.http.put<boolean>(this.baseUrl + "book/" + isbn, book, { headers: headers });
    }
    
    checkBook(isbn: string) {
        return this.http.get<boolean>(this.baseUrl + "book/" + isbn + "/check");
    }
    
    rateBook(isbn: string, rating: number) {
        var params = new HttpParams({fromObject: {rating: rating.toString()}});
        var headers = new HttpHeaders({"responseType": "text"});
        return this.http.post<boolean>(this.baseUrl + "book/" + isbn + "/rate", params, { headers: headers });
    }
}
