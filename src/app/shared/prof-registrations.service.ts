import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamInfos } from './exams.service';
import { Laboratory } from './courses-labs.service';

export interface CourseExamInfo {
  courseId: string;
  examId: number;
  courseName: string;
  examName: string;
  cfu: number;
  type: string;
  startDate: string;
  endDate: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProfRegistrationsService {

  constructor(private http: HttpClient) { }

  private courseUrl = 'https://localhost:7129/api/Courses';
  private regLabUrl = 'https://localhost:7129/api/ProfessorLabs'
  private regUrl = 'https://localhost:7129/api/ProfCourseExams';

  GetCourseExam(): Observable<CourseExamInfo[]> {
    const token = sessionStorage.getItem('jwt');

    return this.http.get<CourseExamInfo[]>(`${this.courseUrl}/ProfDepCoursesExams`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  AddCourseExam(courseId: string, examId: number) {
    const token = sessionStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.post<CourseExamInfo[]>(`${this.regUrl}/AddCourseExamProf/${courseId}/${examId}`,
      {}, { headers }
    );
  }

  GetProfPlannedExams(): Observable<ExamInfos[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<ExamInfos[]>(`${this.regUrl}/ProfFutureExams`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  AddLab(labId: number) : Observable<Laboratory[]> {
    const token = sessionStorage.getItem('jwt');

        const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.post<Laboratory[]>(`${this.regLabUrl}/ProfAddLab/${labId}`,
      {}, { headers }
    );
  }


}
