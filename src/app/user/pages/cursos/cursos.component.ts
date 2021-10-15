import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-cursos',
    templateUrl: './cursos.component.html',
    styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

    user: any;
    listCursos: any[] = [];
    listSubscription!: Subscription;

    constructor(private dataServices: DataService) {
    }

    async ngOnInit(): Promise<void> {
        this.user = await JSON.parse(localStorage.getItem('User')!);
        this.getCursos();
    }

    ngOnDestroy(){
        this.listSubscription.unsubscribe();
    }

    getCursos() {
        this.listSubscription = this.dataServices.getAllCursos(this.user.id).subscribe(res => {
            this.listCursos = [...res];
        });
    }

    deleteCurso(id: string){
        this.dataServices.deleteCurso(id).then(() => {
            alert('Curso eliminado');
        })
    }

}
