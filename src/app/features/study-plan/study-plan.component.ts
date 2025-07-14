import { Component, OnInit } from '@angular/core';
import { Course, CoursesLabsService } from '../../shared/courses-labs.service';
import { StudRegistrationsService } from '../../shared/stud-registrations.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-study-plan',
  imports: [CommonModule, FormsModule],
  templateUrl: './study-plan.component.html',
  styleUrl: './study-plan.component.css'
})
export class StudyPlanComponent implements OnInit {

  public courses: Course[] = [];
  public userRole: number = 0;

  constructor(
    private CoursesLabs: CoursesLabsService,
    private studRegs: StudRegistrationsService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.shared.userRole.subscribe(role => {
      this.userRole = role;
    });
    this.GetCoursesList();
  }

  GetCoursesList() {
    this.CoursesLabs.GetCoursesByStudent().subscribe({
      next: (res) => {
        this.courses = res;
        console.log(this.courses);
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }

  AddCourseToPlan(id: string) {
    this.studRegs.AddCourses(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    })
  }

}
