import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookTransaction } from 'src/app/models/BookTransaction';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private sharedService: sharedService, private _snackBar: MatSnackBar) { }
  books: Array<Book> = [];
  showBooks = false;
  users: any = [];
  currentUser: any;
  isAdmin = false;
  showBooksMessage = "Show All books";
  ngOnInit(): void {
    console.log(this.currentUser);
    this.currentUser = JSON.parse(localStorage.getItem('currentuserData'));

    this.isAdmin = this.currentUser.isAdmin;
    this.getUsers();
    this.getBooks();
    if (!this.isAdmin) {
      this.currentSelecteduser = this.currentUser;
    }
    this.showBooks = true;
  }

  setCurrentUser() {
    if (!this.isAdmin) {
      this.sharedService.getCurrentUser(this.currentSelecteduser.userId).subscribe(x => {
        localStorage.removeItem('currentuserData');
        localStorage.setItem('currentuserData', JSON.stringify(x));
        this.currentUser = x;
        this.currentSelecteduser = x;
        this.getBooks();
        this.getUsers();
        this.showBooksMessage = "Show all books";
        this.books = this.userBooks;
      })
    }
  }
  toggleChanged(eve) {
    console.log(eve)
    if (eve.checked) {
      this.showBooksMessage = "Show my books";
      this.books = this.allBooks;
    }
    else {
      this.showBooksMessage = "Show all books";
      this.books = this.userBooks;
    }

  }
  getUsers() {
    this.users = [];
    this.sharedService.getSLAUsers().subscribe(x => {
      var res = x;
      res.forEach(element => {
        if (element.admin) {
          //  if (!!element.booksIssued) {
          this.users.push(element);
          //  }
        }
      });
    })
  }
  allBooks = [];
  userBooks = [];
  getBooks() {
    this.userBooks = [];
    this.allBooks = [];
    if (this.isAdmin) {
      this.sharedService.getTicketStatus(1).subscribe(x => {
        this.books = x;
        // this.books.forEach(book => {
        //   if(!this.isAdmin)
        //   book['userSelected'] = true;
        // });
        // if (!this.isAdmin) {
        //   if (!!this.currentUser.booksIssued && this.currentUser.booksIssued.length) {
        //     this.books = [];
        //     x.forEach(element => {
        //       var book = this.currentUser.booksIssued.find(x => x.bookId == element.bookId);
        //       element["showCheckInOption"] = true;
        //       element["showCheckOutOption"] = true;
        //       if (!!book) {
        //         this.userBooks.push(element);
        //       }
        //       this.allBooks.push(element);
        //     });
        //     this.books = this.userBooks;
        //   }
        // }
        // else {
        //   this.books = [];
        //   x.forEach(element => {
        //     element["showCheckInOption"] = true;
        //     element["showCheckOutOption"] = true;
        //     this.books.push(element);
        //   });
        // }
      })
    } else {
      this.sharedService.getTicketsCreatedBy(this.currentUser.userId).subscribe(x => {
        this.books = x;
      })
    }
  }
  showOptions = false;
  currentSelecteduser: any;
  selectedUserName = '';
  selectUser(book, userDetails) {
    book.userSelected = true;
    this.selectedUserName = userDetails.userName;
    console.log(userDetails);
    this.currentSelecteduser = this.users.find(x => x.userId == userDetails.value);
  }
  checkIn(book) {
    if (!!this.currentSelecteduser) {
      var model = {
        BookId: book.bookId,
        UserId: this.currentSelecteduser.userId,
        CheckInDateTime: '2022-11-18T17:56:23.028+00:00',
        CheckOutDateTime: '2022-11-18T17:56:23.028+00:00',
        DueDate: '2022-11-18T17:56:23.028+00:00',
        Penalty: 0,
        Status: 'Not Available'
      };

      this.sharedService.updateAssignedTo(book.ticketId, this.currentSelecteduser.userId).subscribe(x => {
        if (!!x) {
          this._snackBar.open('Assigned Successfully', 'Dismiss', {
            duration: 2000,
          });
          if (!this.isAdmin) {
            this.setCurrentUser();
          }
          else {
            this.getBooks();
            this.getUsers();
          }
          this.selectedUserName = '';
          this.currentSelecteduser = undefined;
        }
      },
        error => {
          this._snackBar.open('Some error occured', 'Dismiss', {
            duration: 2000,
          });
        },)

    }
    else {
      this._snackBar.open('select user', 'Dismiss', {
        duration: 2000,
      });
    }
  }
  checkOut(book) {
    if (!!this.currentSelecteduser) {
      var model = {
        BookId: book.bookId,
        UserId: this.currentSelecteduser.userId,
        CheckInDateTime: '2022-11-18T17:56:23.028+00:00',
        CheckOutDateTime: '2022-11-18T17:56:23.028+00:00',
        DueDate: '2022-11-18T17:56:23.028+00:00',
        Penalty: 0,
        Status: 'Available'
      };
      this.sharedService.checkOut(model).subscribe(x => {
        // if(!!x){
        this._snackBar.open('Issued Successfully', 'Dismiss', {
          duration: 2000,
        });
        if (!this.isAdmin) {
          this.setCurrentUser();
        }
        else {
          this.getBooks();
          this.getUsers();
        }
        this.selectedUserName = '';
        this.currentSelecteduser = undefined;

        // }
      })
    }
    else {
      this._snackBar.open('select user', 'Dismiss', {
        duration: 2000,
      });
    }
  }
  renew(book) {
    if (!!this.currentSelecteduser) {
      if (this.checkRenewals(book)) {
        var model = {
          BookId: book.bookId,
          UserId: this.currentSelecteduser.userId,
          CheckInDateTime: '2022-11-18T17:56:23.028+00:00',
          CheckOutDateTime: '2022-11-18T17:56:23.028+00:00',
          DueDate: '2022-11-18T17:56:23.028+00:00',
          Penalty: 0,
          Status: 'Available'
        };
        this.sharedService.renew(model).subscribe(x => {
          // if(!!x){
          this._snackBar.open('Renewed Successfully', 'Dismiss', {
            duration: 2000,
          });
          if (!this.isAdmin) {
            this.setCurrentUser();
          }
          else {
            this.getBooks();
            this.getUsers();
          }
          this.selectedUserName = '';
          this.currentSelecteduser = undefined;
          // }
        })
      }
      else {
        this._snackBar.open('Already 2 times renewed', 'Dismiss', {
          duration: 2000,
        });
      }
    }
    else {
      this._snackBar.open('select user', 'Dismiss', {
        duration: 2000,
      });
    }
  }
  checkRenewals(book) {
    var response = true;
    var count = 0;
    if (!!this.currentSelecteduser.renewals && this.currentSelecteduser.renewals.length) {
      this.currentSelecteduser.renewals.forEach(element => {
        if (element.bookId == book.bookId) {
          count++;
        }
      });
    }
    if (count >= 2) {
      response = false;
    }
    return response;
  }
}
