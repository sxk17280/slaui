import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sharedService } from 'src/app/services/sharedservice.service';
import { CategorydialogComponent } from '../categorydialog/categorydialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['categoryId', 'categoryName'];
  dataSourceCategories = [];
  showTable = false;
  categoryName = '';
  constructor(private sharedService: sharedService,private _snackBar: MatSnackBar,public dialog: MatDialog) { }
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  ngOnInit(): void {
    this.sharedService.getBookCategory().subscribe(x => {
      this.dataSourceCategories = x;
      this.showTable = true;
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CategorydialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.categoryName = result;
      this.addCategory()
    });
  }
  addCategory() {
    var model={
      Id:'0',
      CategoryId:this.dataSourceCategories.length+1,
      CategoryName:this.categoryName
    }
    this.sharedService.addcategory(model).subscribe(x => {
      this.categoryName = '';
      this.ngOnInit();
      this._snackBar.open("category added",'Dismiss', {
        duration: 2000,
      });
    },error => {
      this._snackBar.open('Some thing went wrong', 'Dismiss', {
        duration: 2000,
      });
    },)
  }
}
