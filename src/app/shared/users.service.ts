import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Professor {
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

export interface Student {
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
export class UsersService {

  constructor(private http: HttpClient) { }

  private studUrl = 'https://localhost:7129/api/Students';
  private profUrl = 'https://localhost:7129/api/Professors';

  GetStudentInfo(): Observable<Student> {
    const token = localStorage.getItem('jwt');
    return this.http.get<Student>(`${this.studUrl}/ViewStudentInfo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  UpdateInfos(studInfos: { phoneNumber?: string; password?: string }): Observable<void> {
    const token = localStorage.getItem('jwt');

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.put<void>(
      `${this.studUrl}/UpdateStudent`,
      studInfos, // il body, es: { phoneNumber: '123', password: 'newpass' }
      { headers }
    );
  }
}

