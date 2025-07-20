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
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  private bsModalInstance: Modal | null = null;

  public courses: Course[] = [];
  public labs: Laboratory[] = [];
  public userRole: number = 0;

  selectedId: number | null = null;
  selectedType: 'course' | 'lab' | null = null;

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

  AskDelete(id: number, type: 'course' | 'lab') {
    this.selectedId = id;
    this.selectedType = type;

    const modalElement = this.deleteModal.nativeElement;
    this.bsModalInstance = new Modal(modalElement);
    this.bsModalInstance.show();
  }

  Delete() {
    if (this.selectedType === 'course' && this.selectedId !== null) {
      this.DeleteCourse(this.selectedId);
    } else if (this.selectedType === 'lab' && this.selectedId !== null) {
      this.DeleteLab(this.selectedId);
    }
  }

  DeleteCourse(regId: number) {
    this.studRegSVC.DeleteCourseReg(regId).subscribe({
      next: (res) => {
        console.log("Eliminazione avvenuta con successo", res);
        this.GetStudentCourses();

        if (this.bsModalInstance) {
          this.bsModalInstance.hide();
          this.bsModalInstance = null;
        }
      },
      error: (err) => {
        console.log("Errore nell'eliminazione", err);
      }
    });
  }

  DeleteLab(regId: number) {
    this.studRegSVC.DeleteLabReg(regId).subscribe({
      next: (res) => {
        console.log("Eliminazione avvenuta con successo", res);
        this.GetStudentLabs();

        if (this.bsModalInstance) {
          this.bsModalInstance.hide();
          this.bsModalInstance = null;
        }
      },
      error: (err) => {
        console.log("Errore nell'eliminazione", err);
      }
    });
  }
}
