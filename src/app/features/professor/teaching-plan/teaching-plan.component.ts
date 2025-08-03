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

  public courseExam: CourseExamInfo[] = [];
  public userRole: number = 0;
  public labs: Laboratory[] = [];
  public profCourseExams: CourseExamInfo[] = [];
  public selectedLabs: Laboratory[] = [];

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
    this.GetProfessorCourseExams();
    this.GetSelectedLabs();
  }

  //Si prende elenco dei corsi (e quindi esami sono collegati) che il professore può aggiungere
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

  //Per aggiungere un corso/esame
  AddCourseExam(courseId: string, examId: number) {
    this.reg.AddCourseExam(courseId, examId).subscribe({
      next: (res) => {
        console.log("Registrazione corso OK:", res);
        this.GetProfessorCourseExams();
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }

  //Prendere elenco dei laboratori disponibili
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

  //Prendere laboratori scelti 
  GetSelectedLabs() {
    this.reg.GetSelectedLabs().subscribe({
      next: (res) => {
        this.selectedLabs = res;
        console.log("Laboratori selezionati:", res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  //Per iscriversi ad un laboratorio
  AddLab(labId: number) {
    this.reg.AddLab(labId).subscribe({
      next: (res) => {
        console.log("Registrazione laboratorio OK:", res);
        this.GetSelectedLabs();
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }

  //Disiscriversi da corso/esame
  DeleteExamCourse(id: number | null) {
    if (id === null) return;

    this.reg.DeleteCourseExamReg(id).subscribe({
      next: (res) => {
        console.log("Disiscrizione avvenuta con successo", res);
        this.GetProfessorCourseExams();
      },
      error: (err) => {
        console.log("Errore nella disiscrizione", err);
      }
    });
  }

  //Disiscriversi da laboratorio
  DeleteLab(labId: number | null) {
    if (labId === null) return;
    this.reg.DeleteLabReg(labId).subscribe({
      next: (res) => {
        console.log("Disiscrizione avvenuta con successo", res);
        this.GetSelectedLabs();
      },
      error: (err) => {
        console.error('Errore nella rimozione del laboratorio:', err);
      }
    });
  }

  //Prendere i corsi selezionati
  GetProfessorCourseExams() {
    this.reg.GetSelectedCourseExams().subscribe({
      next: (res) => {
        this.profCourseExams = res;
        console.log("Corsi del professore:", res);
      },
      error: (err) => {
        console.error("Errore nel recupero dei corsi del professore:", err);
      }
    });
  }

  isRegistered(courseId: string, examId: number): boolean {
    return this.profCourseExams.some(e => e.courseId === courseId && e.examId === examId);
  }

  isLabAdded(labId: number): boolean {
    return this.selectedLabs.some(l => l.labId === labId);
  }

  getRegistrationId(courseId: string, examId: number): number | null {
    const reg = this.profCourseExams.find(e => e.courseId === courseId && e.examId === examId);
    return reg ? reg.id : null;
  }

  getLabRegId(labId: number): number | null {
    const reg = this.selectedLabs.find(l => l.labId === labId);
    return reg ? reg.id : null;
  }
}