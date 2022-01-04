import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css'],
})
export class EmployeesTableComponent implements OnInit {
  errorResponse: any = null;
  name: any;
  showForm: boolean = false;
  employeesResponse: any = [];
  p: number = 1;
  numberOfElements: number = 10;
  key = 'id';
  reverse: boolean = false;
  constructor(public api: ApiService) {}

  ngOnInit() {
    this.api.getAllEmployees().subscribe(
      (response) => (this.employeesResponse = response),
      (err) => (this.errorResponse = err),
      () => (this.api.employeesData = this.employeesResponse.data)
    );
  }
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  onChangePagination(rows: any) {
    const target = rows.target as HTMLTextAreaElement;
    this.numberOfElements = +target.value;
  }
  deleteEmployee(employee: Employee) {
    const idx = this.employeesResponse.data.indexOf(employee);
    this.employeesResponse.data.splice(idx, 1);
  }
  showFormular() {
    this.showForm = !this.showForm;
    console.log(this.showForm);
  }
  onValidate(form: NgForm) {
    const employee = new Employee(
      this.employeesResponse.data.length + 1,
      form.value.employee_name,
      form.value.employee_salary,
      form.value.employee_age,
      ''
    );
    this.employeesResponse.data.push(employee);
    this.showFormular();
  }
  Search() {
    if (this.name !== '') {
      this.employeesResponse.data = this.employeesResponse.data.filter(
        (res: Employee) => {
          return res.employee_name
            .toLocaleLowerCase()
            .match(this.name.toLocaleLowerCase());
        }
      );
    } else this.ngOnInit();
  }
}
