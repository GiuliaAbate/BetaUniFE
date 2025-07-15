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
export class SharedService {

  constructor(private http: HttpClient, private route: Router) { }

  departments: Department[] = [];
  private apiUrl = 'https://localhost:7129/api/Departments';

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
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.userRoleSubject.next(0);
    this.route.navigate(['/homepage']);
  }

  //metodo per prendere ruolo subito
  GetInitialUserRole(): number {
    const role = localStorage.getItem('userRole');
    return role ? parseInt(role) : 0;
  }

  SetUserRole(role: number) {
    localStorage.setItem('userRole', role.toString());
    this.userRoleSubject.next(role);
  }

  
}
