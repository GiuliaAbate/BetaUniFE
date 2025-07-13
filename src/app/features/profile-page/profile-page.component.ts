import { Component, OnInit } from '@angular/core';
import { Student, UsersService } from '../../shared/users.service';
import { SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule,FormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {

  student: Student | null = null;
  public userRole: number = 0;
  isClicked: boolean = false;
  phoneNumberInput: string = '';
  passwordInput: string = '';

  constructor(private users: UsersService, private shared: SharedService) { }

  ngOnInit(): void {
    this.shared.userRole.subscribe(role => {
      this.userRole = role;
    });
    this.GetStudentInfo();
  }

  GetStudentInfo() {
    this.users.GetStudentInfo().subscribe({
      next: (res) => {
        console.log(res);
        this.student = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  checkBtn() {
    this.isClicked = true;
  }

  applyChanges() {
    this.users.UpdateInfos({
      phoneNumber: this.phoneNumberInput,
      password: this.passwordInput
    }).subscribe({
      next: () => {
        console.log('Dati aggiornati con successo');
      },
      error: (err) => {
        console.error('Errore nell\'aggiornamento:', err);
      }
    });
  }
}
