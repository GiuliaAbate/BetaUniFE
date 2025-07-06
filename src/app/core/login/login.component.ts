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

  constructor(public shared: SharedService, private signIn: SigninService, private route : Router) { }

  isClicked: boolean = false;
  role: 'student' | 'professor' = 'student';

  formData = {
    email: '',
    password: '',
  }

  onSubmit() {
    const { email, password } = this.formData;

    if (this.role == 'student') {
      this.signIn.StudentLogin(email, password).subscribe({
        next: (res) => {
          localStorage.setItem('jwt', res.token);
          this.shared.SetUserRole(1);
          this.route.navigate(['/homepage']);
        },
        error: (err) => {
          console.error("Errore di registrazione", err);
        }
      });
    } else if (this.role == 'professor') {
      this.signIn.ProfessorLogin(email, password).subscribe({
        next: (res) => {
          localStorage.setItem('jwt', res.token);
          this.shared.SetUserRole(2);
          this.route.navigate(['/homepage']);
        },
        error: (err) => {
          console.error("Errore di registrazione", err);
        }
      });
    }
  }

  check(role: 'student' | 'professor') {
    this.role = role;
    this.isClicked = true;
    console.log("Ruolo selezionato:", this.role);
  }
}
