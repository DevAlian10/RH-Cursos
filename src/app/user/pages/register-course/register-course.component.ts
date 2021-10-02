import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css']
})
export class RegisterCourseComponent implements OnInit {

  tipoCurso: string[] = ["Impartido","Recibido"];

  data: any = {
    name: "",
    tipoCurso: ""
  }

  constructor() { }

  ngOnInit(): void {
  }
}
