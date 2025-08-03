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

  public userRole: number = 0;

  public courses: Course[] = [];
  public labs: Laboratory[] = [];

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

  //Lista dei corsi in base alla facoltà dello studente
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

  //Lista dei lab in base alla facoltà dello studente
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

  //Per aggiungere i corsi al piano carriera (quindi iscriversi)
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

  //Per aggiungere i laboratori
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

  //Per disisicriversi da un corso
  DeleteCourse(regId: number | null) {
    //Se l'id della registrazione non si esegue nessuna chiamata
    if (regId === null) {
      return
    };

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

  //Per disisicriversi da un laboratorio
  DeleteLab(regId: number | null) {
    if (regId === null) {
      return
    };

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

  //Metodi per controllare se lo studente è già iscritto al corso/laboratorio
  isRegistered(courseId: string): boolean {
    // Si restituisce true se esiste almeno un elemento in selectedCourses con lo stesso courseId
    return this.selectedCourses.some(e => e.courseId === courseId);
  }

  isLabAdded(labId: number): boolean {
    return this.selectedLabs.some(l => l.labId === labId);
  }

  //Metodi per prendere id della registrazione al corso/laboratorio
  getRegistrationId(courseId: string): number | null {
    // Si cerca l'iscrizione al corso con il courseId specificato
    const reg = this.selectedCourses.find(e => e.courseId === courseId);
    // Se trovata, restituisce l'id della registrazione, altrimenti è null
    return reg ? reg.id : null;
  }

  getLabRegId(labId: number): number | null {
    const reg = this.selectedLabs.find(l => l.labId === labId);
    return reg ? reg.id : null;
  }

}
