import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorsComponent } from './Components/sponsors/sponsors.component';
import { SponsorDetailsComponent } from './Components/sponsor-details/sponsor-details.component';
import { OfficersComponent } from './Components/officers/officers.component';
import { ErrorComponent } from './Components/error/error.component';
import { OfficerDetailsComponent } from './Components/officer-details/officer-details.component';
import { LoginComponent } from './Components/login/login.component';
import { AddSponsorComponent } from './Components/add-sponsor/add-sponsor.component';
import { UpdateSponsorComponent } from './Components/update-sponsor/update-sponsor.component';
import { UpdateOfficerComponent } from './Components/update-officer/update-officer.component';

const routes: Routes = [
  {path: '', component: SponsorsComponent},
  {path: 'sponsors', component: SponsorsComponent},
  {path: 'sponsor/:id', component: SponsorDetailsComponent},
  {path: 'officers', component: OfficersComponent},
  {path: 'officer/:id', component: OfficerDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'addSponsor', component: AddSponsorComponent},
  {path: 'updateSponsor/:id', component: UpdateSponsorComponent},
  {path: 'updateOfficer/:id1/:id2', component: UpdateOfficerComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
