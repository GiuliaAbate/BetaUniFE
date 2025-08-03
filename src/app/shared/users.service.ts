import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Professor {
  profId: string;
  name: string;
  surname: string;
  birthDate: Date;
  email: string;
  password: string;
  phoneNumber: string;
  departmentId: string;
  enrollmentDate: Date;
  departmentName: string;
}

export interface Student {
  studId: string;
  name: string;
  surname: string;
  birthDate: Date;
  email: string;
  password: string;
  phoneNumber: string;
  departmentId: string;
  enrollmentDate: Date;
  departmentName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  private studUrl = 'https://localhost:7129/api/Students';
  private profUrl = 'https://localhost:7129/api/Professors';

  //Metodi per prendere informazioni dello studente e del professore
  GetStudentInfo(): Observable<Student> {
    const token = sessionStorage.getItem('jwt'); //il token si memorizza in sessionStorage
    return this.http.get<Student>(`${this.studUrl}/ViewStudentInfo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  GetProfessorInfo(): Observable<Professor> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<Professor>(`${this.profUrl}/ViewProfessorInfo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //Metodi per aggiornare le informazioni (numero di telefono e password) dello studente e del professore
  UpdateStudentInfos(studInfos: { phoneNumber?: string; password?: string }): Observable<void> {
    const token = sessionStorage.getItem('jwt');

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.put<void>(
      `${this.studUrl}/UpdateStudent`,
      studInfos,
      { headers }
    );
  }

  UpdateProfessorInfos(profInfos: { phoneNumber?: string; password?: string }): Observable<void> {
    const token = sessionStorage.getItem('jwt');

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.put<void>(
      `${this.profUrl}/UpdateProfessor`,
      profInfos,
      { headers }
    );
  }

}

