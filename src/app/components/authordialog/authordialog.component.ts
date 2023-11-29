import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-authordialog',
  templateUrl: './authordialog.component.html',
  styleUrls: ['./authordialog.component.css']
})
export class AuthordialogComponent implements OnInit {

 constructor(
    public dialogRef: MatDialogRef<AuthordialogComponent>,
  ) {}
  authorName='';
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  addAuthor(){
    this.dialogRef.close(this.authorName);
  }
}
