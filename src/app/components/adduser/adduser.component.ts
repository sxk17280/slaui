import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  constructor(private sharedService: sharedService, private _snackBar: MatSnackBar) { }
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  city: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  ngOnInit(): void {
  }
  addUser() {
      var newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      address:  this.address,
      city:  this.city,
      phone: this.phone,
      email: this.email,
      pswrd:this.password,
      isAdmin: false
      }
    this.sharedService.addSLAUser(newUser).subscribe(res => {
      console.log(res);
      this._snackBar.open("user added");
      setTimeout(x=>{
        window.location.reload()
      },1500)
    })
  }
}
