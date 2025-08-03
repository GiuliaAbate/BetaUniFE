import { Component, OnInit } from '@angular/core';
import { Department, SharedService } from '../../shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../../shared/signup.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-registration',
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',

})
export class RegistrationComponent implements OnInit {

  constructor(public shared: SharedService, private signUp: SignupService, private route: Router) { }

  departments: Department[] = [];
  isClicked: boolean = false;
  role: 'student' | 'professor' = 'student';

  formData = {
    name: '',
    surname: '',
    birthDate: '',
    email: '',
    password: '',
    phoneNumber: '',
    departmentId: ''
  }

  //Inizializzazione 
  ngOnInit() {
    this.GetDepartmentsList();
  }

  //Si prendono facolà per il select
  GetDepartmentsList() {
    this.shared.GetDepartments().subscribe({
      next: (res) => {
        this.departments = res;
      },
      error: (err) => {
        console.error('Errore nel caricamento dei dipartimenti', err);
      }
    });
  }

  //Metodo che invia il form e richiama metodo corrispondente a seconda del ruolo
  onSubmit() {
    if (this.role == 'student') {
      this.signUp.StudentSignUp(this.formData).subscribe({
        next: () => {
          this.route.navigate(['/login']);
        },
        error: (err) => {
          console.error("Errore di registrazione", err);
        }
      })
    } else if (this.role == 'professor') {
      this.signUp.ProfessorSignUp(this.formData).subscribe({
        next: () => {
          this.route.navigate(['/login']);
        },
        error: (err) => {
          console.error("Errore di registrazione", err);
        }
      })
    }
  }

  //Si controlla il ruolo in base al pulsante selezionato
  check(role: 'student' | 'professor') {
    this.role = role;
    this.isClicked = true;
    console.log("Ruolo selezionato:", this.role);
  }

  //Metodo per ritornare alla schermata di selezione del ruolo dal form
  goBack(): void {
    this.isClicked = false;
  }
}