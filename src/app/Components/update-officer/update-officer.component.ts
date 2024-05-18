import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SponsorsService } from 'src/app/Services/sponsors.service';

@Component({
  selector: 'app-update-officer',
  templateUrl: './update-officer.component.html',
  styleUrls: ['./update-officer.component.css']
})
export class UpdateOfficerComponent {
  ID:any;
  sponsorId:any;
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
    this.ID = route.snapshot.params["id1"];
    this.sponsorId = route.snapshot.params["id2"];
    console.log(route)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id1');
      if (id) {
        this.loadSponsorData(id);
      }
    });

    this.sponsorForm = this.fb.group({
      // Define your form controls and default values here
      ArabicName: ['', Validators.required],
      LatinName: ['', Validators.required],
      Email: ['', Validators.pattern(this.emailReg)],
      Phone: ['', Validators.required],
    });
  }

  loadSponsorData(id: string): void {
    this.myService.GetOfficerById(id).subscribe(
      {
    next: (data:any)=>{this.sponsorForm.patchValue({
           ArabicName: data.data.contact_officer_name,
           LatinName: data.data.contact_officer_name_latin,
           Phone: data.data.phone,
           Email: data.data.email
          });
        this.isLoading = false;},
    error: (err)=>{console.log(err)},
    complete: ()=>{console.log("Success")}
  }
    );
  }

  onSubmit() {
    if (this.sponsorForm.valid) {
      let updatedOfficer = {
        'sponsor_id': this.sponsorId,
        'contact_officer_name': this.sponsorForm.value.ArabicName,
        'contact_officer_name_latin': this.sponsorForm.value.LatinName,
        'phone': this.sponsorForm.value.Phone,
        'email': this.sponsorForm.value.Email
      };
      // update sponsor data
      this.myService.UpdateOfficer(updatedOfficer, this.ID).subscribe(response => {
        console.log('Officer Updated successfully:', response);
        this.myRouter.navigate(['']);
        alert("Officer Updated Successfully!");

      }, error => {
        console.error('Failed to update officer:', error);
        alert("Failed to update officer!");
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
