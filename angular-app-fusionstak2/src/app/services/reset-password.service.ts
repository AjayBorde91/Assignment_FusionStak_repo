import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

  resetPassword(username: string, newPassword: string) {
    const data = { username, newPassword };
    return this.http.post('https://localhost:7227/api/User/reset-password', data);
  }
}
