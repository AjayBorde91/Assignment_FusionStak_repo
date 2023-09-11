import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsernameExistsService {
  private baseUrl: string = 'https://localhost:7227/api/User/';

  constructor(private http: HttpClient) { }

  checkUsernameExists(username: string): Observable<{ exists: boolean }> {
    const url = `${this.baseUrl}username-exists?username=${username}`;

    return this.http.get<{ exists: boolean }>(url);
  }
}
