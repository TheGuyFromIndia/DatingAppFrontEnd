import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from '../_forms/date-picker/date-picker.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  cancelRegister = output<boolean>();
  accountService = inject(AccountService);
  formbuilderService = inject(FormBuilder);
  private router = inject(Router);
  registerForm : FormGroup = new FormGroup({});
  maxDate = new Date();
  valdationErrors: string[] | undefined;
  
  ngOnInit(): void {
    this.initalizeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

  initalizeForm(){
    this.registerForm = this.formbuilderService.group({
      gender: ['male'],
      username: ["Username", Validators.required],
      knownAs: ["known as", Validators.required],
      dateOfBirth: ["", Validators.required],
      city: ["City", Validators.required],
      country: ["country", Validators.required],
      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control : AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({dateOfBirth: dob});
    this.accountService.register(this.registerForm.value).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members')
      },
      error : err => this.valdationErrors = err
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

  private getDateOnly(dob: string | undefined){
    if(!dob) return;
    return new Date(dob).toISOString().slice(0,10);
  }

}
