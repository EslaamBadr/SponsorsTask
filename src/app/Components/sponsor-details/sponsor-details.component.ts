import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SponsorsService } from 'src/app/Services/sponsors.service';

@Component({
  selector: 'app-sponsor-details',
  templateUrl: './sponsor-details.component.html',
  styleUrls: ['./sponsor-details.component.css']
})
export class SponsorDetailsComponent {

  ID=0; 
  sponsor:any;
  officers:any;
  isLoading: boolean = true;
  isLoadingOff: boolean = true;

  constructor(myRoute:ActivatedRoute,public myServic:SponsorsService) {
    this.ID=myRoute.snapshot.params["id"];
    console.log(this.ID)
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.myServic.GetSponsorById(this.ID).subscribe(
      {
        next: (data:any)=>{this.sponsor=data; this.isLoading = false; console.log(data);},
        error: (err)=>{console.log(err)},
        complete: ()=>{console.log("Success")}
      }
    );
    this.myServic.GetAllOfficers().subscribe(
      {
        next: (data:any)=>{this.officers=data; this.isLoadingOff = false;console.log(data.data.data);},
        error: (err)=>{console.log(err)},
        complete: ()=>{console.log("Success")}
      }
    );
  }
}
