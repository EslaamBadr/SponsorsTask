import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorsComponent } from './Components/sponsors/sponsors.component';
import { SponsorDetailsComponent } from './Components/sponsor-details/sponsor-details.component';
import { OfficersComponent } from './Components/officers/officers.component';
import { ErrorComponent } from './Components/error/error.component';
import { OfficerDetailsComponent } from './Components/officer-details/officer-details.component';
import { LoginComponent } from './Components/login/login.component';
import { AddSponsorComponent } from './Components/add-sponsor/add-sponsor.component';

const routes: Routes = [
  {path: '', component: SponsorsComponent},
  {path: 'sponsors', component: SponsorsComponent},
  {path: 'sponsor/:id', component: SponsorDetailsComponent},
  {path: 'officers', component: OfficersComponent},
  {path: 'officer/:id', component: OfficerDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'addSpons', component: AddSponsorComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
