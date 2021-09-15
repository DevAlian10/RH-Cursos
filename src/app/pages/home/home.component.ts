import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

    async signOut() {
        await localStorage.removeItem('dataUSer');
        this.authService.signOut();
    }
}
