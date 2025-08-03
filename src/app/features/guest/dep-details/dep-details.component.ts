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
    private route: ActivatedRoute
  ) { }

  departmentId: string = '';
  department!: Department;
  courses: Course[] = [];
  labs: Laboratory[] = [];
  classes: Classroom[] = [];

  //Inizializzazione
  ngOnInit(): void {
    //Si prende id dalla route per mostrare la pagina della facoltà selezionata
    this.departmentId = this.route.snapshot.paramMap.get('id') || '';
    //Se l'id è presente si caricano tutte le informazioni
    if (this.departmentId) {
      this.LoadDepartments(this.departmentId);
      this.LoadCourses(this.departmentId);
      this.LoadLabs(this.departmentId);
    }
  }

  //Si prende la chiamata che prende il nome della facoltà dato id
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

  //Si caricano i corsi e laboratori
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
