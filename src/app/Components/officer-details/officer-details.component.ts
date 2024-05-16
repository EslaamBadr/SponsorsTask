import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SponsorsService } from 'src/app/Services/sponsors.service';

@Component({
  selector: 'app-officer-details',
  templateUrl: './officer-details.component.html',
  styleUrls: ['./officer-details.component.css']
})
export class OfficerDetailsComponent {
  ID=0; 
  officer:any;
  isLoading: boolean = true;

  constructor(myRoute:ActivatedRoute,public myServic:SponsorsService) {
    this.ID=myRoute.snapshot.params["id"];
    console.log(this.ID)
  }

  ngOnInit(): void {
    this.myServic.GetOfficerById(this.ID).subscribe(
      {
        next: (data:any)=>{this.officer=data; this.isLoading = false;console.log(data.data.data);},
        error: (err)=>{console.log(err)},
        complete: ()=>{console.log("Success")}
      }
    );
  }
}
