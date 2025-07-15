import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, Laboratory } from './courses-labs.service';

// export interface Exam {
//   examId: number;
//   name: string;
//   cfu: number;
//   type: string;
//   date: Date;
//   courseId: string;
//   departmentId: string;
// }

// export interface ExamRegistration {
//   id: number;
//   studId: string;
//   examId: number;
//   courseId: string;
//   departmentId: string;
//   registrationDate: Date;
// }

@Injectable({
  providedIn: 'root'
})
export class StudRegistrationsService {

  constructor(private http: HttpClient) { }

  private courseRegUrl = 'https://localhost:7129/api/StudentCourses';
    private labRegUrl = 'https://localhost:7129/api/StudentLabs';

  AddCourses(courseId: string): Observable<Course[]> {
    const token = localStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.post<Course[]>(`${this.courseRegUrl}/CourseRegistration/${courseId}`,
      {}, { headers }
    );
  }

  AddLabs(labId: number): Observable<Laboratory[]> {
    const token = localStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.post<Laboratory[]>(`${this.labRegUrl}/LabRegistration/${labId}`,
      {}, { headers }
    );
  }

}
