import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-issuedbooks',
  templateUrl: './issuedbooks.component.html',
  styleUrls: ['./issuedbooks.component.css']
})
export class IssuedbooksComponent implements OnInit {
  @ViewChild('comments') commentsDialog: TemplateRef<any>;
  @ViewChild('addcomments') addCommentsDialog: TemplateRef<any>;
  displayedColumns: string[] = ['ticketId', 'title', 'description', 'status', 'priority', 'createdByFirstName', 'dueDate', 'comments', 'actions'];
  dataSourceIssuedBooks = [];
  showTable = false;
  commentText: string = '';
  users = []
  tickets = []
  currentUserData: any;
  unModifiedBooks = [];
  statusList: [];
  commentList: [];
  currentTicketId;
  statusId;
  isAdmin: false;
  constructor(private sharedService: sharedService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.currentUserData = this.sharedService.currentUserData;
    this.isAdmin = this.currentUserData.isAdmin;
    this.getData();
    this.sharedService.getStatusList().subscribe(x => {
      this.statusList = x.filter(x => x.description != 'Open');
    });
  }

  openDialog(ticket) {
    this.commentList = ticket.comments;
    const dialogRef = this.dialog.open(this.commentsDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openAddCommentDialog(ticket) {
    this.currentTicketId = ticket.ticketId;
    const dialogRef = this.dialog.open(this.addCommentsDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.commentText = '';
    });
  }

  onAddComment(): void {
    var model = {
      "ticketId": this.currentTicketId,
      "commentText": this.commentText,
      "createdBy": this.currentUserData.userId
    };
    this.sharedService.addComment(model).subscribe(x => {
      this._snackBar.open("Comment Added Successfully");
      this.getData();
    }, error => {
      this._snackBar.open('Some thing went wrong', 'Dismiss', {
        duration: 1500,
      });
    })
  }

  onStatusChange(ticket, event) {
    console.log(ticket);
    this.sharedService.updateTicketStatus(ticket.ticketId, event.value).subscribe(x => {
      this._snackBar.open("Stutus updated successfully");
      this.getData();
    }, error => {
      this._snackBar.open('Some thing went wrong', 'Dismiss', {
        duration: 1500,
      });
    })
  }


  getData() {
    this.dataSourceIssuedBooks = [];
    if (this.isAdmin) {
      this.sharedService.getTicketAssignedTo(this.currentUserData.userId).subscribe(x => {
        this.tickets = x;
        this.showTable = true;
      })
    } else {
      this.sharedService.getTicketsCreatedBy(this.currentUserData.userId).subscribe(x => {
        this.tickets = x;
        this.showTable = true;
      })
    }
  }
  modifyData(res) {
    res.forEach(element => {
      var user = this.users.find(x => x.userId == element.bookTransactions.userId);
      var model = {
        bookId: element.bookId,
        checkInDateTime: element.bookTransactions.checkInDateTime,
        dueDate: element.bookTransactions.dueDate,
        userName: !!user ? user.firstName + ' ' + user.lastName : '',
        title: element.title,
        actions: true,
        fine: element.bookTransactions.fine,
        isActive: element.bookTransactions.isActive,
        status: element.bookTransactions.status
      }
      console.log(model)
      this.dataSourceIssuedBooks.push(model);
    });
    this.showTable = true;
  }
  checkOut(eve) {
    var currentrecord = this.unModifiedBooks.find(x => x.bookId == eve.bookId);
    var model = {
      TransactionId: currentrecord.bookTransactions.transactionId,
      BookId: currentrecord.bookId,
      UserId: currentrecord.bookTransactions.userId,
      CheckInDateTime: currentrecord.bookTransactions.checkInDateTime,
      CheckOutDateTime: currentrecord.bookTransactions.checkOutDateTime,
      DueDate: currentrecord.bookTransactions.dueDate,
      Penalty: currentrecord.bookTransactions.fine,
      Status: currentrecord.status,
      RenewalCount: currentrecord.bookTransactions.renewalCount,
      IsActive: currentrecord.bookTransactions.isActive
    }
    this.sharedService.checkOut(model).subscribe(x => {
      this.getData();
      this.showTable = false;
      this._snackBar.open('Returned successfully', 'Dismiss', {
        duration: 2000,
      });
    },
      error => {
        this._snackBar.open('Some thing went wrong', 'Dismiss', {
          duration: 2000,
        });
      },
    )
  }
  renew(eve) {
    var currentrecord = this.unModifiedBooks.find(x => x.bookId == eve.bookId);
    var model = {
      TransactionId: currentrecord.bookTransactions.transactionId,
      BookId: currentrecord.bookId,
      UserId: currentrecord.bookTransactions.userId,
      CheckInDateTime: currentrecord.bookTransactions.checkInDateTime,
      CheckOutDateTime: currentrecord.bookTransactions.checkOutDateTime,
      DueDate: currentrecord.bookTransactions.dueDate,
      Penalty: currentrecord.bookTransactions.fine,
      Status: currentrecord.status,
      RenewalCount: currentrecord.bookTransactions.renewalCount,
      IsActive: currentrecord.bookTransactions.isActive
    }
    this.sharedService.renew(model).subscribe(x => {
      this.getData();
      this.showTable = false;
      this._snackBar.open('Renewed successfully', 'Dismiss', {
        duration: 2000,
      });
    },
      error => {
        this._snackBar.open('LIMIT_EXCEEDED', 'Dismiss', {
          duration: 2000,
        });
      },
    )
  }

}
