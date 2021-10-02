import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register-admin',
    templateUrl: './register-admin.component.html',
    styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

    formRegister!: FormGroup;
    validation_messages_register = {
        'nombre': [
            { type: 'required', message: 'Correo electrónico requerido.' }
        ],
        'apellidos': [
            { type: 'required', message: 'Ingrese sus apellidos' }
        ],
        'departamento': [
            { type: 'required', message: 'Departamento al que pertenece?' }
        ],
        'puesto': [
            { type: 'required', message: 'Contraseña requerida.' }
        ],
        'email': [
            { type: 'required', message: 'Correo electrónico requerido.' },
            { type: 'pattern', message: 'Ingrese un correo válido.' }
        ],
        'password': [
            { type: 'required', message: 'Contraseña requerida.' },
            { type: 'minlength', message: 'Contraseña: mínimo 5 caracteres.' }
        ],
        'type': [
            { type: 'required', message: 'Tipo de usuario' }
        ]
    };
    constructor(private auht: AuthService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.formRegister = this.formBuilder.group({
            nombre: new FormControl('', Validators.compose([
                Validators.required
            ])),
            apellidos: new FormControl('', Validators.compose([
                Validators.required
            ])),
            departamento: new FormControl('', Validators.compose([
                Validators.required
            ])),
            puesto: new FormControl('', Validators.compose([
                Validators.required
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(5)
            ])),
            type: new FormControl('', Validators.compose([
                Validators.required
            ]))
        });
    }

    data: User = { id: "", nombre:"", apellidoP: "", apellidoM: "", sexo: "", departamento: "", puesto:"", email:"", password:"", type:"", avatar:"" };

    /* Register Users */
    register(){
        if(!this.formRegister){
            return;
        }
        this.data.nombre = this.formRegister.get('nombre')?.value;
        this.data.apellidoP = this.formRegister.get('apellidos')?.value;
        this.data.departamento = this.formRegister.get('departamento')?.value;
        this.data.puesto = this.formRegister.get('puesto')?.value;
        this.data.email = this.formRegister.get('email')?.value;
        this.data.password = this.formRegister.get('password')?.value;
        this.data.type = this.formRegister.get('type')?.value;
        this.auht.register(this.data).then(user => {
            this.data.id = user.user?.uid;
            this.auht.setDataUser(this.data).then(res => {
                console.log(res);
                alert('Se registro el usuario correctamente :)');
            });
        });
    }

}
