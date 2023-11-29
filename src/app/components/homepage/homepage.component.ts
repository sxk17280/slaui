import { Component, OnInit } from '@angular/core';
import { sharedService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private sharedService: sharedService) { }
cardsData:any;
currentUser;
isAdmin=false;
cardKeys=[];
showCards=false;
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentuserData'));

    this.isAdmin = this.currentUser.isAdmin;
    if(this.isAdmin){
      this.sharedService.getslaDashBoardData().subscribe(x=>{
        this.cardsData=x;
        this.cardKeys=Object.keys(this.cardsData);
        console.log(this.cardKeys);
        this.showCards=true;
      })
    }
    
  }

}
