import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SponsorsComponent } from './Components/sponsors/sponsors.component';
import { SponsorDetailsComponent } from './Components/sponsor-details/sponsor-details.component';
import { OfficersComponent } from './Components/officers/officers.component';
import { OfficerDetailsComponent } from './Components/officer-details/officer-details.component';
import { LoginComponent } from './Components/login/login.component';
import { ErrorComponent } from './Components/error/error.component';
import { HeaderComponent } from './Components/header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSponsorComponent } from './Components/add-sponsor/add-sponsor.component';
import { UpdateSponsorComponent } from './Components/update-sponsor/update-sponsor.component';
import { UpdateOfficerComponent } from './Components/update-officer/update-officer.component';

@NgModule({
  declarations: [
    AppComponent,
    SponsorsComponent,
    SponsorDetailsComponent,
    OfficersComponent,
    OfficerDetailsComponent,
    LoginComponent,
    ErrorComponent,
    HeaderComponent,
    AddSponsorComponent,
    UpdateSponsorComponent,
    UpdateOfficerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
