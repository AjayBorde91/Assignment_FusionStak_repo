import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import ValidateForm from '../../helpers/validationform';
import { Router } from '@angular/router';
import { UsernameExistsService } from 'src/app/services/username-exists.service';

@Component({
  selector: 'app-dialog-addnewuser',
  templateUrl: './dialog-addnewuser.component.html',
  styleUrls: ['./dialog-addnewuser.component.scss']
})
export class DialogAddnewuserComponent implements OnInit {
  public addnewuser!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  usernameExistsError: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router , private usernameExistsService: UsernameExistsService) { }

  ngOnInit() {
    this.addnewuser = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Username: ['', [Validators.required, this.emailFormatValidator]], 
      Password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password';
  }

  onaddnewuser() {
    if (this.addnewuser.valid) {
      console.log(this.addnewuser.value);
      let signUpObj = {
        ...this.addnewuser.value,
        role: '',
        token: '',
        CompanyName: '',
        Industry: ''
      };
      
      this.auth.signUp(signUpObj)
        .subscribe({
          next: (res => {
            this.addnewuser.reset();
            this.router.navigate(['login']);
          }),
          error: (err => {
            alert(err?.error.message);
          })
        });
    } else {
      ValidateForm.validateAllFormFields(this.addnewuser);
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
