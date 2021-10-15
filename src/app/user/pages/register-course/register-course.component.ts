import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/model/curso';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-register-course',
    templateUrl: './register-course.component.html',
    styleUrls: ['./register-course.component.css']
})
export class RegisterCourseComponent implements OnInit {

    public formCurso: FormGroup;
    errorMessages = {
        'nombre': [
            { type: 'required', message:'Igrese un nombre' }
        ],
        'tipo': [
            { type: 'required', message:'Selecione el tipo de curso' }
        ],
        'proveedor': [
            { type: 'required', message:'Ingrese el proveedor del curso' }
        ],
        'fecha': [
            { type: 'required', message:'Seleccione la fecha del curso' }
        ],
        'duracion': [
            { type: 'required', message:'Seleccione la duración del curso' }
        ]
    };
    public curso: Curso = {id: '', nombre: '', tipo: '', proveedor: '', fecha: new Date(), duracion: 0, idUser: ''};
    tipo: string[];
    time: string[];
    action: string = "";
    action_back: string = "";

    constructor(public formBuilder: FormBuilder, private dataService: DataService, private route: ActivatedRoute, private router: Router) {
        this.tipo = ["Impartido", "Recibido"];
        this.time = ["Horas", "Minutos"];
        this.formCurso = formBuilder.group({
            nombre: new FormControl('', Validators.compose([Validators.required])),
            tipo: new FormControl('', Validators.compose([Validators.required])),
            proveedor: new FormControl('', Validators.compose([Validators.required])),
            fecha: new FormControl('', Validators.compose([Validators.required])),
            duracion: new FormControl('', Validators.compose([Validators.required])),
            tiempo: new FormControl('', Validators.compose([Validators.required]))
        });
    }

    ngOnInit(): void {
        this.startAction();
    }
    
    startAction(){
        this.route.params.subscribe(res => {
            if (res.id != undefined) {
                this.action = "Actualizar";
                this.action_back = "Volver";
                this.retrieve(res.id);
            } else { 
                this.action = "Guardar";               
                this.action_back = "Cancelar";            
            }
        });
    }

    retrieve(id: string){
        this.dataService.retrieveCurso(id).subscribe(res => {
            if (res === undefined) {
                return alert('No se encontro el Curso');
            } else {
                this.curso = res;
                this.formCurso.get('nombre')?.setValue(this.curso.nombre);
                this.formCurso.get('proveedor')?.setValue(this.curso.proveedor);
                this.formCurso.get('tipo')?.setValue(this.curso.tipo);
                this.formCurso.get('fecha')?.setValue(this.curso.fecha);
                this.formCurso.get('duracion')?.setValue(this.curso.duracion);
                if (this.curso.duracion < 1) {
                    this.formCurso.get('tiempo')?.setValue('Minutos');
                }
                else{
                    this.formCurso.get('tiempo')?.setValue('Horas');                    
                }
            }
        });
    }

    actionRun(){
        if (!this.formCurso.valid) {
            return;
        }
        const id = JSON.parse(localStorage.getItem('User')!);
        this.curso.idUser = id.id;
        this.curso.nombre = this.formCurso.get('nombre')?.value;
        this.curso.tipo = this.formCurso.get('tipo')?.value;
        this.curso.proveedor = this.formCurso.get('proveedor')?.value;
        this.curso.fecha = this.formCurso.get('fecha')?.value;
        this.curso.duracion = this.formCurso.get('duracion')?.value;
        if (this.formCurso.get('tiempo')?.value === 'Minutos') {
            this.curso.duracion = parseFloat((this.curso.duracion / 60).toFixed(2));
        }
        if (this.action === 'Actualizar') {
            this.updateCourse();
        } else {
            this.registerCourse();
        }
    }

    async registerCourse(){
        this.curso.id = await this.dataService.createId();
        this.dataService.registerCourse(this.curso);
    }

    updateCourse(){
        this.dataService.updateCourse(this.curso).then(() => {
            alert('Actualizado');
        }).catch(() => {
            alert('Fallo actualizar el curso');
        });
    }
    actionBack(){
        window.history.back();
    }

}
