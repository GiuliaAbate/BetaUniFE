import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Course {
  id : number;
  courseId: string;
  name: string;
  departmentId: string;
  startDate: string;
  endDate: string; 
  profFullName: string;
  classrooms?: Classroom[];
}

export interface Laboratory {
  id: number;
  labId: number;
  name: string;
  attendance: boolean;
  departmentId: string;
  startDate: string;
  endDate: string;
  profFullName: string;
  classrooms?: Classroom[];
  
}

export interface Classroom {
  name: string;
  number: number;
  maxCapacity: number;
  courseId: string;
}


@Injectable({
  providedIn: 'root'
})
export class CoursesLabsService {

  constructor(private http: HttpClient) { }

  private courseUrl = 'https://localhost:7129/api/Courses';
  private labUrl = 'https://localhost:7129/api/Laboratories';

  GetCoursesByDepartment(depId: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}/GetCoursesByDep/${depId}`);
  }

  GetLabsByDepartment(depId: string): Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(`${this.labUrl}/GetLabsByDep/${depId}`);
  }

  GetCoursesByStudent(): Observable<Course[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<Course[]>(`${this.courseUrl}/DepCourses`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  GetLabsByStudent(): Observable<Laboratory[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<Laboratory[]>(`${this.labUrl}/DepLabs`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

    GetLabsByProfessor(): Observable<Laboratory[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<Laboratory[]>(`${this.labUrl}/ProfDepLabs`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


}
