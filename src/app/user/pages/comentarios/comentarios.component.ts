import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-comentarios',
    templateUrl: './comentarios.component.html',
    styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

    public formMensaje: FormGroup;

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
        this.formMensaje = this.formBuilder.group({
            'asunto': new FormControl("", Validators.required),
            'mensaje': new FormControl("", Validators.required)
        });
    }

    ngOnInit(): void {
    }

    async send(){
        const data = await JSON.parse(localStorage.getItem('User')!);
        if (!this.formMensaje.invalid) {
            const formData: any = {
                name: data.nombre + ' ' +data.apellidoP,
                email: data.email,
                subject: this.formMensaje.get('asunto')?.value,
                message: this.formMensaje.get('mensaje')?.value
            }
            this.http.post('https://formspree.io/f/mpzkezrd', formData).subscribe(async (res: any) => {
                if (await res.ok) {
                    this.formMensaje.reset();
                    alert('Correo enviado');
                } else {
                    alert('Error al enviar correo');                    
                }
            });
        }
        else{
            alert('Formulario no valido');
            return;
        }
    }
}
