import { Component, OnInit } from '@angular/core';
import { ExamInfos, ExamsService, } from '../../../shared/exams.service';
import { SharedService } from '../../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exams',
  imports: [CommonModule, FormsModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css'
})
export class ExamsComponent implements OnInit {
  public exams: ExamInfos[] = [];
  public userRole: number = 0;
  public studentExams: ExamInfos[] = [];

  constructor(
    private examService: ExamsService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.shared.userRole.subscribe(role => {
      this.userRole = role;
    });
    this.GetExamsList();
    this.GetStudentExams();
  }

  //Si prende elenco degli esami a cui ci si può iscrivere
  GetExamsList() {
    this.examService.GetExamsInfos().subscribe({
      next: (res) => {
        this.exams = res;
        console.log(this.exams);
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }

  //Metodo che prende chiamata per eseguire la registrazione
  RegisterToExam(id: number) {
    this.examService.ExamRegistration(id).subscribe({
      next: () => {
        this.GetStudentExams();
        this.GetExamsList();
      },
      error: (err) => {
        // window.alert("Ti sei già iscritto all'esame");
        console.log(err);
      }
    })
  }

  //Si prendono esami aggiunti dallo studente
  GetStudentExams() {
    this.examService.GetExams().subscribe({
      next: (res) => {
        this.studentExams = res;
        console.log('Esami iscritti:', this.studentExams);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //Per disiscriversi da un esame
  DeleteExam(id: number) {
    const reg = this.studentExams.find(e => e.examId === id);
    if (!reg) {
      return
    };

    this.examService.DeleteExamReg(reg.id).subscribe({
      next: (res) => {
        console.log("Disiscrizione avvenuta con successo", res);
        this.GetStudentExams();
        this.GetExamsList();
      },
      error: (err) => {
        console.log("Errore nella disiscrizione", err);
      }
    });
  }

  isRegistered(examId: number): boolean {
    return this.studentExams.some(e => e.examId === examId);
  }
}
