import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Course, Laboratory } from '../../../shared/courses-labs.service';
import { StudRegistrationsService } from '../../../shared/stud-registrations.service';
import { SharedService } from '../../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses-labs.component.html',
  styleUrl: './courses-labs.component.css'
})
export class CoursesLabsComponent implements OnInit {

  public courses: Course[] = [];
  public labs: Laboratory[] = [];
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
    this.GetStudentLabs();
  }

  //Si caricano corsi e laboratori aggiunti dallo studente
  GetStudentCourses() {
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

  GetStudentLabs() {
    this.studRegSVC.GetLabs().subscribe({
      next: (res) => {
        this.labs = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
