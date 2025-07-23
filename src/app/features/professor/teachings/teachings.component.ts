import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CourseExamInfo, ProfRegistrationsService } from '../../../shared/prof-registrations.service';
import { SharedService } from '../../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { Laboratory } from '../../../shared/courses-labs.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-teachings',
  imports: [CommonModule],
  templateUrl: './teachings.component.html',
  styleUrl: './teachings.component.css'
})
export class TeachingsComponent implements OnInit {

  public userRole: number = 0;
  public courses: CourseExamInfo[] = []
  public exams: CourseExamInfo[] = []
  public labs: Laboratory[] = [];

  @ViewChild('deleteModal') deleteModal!: ElementRef;
  private bsModalInstance: Modal | null = null;
  selectedId: number | null = null;
  selectedType: 'course' | 'lab' | 'exam' | null = null;

  constructor(
    private regSvc: ProfRegistrationsService,
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

  GetCourses() {
    this.regSvc.GetSelectedCourses().subscribe({
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
    this.regSvc.GetSelectedLabs().subscribe({
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
    this.regSvc.GetSelectedExams().subscribe({
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
