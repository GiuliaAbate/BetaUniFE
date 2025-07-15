import { Component, OnInit } from '@angular/core';
import { ExamInfos, ExamsService, } from '../../shared/exams.service';
import { SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exams',
  imports: [CommonModule, FormsModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css'
})
export class ExamsComponent implements OnInit {
  public exams: ExamInfos[] = [];
  public userRole: number = 0;

  constructor(
    private examService: ExamsService,
    private shared: SharedService
    ) { }

  ngOnInit(): void {
    this.shared.userRole.subscribe(role => {
      this.userRole = role;
    });
    this.GetExamsList();
  }

  GetExamsList() {
    this.examService.GetExamsInfos().subscribe({
      next: (res) => {
        this.exams = res;
        console.log(this.exams);
      },
      error: (err) => {
        console.error('Errore di aggiornamento:', err);
      }
    });
  }

  RegisterToExam(id:number){
    this.examService.ExamRegistration(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        // window.alert("Ti sei già iscritto all'esame");
        console.log(err);
      }
    })
  }
}
