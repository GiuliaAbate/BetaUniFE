import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Department {
  departmentId: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})

//Servizio generali con metodi di base e condivisi
export class SharedService {

  constructor(private http: HttpClient, private route: Router) { }

  private apiUrl = 'https://localhost:7129/api/Departments';

  departments: Department[] = [];

  //Si crea un subject per poi assegnare un observable
  private userRoleSubject = new BehaviorSubject<number>(this.GetInitialUserRole());
  userRole = this.userRoleSubject.asObservable();

  //Metodo per richiamare get che prende le facoltà
  GetDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  //Metodo per prendere dipartimento dato id
  GetDepartmentById(depId : string): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${depId}`);
  }

  //Metodo per logout
  Logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    this.userRoleSubject.next(0);
    this.route.navigate(['/homepage']);
  }

  //Metodo per prendere ruolo iniziale
  GetInitialUserRole(): number {
    //Si prende il ruolo che si trova nel token in sessionStorage
    const role = sessionStorage.getItem('userRole');
    //Se il ruolo è presente nel token (quindi utente loggato, se professore o studente) si converte in un numero (1= studente, 2=professore)
    //Se non è presente allora il ruolo è uguale a 0
    return role ? parseInt(role) : 0;
  }

  //Metodo per impostare il ruolo, sottoscrivendo sul subject
  SetUserRole(role: number) {
    sessionStorage.setItem('userRole', role.toString());
    this.userRoleSubject.next(role);
  }

}
