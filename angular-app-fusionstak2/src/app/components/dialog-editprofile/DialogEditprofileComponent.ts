import { Component } from '@angular/core';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dialog-editprofile',
  templateUrl: './dialog-editprofile.component.html',
  styleUrls: ['./dialog-editprofile.component.scss']
})
export class DialogEditprofileComponent {
  username: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private resetPasswordService: ResetPasswordService,
    private toast: NgToastService
  ) { }

  resetPassword() {
    if (this.newPassword === this.confirmPassword) {
      this.resetPasswordService.resetPassword(this.username, this.newPassword)
        .subscribe(() => {
            this.toast.success({ detail: 'Success', summary: 'Password Updated Successfully!', duration: 1000 });
          },
          (error) => {
            console.error('Password reset failed:', error);
            this.toast.error({ detail: 'ERROR', summary: 'Something went wrong!', duration: 1000 });
          }
        );
    } else {
      this.toast.error({ detail: 'ERROR', summary: 'Passwords do not match!', duration: 1000 });
    }
  }
}
