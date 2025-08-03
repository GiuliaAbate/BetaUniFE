import { Component, OnInit } from '@angular/core';
import { CourseExamInfo, ProfRegistrationsService } from '../../../shared/prof-registrations.service';
import { SharedService } from '../../../shared/shared.service';
import { Laboratory } from '../../../shared/courses-labs.service';
import { Student } from '../../../shared/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enrolled-students',
  imports: [CommonModule, FormsModule],
  templateUrl: './enrolled-students.component.html',
  styleUrl: './enrolled-students.component.css'
})
export class EnrolledStudentsComponent implements OnInit {

  public courses: CourseExamInfo[] = [];
  public exams: CourseExamInfo[] = [];
  public labs: Laboratory[] = [];
  public userRole: number = 0;

  public selectedCourseStudents: Student[] = [];
  public selectedCourseId: number | null = null;

  constructor(
    private reg: ProfRegistrationsService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.shared.userRole.subscribe(role => {
      this.userRole = role;
    });

    this.GetCourses();
    this.GetLabs();
    this.GetExams();
  }

  //Vedere gli studenti iscritti al proprio corso
  GetStudentByCourse(id: number) {
    if (this.selectedCourseId === id) {
      this.selectedCourseId = null;
      this.selectedCourseStudents = [];
      return;
    }
    this.selectedCourseId = id;
    this.reg.GetCourseStudents(id).subscribe({
      next: (res) => {
        this.selectedCourseStudents = res;
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }

  //Vedere gli studenti iscritti al proprio laboratorio
  GetStudentByLab(id: number) {
    if (this.selectedCourseId === id) {
      this.selectedCourseId = null;
      this.selectedCourseStudents = [];
      return;
    }

    this.selectedCourseId = id;
    this.reg.GetLabStudents(id).subscribe({
      next: (res) => {
        this.selectedCourseStudents = res;
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }

  //Vedere gli studenti iscritti al proprio esame
  GetStudentByExam(id: number) {
    if (this.selectedCourseId === id) {
      this.selectedCourseId = null;
      this.selectedCourseStudents = [];
      return;
    }

    this.selectedCourseId = id;
    this.reg.GetExamStudents(id).subscribe({
      next: (res) => {
        this.selectedCourseStudents = res;
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }

  //Prendere corsi, lab ed esami selezionati
  GetCourses() {
    this.reg.GetSelectedCourses().subscribe({
      next: (res) => {
        this.courses = res;
        console.log(this.courses);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  GetLabs() {
    this.reg.GetSelectedLabs().subscribe({
      next: (res) => {
        this.labs = res;
        console.log(this.labs);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  GetExams() {
    this.reg.GetSelectedExams().subscribe({
      next: (res) => {
        this.exams = res;
        console.log(this.exams);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}



