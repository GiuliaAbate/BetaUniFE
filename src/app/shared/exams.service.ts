import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ExamInfos {
  examId: number;
  name: string;
  cfu: number;
  type: string;
  courseId: string;
  ProfessorSurname: string | null;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})

export class ExamsService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7129/api/Exams';
  private regUrl = 'https://localhost:7129/api/ExamRegistrations';

  GetExamsInfos(): Observable<ExamInfos[]> {
    const token = localStorage.getItem('jwt');
    return this.http.get<ExamInfos[]>(`${this.apiUrl}/GetExamsInfo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  ExamRegistration(examId: number): Observable<ExamInfos[]> {
    const token = localStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.post<ExamInfos[]>(`${this.regUrl}/Registration/${examId}`,
      {}, { headers }
    );
  }

  GetPlannedExams(): Observable<ExamInfos[]> {
    const token = localStorage.getItem('jwt');
    return this.http.get<ExamInfos[]>(`${this.regUrl}/FutureExams`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  GetExams(): Observable<ExamInfos[]> {
    const token = localStorage.getItem('jwt');
    return this.http.get<ExamInfos[]>(`${this.regUrl}/ExamsByStudent`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
