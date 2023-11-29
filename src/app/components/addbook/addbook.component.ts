import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookVm, TicketVm } from 'src/app/models/bookvm';
import { sharedService } from 'src/app/services/sharedservice.service';
@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  constructor(private sharedService: sharedService, private _snackBar: MatSnackBar) { }
  TicketId = ''
  Title = ''
  Description = ''
  //Image = 'https://smartlibrarystorage.blob.core.windows.net/libraryassets/book-cartoon_22350-95.avif'
  //ISBN = ''
  PriorityId='';
  priorities = [];
  currentUserData:any;
  ngOnInit(): void {
    this.sharedService.getPriorities().subscribe(x => {
      this.priorities = x;
    });
    this.currentUserData = this.sharedService.currentUserData;
  }
  addBook() {
    var model: TicketVm = {
      title: this.Title,
      description: this.Description,
      createdby: parseInt(this.currentUserData.userId),
      priorityId: this.PriorityId,
    }
    console.log(model)

    this.sharedService.createTicket(model).subscribe(x => {
      this._snackBar.open("Ticket created");
      setTimeout(x => {
        window.location.reload()
      }, 1500)
    }, error => {
      this._snackBar.open('Some thing went wrong', 'Dismiss', {
        duration: 1500,
      });
    })


  }
}

