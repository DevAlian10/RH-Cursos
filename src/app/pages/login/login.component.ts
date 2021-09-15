import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    formLogin!: FormGroup;

    validation_messages_login = {
        'email'!: [
            { type: 'required', message: 'Correo electrónico requerido.' },
            { type: 'pattern', message: 'Ingrese un correo válido.' }
        ],
        'password'!: [
            { type: 'required', message: 'Contraseña requerida.' },
            { type: 'minlength', message: 'Contraseña: mínimo 5 caracteres.' }
        ]
    };

    constructor(
        public authService: AuthService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.formLogin = this.formBuilder.group({
            email!: new FormControl('', Validators.compose([
                Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(5)
            ]))
        });
    }

    //Método para iniciar sesión
    singIn(){
        this.authService.signIn(this.formLogin.value.email, this.formLogin.value.password);
    }

    //Método para registrar un nuevo Usuario
    registerUser(){}    
}
