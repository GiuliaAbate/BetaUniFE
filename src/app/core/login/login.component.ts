import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { SigninService } from '../../shared/signin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public shared: SharedService, private signIn: SigninService, private route: Router) { }

  isClicked: boolean = false;
  role: 'student' | 'professor' = 'student';

  formData = {
    email: '',
    password: '',
  }

  emailError: string = '';
  pwError: string = '';

  //Metodo che invia il form e richiama metodo corrispondente a seconda del ruolo
  onSubmit() {
    const { email, password } = this.formData;

    this.emailError = '';
    this.pwError = '';

    if (this.role === 'student') {
      this.signIn.StudentLogin(email, password).subscribe({
        next: (res) => {
          sessionStorage.setItem('jwt', res.token);
          this.shared.SetUserRole(1);
          this.route.navigate(['/homepage']);
        },
        error: (err) => {
          if (err.status === 401 && err.error?.field) {
            if (err.error.field === 'Email') {
              this.emailError = err.error.message;
            } else if (err.error.field === 'Password') {
              this.pwError = err.error.message;
            }
          } else {
            console.error("Errore interno", err);
          }
        }
      });
    } else if (this.role === 'professor') {
      this.signIn.ProfessorLogin(email, password).subscribe({
        next: (res) => {
          sessionStorage.setItem('jwt', res.token);
          this.shared.SetUserRole(2);
          this.route.navigate(['/homepage']);
        },
        error: (err) => {
          if (err.status === 401 && err.error?.field) {
            if (err.error.field === 'Email') {
              this.emailError = err.error.message;
            } else if (err.error.field === 'Password') {
              this.pwError = err.error.message;
            }
          } else {
            console.error("Errore interno", err);
          }
        }
      });
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
