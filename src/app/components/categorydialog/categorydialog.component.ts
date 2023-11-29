import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-categorydialog',
  templateUrl: './categorydialog.component.html',
  styleUrls: ['./categorydialog.component.css']
})
export class CategorydialogComponent implements OnInit {

  categoryName='';
  constructor(
    public dialogRef: MatDialogRef<CategorydialogComponent>,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  addCategory(){
    this.dialogRef.close(this.categoryName);
  }

}
