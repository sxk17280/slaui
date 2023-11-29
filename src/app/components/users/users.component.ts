import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private sharedService: sharedService, private _snackBar: MatSnackBar,private router: Router) { }
  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'address','city','isAdmin','email','phone'];
  dataSourceUsers =[] ;
  users=[];
  showTable=false;
  
  ngOnInit(): void {
    this.getUsers()
  }
  getUsers() {
    this.users = [];
    this.sharedService.getSLAUsers().subscribe(x => {
      this.dataSourceUsers=x;
      this.showTable=true
    })
  }
  addUser(){
    this.router.navigateByUrl('/addUser');
  }
}
