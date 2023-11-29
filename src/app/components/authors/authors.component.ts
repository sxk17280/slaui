import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sharedService } from 'src/app/services/sharedservice.service';
import { AuthordialogComponent } from '../authordialog/authordialog.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  displayedColumns: string[] = ['authorId', 'name'];
  dataSourceAuthors = [];
  showTable = false;
  authorName = '';

  constructor(private sharedService: sharedService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sharedService.getAuthors().subscribe(x => {
      this.dataSourceAuthors = x;
      this.showTable = true;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthordialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.authorName = result;
      this.addAuthor()
    });
  }

  addAuthor() {
    // this.trigger.closeMenu();
    var model = {
      Id: 0,
      AuthorId: this.dataSourceAuthors.length + 1,
      Name: this.authorName
    }
    this.sharedService.addAuthor(model).subscribe(x => {
      this.authorName = '';
      this._snackBar.open("Author added", 'Dismiss', {
        duration: 2000,
      });
      this.ngOnInit();
    },
      error => {
        this._snackBar.open('Some thing went wrong', 'Dismiss', {
          duration: 2000,
        });
      },)
  }
}
