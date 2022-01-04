import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  employeesData: Employee[] = [];
  constructor(private http: HttpClient) {}
  getAllEmployees() {
    return this.http.get('https://dummy.restapiexample.com/api/v1/employees');
  }
}
