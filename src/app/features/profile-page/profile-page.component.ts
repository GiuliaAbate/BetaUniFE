import { Component, OnInit } from '@angular/core';
import { Professor, Student, UsersService } from '../../shared/users.service';
import { Department, SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudRegistrationsService } from '../../shared/stud-registrations.service';
import { ExamInfos, ExamsService } from '../../shared/exams.service';

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
  exams : ExamInfos[] = [];

  constructor(
    private users: UsersService,
    private shared: SharedService,
    private examSvc: ExamsService) { }

  ngOnInit(): void {
    this.shared.userRole.subscribe(role => {
      this.userRole = role;
    });
    this.GetStudentInfo();
    this.GetProfessorInfo();
    this.GetFutureExams();
  }

  GetStudentInfo() {
    this.users.GetStudentInfo().subscribe({
      next: (res) => {
        console.log(res);
        this.student = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  GetProfessorInfo(){
        this.users.GetProfessorInfo().subscribe({
      next: (res) => {
        console.log(res);
        this.professor = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  GetFutureExams() {
    this.examSvc.GetPlannedExams().subscribe({
      next: (res) => {
        console.log(res);
        this.exams = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  checkBtn() {
    this.isClicked = true;
  }

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
