import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Department, SharedService } from '../../../shared/shared.service';
import { Classroom, Course, CoursesLabsService, Laboratory } from '../../../shared/courses-labs.service';


@Component({
  selector: 'app-dep-details',
  imports: [CommonModule],
  templateUrl: './dep-details.component.html',
  styleUrl: './dep-details.component.css'
})
export class DepDetailsComponent implements OnInit {

  constructor(
    private CourseLab: CoursesLabsService,
    private shared: SharedService,
    private route: ActivatedRoute) { }

  departmentId: string = '';
  department!: Department;
  courses: Course[] = [];
  labs: Laboratory[] = [];
  classes: Classroom[] = [];

  ngOnInit(): void {
    this.departmentId = this.route.snapshot.paramMap.get('id') || '';
    if (this.departmentId) {
      this.LoadDepartments(this.departmentId);
      this.LoadCourses(this.departmentId);
      this.LoadLabs(this.departmentId);
    }
  }

  LoadDepartments(depId: string) {
    this.shared.GetDepartmentById(depId).subscribe({
      next: (res) => {
        this.department = res;
      },
      error: (err) => {
        console.error('Errore nel caricamento del dipartimento', err);
      }
    });
  }

  LoadCourses(depId: string) {
    this.CourseLab.GetCoursesByDepartment(depId).subscribe({
      next: (res) => {
        this.courses = res;
      },
      error: (err) => {
        console.error("Errore nel caricamento", err);
      }
    });
  }

  LoadLabs(depId: string) {
    this.CourseLab.GetLabsByDepartment(depId).subscribe({
      next: (res) => {
        this.labs = res;
      },
      error: (err) => {
        console.error("Errore nel caricamento", err);
      }
    })
  }
}
