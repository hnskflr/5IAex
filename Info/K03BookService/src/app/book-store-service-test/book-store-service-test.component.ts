import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookFactory } from '../shared/book-factory';
import { BookStoreService } from '../shared/book-store-service';

@Component({
  selector: 'is-book-store-service-test',
  templateUrl: './book-store-service-test.component.html',
  styleUrls: ['./book-store-service-test.component.scss']
})
export class BookStoreServiceTestComponent implements OnInit {

  output: string = "";

  constructor(private bookService: BookStoreService) { }

  ngOnInit(): void { }

  resetStore() {
    this.bookService.resetStore().subscribe(
      (res) => this.output = res,
      (err) => this.output = err.message
    );
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe(
      (res) => this.output = this.booksToString(res),
      (err) => this.output = err.message
    );
  }

  searchBook(searchTerm: string) {
    this.bookService.searchBook(searchTerm).subscribe(
      (res) => this.output = this.booksToString(res),
      (err) => this.output = err.message
    );
  }

  createBook() {
    this.bookService.createBook(BookFactory.random()).subscribe(
      (res) => this.output = JSON.stringify(res),
      (err) => this.output = err.message
    );
  }

  // TODO: fix response
  deleteBook(isbn: string) {
    console.log(isbn);
    this.bookService.deleteBook(isbn).subscribe(
      (res) => this.output = res.toString(),
      (err) => this.output = err.message
    );
  }

  getBook(isbn: string) {
    this.bookService.getBook(isbn).subscribe(
      (res) => this.output = this.booksToString([res]),
      (err) => this.output = err.message
    );
  }

  updateBook(isbn: string) {
    var book = BookFactory.random();
    book.isbn = isbn;
    this.bookService.updateBook(isbn, book).subscribe(
      (res) => this.output = res.toString(),
      (err) => this.output = err.message
    );
  }

  checkBook(isbn: string) {
    this.bookService.checkBook(isbn).subscribe(
      (res) => this.output = res.toString(),
      (err) => this.output = err.message
    );
  }

  rateBook(isbn: string, rating: string) {
    this.bookService.rateBook(isbn, parseInt(rating)).subscribe(
      (res) => this.output = res.toString(),
      (err) => this.output = err.message
    );
  }

  booksToString(books: Book[]) {
    let result = "";
    books.forEach(book => {
      result += "<b>Titel:</b> " + book.title + 
               " <b>ISBN:</b> " + book.isbn + 
               " <b>Autoren:</b> " + book.authors + 
               " <b>Bewertung:</b> " + book.rating + 
                "<br>";
    });
    return result;
  }

}
