import { Component, OnInit } from '@angular/core';
import { Course, CoursesLabsService, Laboratory } from '../../../shared/courses-labs.service';
import { StudRegistrationsService } from '../../../shared/stud-registrations.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-study-plan',
  imports: [CommonModule, FormsModule],
  templateUrl: './study-plan.component.html',
  styleUrl: './study-plan.component.css'
})
export class StudyPlanComponent implements OnInit {

  public courses: Course[] = [];
  public labs: Laboratory[] = [];
  public userRole: number = 0;
  public selectedCourses: Course[] = [];
  public selectedLabs: Laboratory[] = [];

  constructor(
    private CoursesLabs: CoursesLabsService,
    private studRegs: StudRegistrationsService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.shared.userRole.subscribe(role => {
      this.userRole = role;
    });

    //Lista dei corsi a cui lo studente si può iscrivere perchè fanno parte della sua facoltà e che potrà scegliere
    this.GetCoursesList();
    this.GetLabsList();

    //Si inizializzano le get che prendono i corsi a cui lo studente è iscritto
    this.GetStudentCourses();
    this.GetStudentLabs();
  }

  GetCoursesList() {
    this.CoursesLabs.GetCoursesByStudent().subscribe({
      next: (res) => {
        this.courses = res;
        console.log(res);
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }

  GetLabsList() {
    this.CoursesLabs.GetLabsByStudent().subscribe({
      next: (res) => {
        this.labs = res;
        console.log(this.labs);
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
        window.alert("Hai già aggiunto il laboratorio");
        console.log(err);
      }
    });
  }

  AddLabToPlan(id: number) {
    this.studRegs.AddLabs(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        window.alert("Hai già aggiunto il laboratorio")
        console.log(err);
      }
    });
  }

  DeleteCourse(regId: number | null) {
    if (regId === null) return;

    this.studRegs.DeleteCourseReg(regId).subscribe({
      next: (res) => {
        console.log("Eliminazione avvenuta con successo", res);
        this.GetStudentCourses();
      },
      error: (err) => {
        console.log("Errore nell'eliminazione", err);
      }
    });
  }

  DeleteLab(regId: number | null) {
    if (regId === null) return;

    this.studRegs.DeleteLabReg(regId).subscribe({
      next: (res) => {
        console.log("Eliminazione avvenuta con successo", res);
        this.GetStudentLabs();
      },
      error: (err) => {
        console.log("Errore nell'eliminazione", err);
      }
    });
  }

  //Carica i corsi a cui è iscritto lo studente
  GetStudentCourses() {
    this.studRegs.GetCourses().subscribe({
      next: (res) => {
        this.selectedCourses = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  //Carica i laboratori a cui è iscritto lo studente
  GetStudentLabs() {
    this.studRegs.GetLabs().subscribe({
      next: (res) => {
        this.selectedLabs = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  isRegistered(courseId: string): boolean {
    return this.selectedCourses.some(e => e.courseId === courseId);
  }

  isLabAdded(labId: number): boolean {
    return this.selectedLabs.some(l => l.labId === labId);
  }

  getRegistrationId(courseId: string): number | null {
    const reg = this.selectedCourses.find(e => e.courseId === courseId);
    return reg ? reg.id : null;
  }

  getLabRegId(labId: number): number | null {
    const reg = this.selectedLabs.find(l => l.labId === labId);
    return reg ? reg.id : null; // id è l'ID della registrazione ProfessorLabs
  }

}
