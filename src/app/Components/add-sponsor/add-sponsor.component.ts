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


  constructor(public myService: SponsorsService, public myRouter: Router, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.sponsorForm = this.fb.group({
      sponsorArabicName: ['', Validators.required],
      sponsorLatinName: ['', Validators.required],
      sponsorEmail: ['', Validators.pattern(this.emailReg)],
      sponsorPhone: ['', Validators.pattern(this.phoneReg)],
      Address: ['', Validators.required],
      Code: ['', Validators.required],
      PostalCode: ['', Validators.required],
      Type: ['', Validators.required],
      FinancialLimit: ['', Validators.required],
      MaxLimit: ['', Validators.required],
      TimeLimit: ['', Validators.required],
      
      contactOfficers: this.fb.array([])
    });
  }

  get contactOfficers() {
    return this.sponsorForm.get('contactOfficers') as FormArray;
  }

  addContactOfficer() {
    const contactOfficer = this.fb.group({
      officerArabicName: ['', Validators.required],
      officerLatinName: ['', Validators.required],
      officerPhone: ['', Validators.required],
      officerEmail: ['', Validators.pattern(this.emailReg)]
    });

    this.contactOfficers.push(contactOfficer);
  }

  onSubmit() {
    if (this.sponsorForm.valid) {
      let newSponsor = {
        'sponsor_code': this.sponsorForm.value.Code,
        'sponsor_name': this.sponsorForm.value.sponsorArabicName,
        'sponsor_name_latin': this.sponsorForm.value.sponsorLatinName,
        'sponsor_type': this.sponsorForm.value.Type,
        'address': this.sponsorForm.value.Address,
        'postal_code': this.sponsorForm.value.PostalCode,
        'phone': this.sponsorForm.value.sponsorPhone,
        'email': this.sponsorForm.value.sponsorEmail,
        'max_limit': this.sponsorForm.value.MaxLimit,
        'financial_limit': this.sponsorForm.value.FinancialLimit,
        'time_limit': this.sponsorForm.value.TimeLimit
      };
      // Add sponsor data
      this.myService.AddSponsor(newSponsor).subscribe(response => {
        console.log('Sponsor added successfully:', response);

        // Add contact officers
        this.contactOfficers.controls.forEach(officer => {
          const newOfficer = {
            'sponsor_id': response.data.id,
            'contact_officer_name': officer.value.officerArabicName,
            'contact_officer_name_latin': officer.value.officerLatinName,
            'phone': officer.value.officerPhone,
            'email': officer.value.officerEmail
          }
          this.myService.AddOfficer(newOfficer).subscribe(res => {
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

    this.validateAllFormFields(this.sponsorForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormArray) {
        control.controls.forEach(c => this.validateAllFormFields(c as FormGroup));
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }

  getErrorMessage(field: string) {
    const control = this.sponsorForm.get(field);
    if (control?.hasError('required')) {
      return `${field} is required`;
    } else if (control?.hasError('email')) {
      return `Invalid email format`;
    } else if (control?.hasError('pattern')) {
      return `Invalid format for ${field}`;
    }
    return '';
  }
}
