import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    user: any;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.getId();
    }

    //Obtener ID del usuario
    getId(){
        let id = JSON.parse(localStorage.getItem('dataUser')!);
        console.log(id);
        this.authService.getUser(id.uid).subscribe(res => {
            this.user = res;
        });
    }

    async singOut() {
        await localStorage.removeItem('dataUser');
        this.authService.signOut();
    }
}
