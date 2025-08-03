import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ExamInfos {
  id: number;
  examId: number;
  name: string;
  cfu: number;
  type: string;
  courseId: string;
  profFullName: string | null;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})

//Servizio che gestisce chiamate per gli esami in generale e per l'iscrizione dello studente
export class ExamsService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7129/api/Exams';
  private regUrl = 'https://localhost:7129/api/ExamRegistrations';

  //Per prendere le informazioni degli esami presenti in base alla facoltà dello studente/professore
  GetExamsInfos(): Observable<ExamInfos[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<ExamInfos[]>(`${this.apiUrl}/GetExamsInfo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //metodo che gestisce la chiamata per registrare lo studente all'esame
  ExamRegistration(examId: number): Observable<ExamInfos[]> {
    const token = sessionStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.post<ExamInfos[]>(`${this.regUrl}/Registration/${examId}`,
      {}, { headers }
    );
  }

  //Per prendere esami futuri dello studente
  GetPlannedExams(): Observable<ExamInfos[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<ExamInfos[]>(`${this.regUrl}/FutureExams`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //Per prendere gli esami a cui è si è iscritto lo studente
  GetExams(): Observable<ExamInfos[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<ExamInfos[]>(`${this.regUrl}/ExamsByStudent`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //Per disisicriversi da un esame
  DeleteExamReg(id: number): Observable<any> {
    const token = sessionStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.delete(`${this.regUrl}/ExamUnsubscribe/${id}`, { headers });
  }
}
