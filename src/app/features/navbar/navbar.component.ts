import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { SigninService } from '../../shared/signin.service';
import { SharedService } from '../../shared/shared.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(public login : SigninService, public shared: SharedService) {}

  navItems: { label: string, route: string}[] = [];
  public userRole: number = 0;

  //Inizializzazione del componente
  ngOnInit() : void {
    //Si inizializza il ruolo dell'utente loggato e in base a quello verrà mostrata navbar con voci diverse
    this.shared.userRole.subscribe(role => {
      this.userRole = role;
      this.showNavItems();
    });
  }

  //Mostra navbar diversa in base all'utente
  showNavItems() {
    //0: Guest, 1: Studente, 2:Professore
    if(this.userRole == 0){
      this.navItems = [
        {label: "Chi Siamo", route: "/aboutUs"},
        {label: "Offerta Formativa", route: "/education"},
        {label: "Iscrizioni", route: "/enrollment"},
      ];
    //Studente
    } else if (this.userRole == 1) {
      this.navItems = [
        {label: "Piano Carriera", route: "/studyPlan"},
        {label: "Corsi e Laboratori", route: "/courses-labs"},
        {label: "Esami", route: "/exams"},
      ];
    //Professore
    } else if (this.userRole == 2) {
      this.navItems = [
        {label: "Piano didattico", route: "/teachingPlan"},
        {label: "Insegnamenti", route: "/teachings"},
        {label: "Elenco iscritti ", route: "/enrolledStuds"},
      ];
    }
  }
}
