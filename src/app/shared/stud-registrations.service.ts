import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, Laboratory } from './courses-labs.service';


@Injectable({
  providedIn: 'root'
})
export class StudRegistrationsService {

  constructor(private http: HttpClient) { }

  private courseRegUrl = 'https://localhost:7129/api/StudentCourses';
  private labRegUrl = 'https://localhost:7129/api/StudentLabs';

  AddCourses(courseId: string): Observable<Course[]> {
    const token = sessionStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.post<Course[]>(`${this.courseRegUrl}/CourseRegistration/${courseId}`,
      {}, { headers }
    );
  }

  AddLabs(labId: number): Observable<Laboratory[]> {
    const token = sessionStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.post<Laboratory[]>(`${this.labRegUrl}/LabRegistration/${labId}`,
      {}, { headers }
    );
  }

  GetCourses(): Observable<Course[]> {
    const token = sessionStorage.getItem('jwt');

    return this.http.get<Course[]>(`${this.courseRegUrl}/CoursesByStudent`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

  }

  GetLabs(): Observable<Laboratory[]> {
    const token = sessionStorage.getItem('jwt');

    return this.http.get<Laboratory[]>(`${this.labRegUrl}/LabsByStudent`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  DeleteCourseReg(id: number): Observable<Course[]> {
    const token = sessionStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.delete<Course[]>(`${this.courseRegUrl}/CourseUnsubscribe/${id}`,
      { headers }
    );
  }

  DeleteLabReg(id: number): Observable<Laboratory[]> {
    const token = sessionStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.delete<Laboratory[]>(`${this.labRegUrl}/LabUnsubscribe/${id}`,
      { headers }
    );
  }

}
