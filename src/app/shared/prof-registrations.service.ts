import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamInfos } from './exams.service';
import { Classroom, Laboratory } from './courses-labs.service';
import { Student } from './users.service';

export interface CourseExamInfo {
  id: number;
  courseId: string;
  examId: number;
  courseName: string;
  examName: string;
  cfu: number;
  type: string;
  startDate: Date;
  endDate: Date;
  date: Date;
  classrooms?: Classroom[];
}


@Injectable({
  providedIn: 'root'
})

//Servizio che gestisce le chiamate principali collegate al professore
export class ProfRegistrationsService {

  constructor(private http: HttpClient) { }

  private courseUrl = 'https://localhost:7129/api/Courses';
  private regLabUrl = 'https://localhost:7129/api/ProfessorLabs'
  private regUrl = 'https://localhost:7129/api/ProfCourseExams';

  //Si prendono i corsi (ed esami) che si possono aggiungere al piano didattico
  GetCourseExam(): Observable<CourseExamInfo[]> {
    const token = sessionStorage.getItem('jwt');

    return this.http.get<CourseExamInfo[]>(`${this.courseUrl}/ProfDepCoursesExams`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //Permette di aggiungere un corso (ed esame) al piano didattico selezionandolo e quindi si prende l'ID
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

  //Metodo per prendere gli esami futuri 
  GetProfPlannedExams(): Observable<ExamInfos[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<ExamInfos[]>(`${this.regUrl}/ProfFutureExams`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //Metodo uguale a quello dei corsi ma questo permette di scegliere e aggiungere un laboratorio
  AddLab(labId: number): Observable<Laboratory[]> {
    const token = sessionStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.post<Laboratory[]>(`${this.regLabUrl}/ProfAddLab/${labId}`,
      {}, { headers }
    );
  }

  //Per permettere di disiscriversi sia dal corso che dall'esame essendo per lui collegati
  DeleteCourseExamReg(id: number): Observable<CourseExamInfo[]> {
    const token = sessionStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.delete<CourseExamInfo[]>(`${this.regUrl}/DeleteCourseExam/${id}`, { headers }
    );
  }

  //Per vedere i corsi selezionati
  GetSelectedCourses(): Observable<CourseExamInfo[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<CourseExamInfo[]>(`${this.regUrl}/ProfSelectedCourses`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //Per vedere gli esami selezionati
  GetSelectedExams(): Observable<CourseExamInfo[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<CourseExamInfo[]>(`${this.regUrl}/ProfSelectedExams`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // //Per vedere i laboratori selezionati
  GetSelectedLabs(): Observable<Laboratory[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<Laboratory[]>(`${this.regLabUrl}/ProfSelectedLabs`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //Per vedere sia i corsi che esami selezionati
  GetSelectedCourseExams(): Observable<CourseExamInfo[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<CourseExamInfo[]>(`${this.regUrl}/ProfessorCourseExams`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //Per permettere al professore di disiscriversi dal laboratorio scelto 
  DeleteLabReg(labId: number): Observable<Laboratory[]> {
    const token = sessionStorage.getItem('jwt');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<Laboratory[]>(`${this.regLabUrl}/DeleteLab/${labId}`, { headers });
  }

  //Vedere studenti iscritti ai propri corsi
  GetCourseStudents(regId: number): Observable<Student[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<Student[]>(`${this.regUrl}/StudentByCourse/${regId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //Vedere studenti iscritti ai propri laboratori
  GetLabStudents(regId: number): Observable<Student[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<Student[]>(`${this.regUrl}/StudentsByLab/${regId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  //Vedere studenti iscritti ai propri esami
  GetExamStudents(regId: number): Observable<Student[]> {
    const token = sessionStorage.getItem('jwt');
    return this.http.get<Student[]>(`${this.regUrl}/StudentsByExam/${regId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

