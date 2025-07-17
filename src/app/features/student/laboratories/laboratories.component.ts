import { Component, OnInit } from '@angular/core';
import { Laboratory } from '../../../shared/courses-labs.service';
import { StudRegistrationsService } from '../../../shared/stud-registrations.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-laboratories',
  imports: [],
  templateUrl: './laboratories.component.html',
  styleUrl: './laboratories.component.css'
})
export class LaboratoriesComponent implements OnInit {


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

    this.GetStudentLabs();
  }

  GetStudentLabs(){
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
