import { Component, OnInit } from '@angular/core';
import { Course, Laboratory } from '../../shared/courses-labs.service';
import { StudRegistrationsService } from '../../shared/stud-registrations.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  public courses: Course[] = [];
  public userRole: number = 0;

  constructor(
    private studRegSVC: StudRegistrationsService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.shared.userRole.subscribe(role => {
      this.userRole = role;
    });

    this.GetStudentCourses();
  }

  GetStudentCourses(){
    this.studRegSVC.GetCourses().subscribe({
      next: (res) => {
        this.courses = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
