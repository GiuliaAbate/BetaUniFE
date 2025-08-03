import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Interfacce con i dati necessari per la registrazione del professore e studente
export interface ProfessorData {
  profID: string;
  name: string;
  surname: string;
  birthDate: Date;
  email: string;
  password: string;
  phoneNumber: string;
  departmentId: string;
  enrollmentDate: Date;
}

export interface StudentData {
  studID: string;
  name: string;
  surname: string;
  birthDate: Date;
  email: string;
  password: string;
  phoneNumber: string;
  departmentId: string;
  enrollmentDate: Date;
}

@Injectable({
  providedIn: 'root'
})

export class SignupService {

  constructor(private http: HttpClient) { }

  private profUrl = 'https://localhost:7129/api/Professors';
  private studUrl = 'https://localhost:7129/api/Students';

  //Metodo che prende api della registrazione del professore e dello studente
  ProfessorSignUp(data: any) {
    return this.http.post<any>(`${this.profUrl}/ProfRegistration`, data, { withCredentials: false });
  }

  StudentSignUp(data: any) {
    return this.http.post<any>(`${this.studUrl}/StudRegistration`, data, { withCredentials: false });
  }

}
