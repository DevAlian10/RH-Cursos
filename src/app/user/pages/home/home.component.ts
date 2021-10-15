import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	user: any;
    /* listCursos!: Subscription; */
    /* cursos: any[] = []; */
    /* getAll: any[] = []; */

	constructor(private dataServices: DataService) { }

	async ngOnInit(): Promise<void> {
		this.user = await JSON.parse(localStorage.getItem('User')!);
        /* this.getAllCursos(); */
        /* this.getCursos();  */   
	}
    /* getCursos(){
        this.listCursos = this.dataServices.getCursos().subscribe(res => {
            this.getAll = [...res];
        });
    } */
    /* getAllCursos(){
        this.listCursos = this.dataServices.getAllCursos(this.user.id).subscribe(res => {
            this.cursos = [...res];            
        });
    } */
    /* ngOnDestroy(){
        this.listCursos.unsubscribe();
    } */
}
