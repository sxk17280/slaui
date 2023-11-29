import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { loginVm } from 'src/app/models/user';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  constructor(private sharedService: sharedService, private router: Router, private _snackBar: MatSnackBar) { }


  openSnackBar(message: string, action: string) {
  }

  email = '';
  password = '';
  ngOnInit(): void {

  }
  login() {
    if (this.email != "" || this.password != '') {
      var model: loginVm = {
        UserName: this.email,
        Password: this.password
      }

      this.sharedService.login(model)
        .subscribe(
          result => {
            if(!!result){
              localStorage.setItem('token', result.token);
              this.sharedService.currentUserData = result.userDetails;
              localStorage.setItem('currentuserData', JSON.stringify(result.userDetails));
              this.router.navigateByUrl('/homepage');
            }
            
          },
          error => {
            this._snackBar.open('Incorrect email/password', 'Dismiss', {
              duration: 2000,
            });
          },
          () => {
            // No errors, route to new page
          }
        );
    }
    else {
      this._snackBar.open('Enter credentials', 'Dismiss', {
        duration: 2000,
      });
      // this._snackBar.open("Enter credentials");
    }
  }

}
