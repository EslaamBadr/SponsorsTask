import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SponsorsService } from 'src/app/Services/sponsors.service';

@Component({
  selector: 'app-add-sponsor',
  templateUrl: './add-sponsor.component.html',
  styleUrls: ['./add-sponsor.component.css']
})
export class AddSponsorComponent {
  emailReg = "[a-z0-9]+@[a-z]+\.[a-z]{2,3}";
  phoneReg = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$";
  sponsorForm!: FormGroup;


  constructor(public myServic: SponsorsService, public myRouter: Router, private fb: FormBuilder) {

  }
  // add(aName:any, eName:any, email:any, address:any, phone:any, code: any, posCode:any, type:any, maxL:any, fncL: any, tmeL:any){
  //   if( aName && eName && address && email.match(this.emailReg) && phone.match(this.phoneReg) && code && posCode && type && maxL && fncL && tmeL ){
  //     let newUser = {
  //       'sponsor_code': code,
  //       'sponsor_name': aName,
  //       'sponsor_name_latin': eName,
  //       'sponsor_type': type,
  //       'address': address,
  //       'postal_code': posCode,
  //       'phone': phone,
  //       'email': email,
  //       'max_limit': maxL, // Assuming max_limit should be a string formatted with two decimal places
  //       'financial_limit': fncL, // Similarly for financial_limit
  //       'time_limit': tmeL
  //   };
  //   this.myServic.AddSponsor(newUser).subscribe({
  //     next:(data)=>{this.myRouter.navigate(['']); alert("Added Successfully...");}
  //   });
  //   //alert("Added Successfully...");

  // }else{
  //   alert("Please Enter a Valid Data! ");
  // }
  // }


  ngOnInit(): void {
    this.sponsorForm = this.fb.group({
      sponsorAName: ['', Validators.required],
      sponsorEName: ['', Validators.required],
      sponsorEmail: ['', Validators.required],
      sponsorPhone: ['', Validators.required],
      sponsorAddress: ['', Validators.required],
      sponsorCode: ['', Validators.required],
      sponsorPosCode: ['', Validators.required],
      sponsorType: ['', Validators.required],
      sponsorFncL: ['', Validators.required],
      sponsorMaxL: ['', Validators.required],
      sponsorTimeL: ['', Validators.required],
      contactOfficers: this.fb.array([])
    });
  }

  get contactOfficers() {
    return this.sponsorForm.get('contactOfficers') as FormArray;
  }

  addContactOfficer() {
    const contactOfficer = this.fb.group({
      officerAName: ['', Validators.required],
      officerEName: ['', Validators.required],
      officerPhone: ['', Validators.required],
      officerEmail: ['', Validators.email]
    });

    this.contactOfficers.push(contactOfficer);
  }

  onSubmit() {
    if (this.sponsorForm.valid) {
      // const sponsorData = {
      //   name: this.sponsorForm.value.sponsorName
      // };
      let newSponsor = {
        'sponsor_code': this.sponsorForm.value.sponsorCode,
        'sponsor_name': this.sponsorForm.value.sponsorAName,
        'sponsor_name_latin': this.sponsorForm.value.sponsorEName,
        'sponsor_type': this.sponsorForm.value.sponsorType,
        'address': this.sponsorForm.value.sponsorAddress,
        'postal_code': this.sponsorForm.value.sponsorPosCode,
        'phone': this.sponsorForm.value.sponsorPhone,
        'email': this.sponsorForm.value.sponsorEmail,
        'max_limit': this.sponsorForm.value.sponsorMaxL,
        'financial_limit': this.sponsorForm.value.sponsorFncL,
        'time_limit': this.sponsorForm.value.sponsorTimeL
      };


      // Add sponsor data
      this.myServic.AddSponsor(newSponsor).subscribe(response => {
        console.log('Sponsor added successfully:', response);

        // Add contact officers
        this.contactOfficers.controls.forEach(officer => {
          const newOfficer = {
            'sponsor_id': response.data.id,
            'contact_officer_name': officer.value.officerAName,
            'contact_officer_name_latin': officer.value.officerEName,
            'phone': officer.value.officerPhone,
            'email': officer.value.officerEmail
          }
          this.myServic.AddOfficer(newOfficer).subscribe(res => {
            console.log('Contact officer added successfully:', res);
            console.log('officer:', newOfficer);
          }, error => {
            console.error('Failed to add contact officer:', error);
            console.log('officer:', newOfficer);
          });
        });

        this.myRouter.navigate(['']);
        alert("Sponsor Added Successfully!");

      }, error => {
        console.error('Failed to add sponsor:', error);
        alert("Failed to add sponsor!");
      });
    } else {
      // Handle form validation errors
      console.error('Invalid form data.');
      alert("Invalid form data!");
    }
  }
}
