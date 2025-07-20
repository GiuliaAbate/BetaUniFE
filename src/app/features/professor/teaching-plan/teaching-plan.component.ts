import { Component, OnInit } from '@angular/core';
import { CourseExamInfo, ProfRegistrationsService } from '../../../shared/prof-registrations.service';
import { SharedService } from '../../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesLabsService, Laboratory } from '../../../shared/courses-labs.service';

@Component({
  selector: 'app-teaching-plan',
  imports: [CommonModule, FormsModule],
  templateUrl: './teaching-plan.component.html',
  styleUrl: './teaching-plan.component.css'
})
export class TeachingPlanComponent implements OnInit {

  public courseExam: CourseExamInfo[] = []
  public userRole: number = 0;
  public labs: Laboratory[] = [];

  constructor(
    private reg: ProfRegistrationsService,
    private shared: SharedService,
    private CoursesLabs: CoursesLabsService
  ) { }

  ngOnInit(): void {
    this.shared.userRole.subscribe(role => {
      this.userRole = role;
    });
    this.GetCourses();
    this.GetLabs();
  }

  GetCourses() {
    this.reg.GetCourseExam().subscribe({
      next: (res) => {
        this.courseExam = res;
        console.log(res);
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }

  AddCourseExam(courseId: string, examId: number) {
    this.reg.AddCourseExam(courseId, examId).subscribe({
      next: (res) => {
        this.courseExam = res;
        console.log(res);
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }


  GetLabs() {
    this.CoursesLabs.GetLabsByProfessor().subscribe({
      next: (res) => {
        this.labs = res;
        console.log(this.labs);
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }

  AddLab(labId: number) {
    this.reg.AddLab(labId).subscribe({
      next: (res) => {
        this.labs = res;
        console.log(res);
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }
}
