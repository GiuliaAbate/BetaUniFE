import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  private loginUrl = 'https://localhost:7129/api/Login';

  //Metodi che gestiscono login del professore e dello studente, si passano solo i dati necessari come email e password
  ProfessorLogin(email: string, password: string) {
    return this.http.post<any>(`${this.loginUrl}/ProfLogin`, { email, password }, { withCredentials: true });
  }

  StudentLogin(email: string, password: string) {
    return this.http.post<any>(`${this.loginUrl}/StudLogin`, { email, password }, { withCredentials: true });
  }

}
