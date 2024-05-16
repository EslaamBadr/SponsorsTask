import { Component } from '@angular/core';
import { SponsorsService } from 'src/app/Services/sponsors.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent {

  ID:any;
  Sponsors:any;
  isLoading: boolean = true;

  constructor(myService: SponsorsService, public myRouter:Router, public myRoute:ActivatedRoute) {

    this.ID=myRoute.snapshot.params["id"];
    console.log(this.ID)

    myService.GetAllSponsors().subscribe(
      {
        next:(data) =>{this.Sponsors=data; console.log(data); this.isLoading = false;}
      })
  }


}
