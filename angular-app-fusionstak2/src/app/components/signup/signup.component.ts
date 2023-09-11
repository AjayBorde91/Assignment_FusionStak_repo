import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import ValidateForm from '../../helpers/validationform';
import { Router } from '@angular/router';
import { UsernameExistsService } from 'src/app/services/username-exists.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  usernameExistsError: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private usernameExistsService: UsernameExistsService) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      CompanyName: ['', Validators.required],
      Username: ['', [Validators.required, this.emailFormatValidator]],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      Industry: ['', Validators.required]
    });
  }


  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password';
  }

  onSignup() {
    if (this.signUpForm.valid) {
      if (this.signUpForm.controls['Password'].value === this.signUpForm.controls['ConfirmPassword'].value) {
        console.log(this.signUpForm.value);
        let signUpObj = {
          ...this.signUpForm.value,
          role: '',
          token: ''
        };
        this.auth.signUp(signUpObj)
          .subscribe({
            next: (res => {
              this.signUpForm.reset();
              this.router.navigate(['login']);
            }),
            error: (err => {
              alert(err?.error.message);
            })
          });
      } else {
        alert('Passwords do not match.');
      }
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }

  emailFormatValidator(control: AbstractControl) {
    const email = control.value;
    if (email && email.indexOf('@') === -1) {
      return { emailFormat: true };
    }
    return null;
  }
  checkUsername(username: string) {
    if (!username) {
      return;
    }

    this.usernameExistsService.checkUsernameExists(username).subscribe({
      next: (result) => {
        this.usernameExistsError = result.exists;

        if (this.usernameExistsError) {
          console.log('Username already exists.');
        }
      },
      error: (err) => {
        console.error('Error checking username:', err);
      },
    });

  }
}
