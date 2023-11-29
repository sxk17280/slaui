import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { loginVm } from 'src/app/models/user';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private sharedService: sharedService, private router: Router, private _snackBar: MatSnackBar) { }


  openSnackBar(message: string, action: string) {
  }

  ngOnInit(): void {

  }
  

}
