import { Component, OnInit } from '@angular/core';
import { Professor, Student, UsersService } from '../../shared/users.service';
import { Department, SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudRegistrationsService } from '../../shared/stud-registrations.service';
import { ExamInfos, ExamsService } from '../../shared/exams.service';
import { ProfRegistrationsService } from '../../shared/prof-registrations.service';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {

  student: Student | null = null;
  professor: Professor | null = null;

  public userRole: number = 0;
  isClicked: boolean = false;

  phoneNumberInput: string = '';
  passwordInput: string = '';
  
  departments: Department[] = [];
  studExams: ExamInfos[] = [];
  profExams :ExamInfos[] = [];

  constructor(
    private users: UsersService,
    private shared: SharedService,
    private examSvc: ExamsService,
    private profReg: ProfRegistrationsService
  ) { }

  ngOnInit(): void {
    this.shared.userRole.subscribe(role => {
      this.userRole = role;
    });
    this.GetStudentInfo();
    this.GetProfessorInfo();
    this.GetFutureExams();
    this.GetProfFutureExams();
  }

  //Metodi per prendere dati dello studente e professoe
  GetStudentInfo() {
    this.users.GetStudentInfo().subscribe({
      next: (res) => {
        this.student = res;
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  GetProfessorInfo() {
    this.users.GetProfessorInfo().subscribe({
      next: (res) => {
        this.professor = res;
        console.log(this.professor);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  //Si prendono esami futuri dello studente
  GetFutureExams() {
    this.examSvc.GetPlannedExams().subscribe({
      next: (res) => {
        this.studExams = res;
        console.log(this.studExams);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  //Si prendono esami futuri del professore
  GetProfFutureExams() {
    this.profReg.GetProfPlannedExams().subscribe({
      next: (res) => {
        this.profExams = res;
        console.log(this.profExams);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  //Metodo per vedere se il pulsante è stato cliccato
  checkBtn() {
    this.isClicked = true;
  }

  //Metodi per aggiornare i dati dello studente e del professore
  applyStudentChanges() {
    this.users.UpdateStudentInfos({
      phoneNumber: this.phoneNumberInput,
      password: this.passwordInput
    }).subscribe({
      next: () => {
        console.log('Dati aggiornati con successo');
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }

  applyProfessorChanges() {
    this.users.UpdateProfessorInfos({
      phoneNumber: this.phoneNumberInput,
      password: this.passwordInput
    }).subscribe({
      next: () => {
        console.log('Dati aggiornati con successo');
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }
}
