import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SponsorsService } from 'src/app/Services/sponsors.service';

@Component({
  selector: 'app-update-sponsor',
  templateUrl: './update-sponsor.component.html',
  styleUrls: ['./update-sponsor.component.css']
})
export class UpdateSponsorComponent {
  ID:any;
  emailReg = "[a-z0-9]+@[a-z]+\.[a-z]{2,3}";
  phoneReg = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$";
  sponsorForm!: FormGroup;
  isLoading: boolean = true;
  updating = false;
  updateSuccess = false;
  updateError = '';

  constructor(public myService: SponsorsService, public myRouter: Router, private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.ID = route.snapshot.params["id"];
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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadSponsorData(id);
      }
    });

    this.sponsorForm = this.fb.group({
      // Define your form controls and default values here
      ArabicName: [''],
      LatinName: [''],
      Email: [''],
      Address: [''],
      Type: [''],
      Phone: [''],
      Code: [''],
      PostalCode: [''],
      MaxLimit: [''],
      FinancialLimit: [''],
      TimeLimit: [''],

      contactOfficers: this.fb.array([])
    });
  }

  loadSponsorData(id: string): void {
    this.myService.GetSponsorById(id).subscribe(
      {
    next: (data:any)=>{this.sponsorForm.patchValue({
           ArabicName: data.data.sponsor_name,
           LatinName: data.data.sponsor_name_latin,
           Email: data.data.email,
           Phone: data.data.phone,
           Code: data.data.sponsor_code,
           PostalCode: data.data.postal_code,
           Address: data.data.address,
           Type: data.data.sponsor_type,
           MaxLimit: data.data.max_limit,
           TimeLimit: data.data.time_limit,
           FinancialLimit: data.data.financial_limit,
          });
        this.isLoading = false;},
    error: (err)=>{console.log(err)},
    complete: ()=>{console.log("Success")}
  }
    );
  }

  onSubmit() {
    if (this.sponsorForm.valid) {
      let updatedSponsor = {
        'sponsor_code': this.sponsorForm.value.Code,
        'sponsor_name': this.sponsorForm.value.ArabicName,
        'sponsor_name_latin': this.sponsorForm.value.LatinName,
        'sponsor_type': this.sponsorForm.value.Type,
        'address': this.sponsorForm.value.Address,
        'postal_code': this.sponsorForm.value.PostalCode,
        'phone': this.sponsorForm.value.Phone,
        'email': this.sponsorForm.value.Email,
        'max_limit': this.sponsorForm.value.MaxLimit,
        'financial_limit': this.sponsorForm.value.FinancialLimit,
        'time_limit': this.sponsorForm.value.TimeLimit
      };
      // update sponsor data
      this.myService.UpdateSponsor(updatedSponsor, this.ID).subscribe(response => {
        console.log('Sponsor Updated successfully:', response);
        // Add contact officers
        this.contactOfficers.controls.forEach(officer => {
          const newOfficer = {
            'sponsor_id': this.ID,
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
        alert("Sponsor Updated Successfully!");

      }, error => {
        console.error('Failed to update sponsor:', error);
        alert("Failed to update sponsor!");
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
