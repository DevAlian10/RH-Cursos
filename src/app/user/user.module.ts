import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AppComponent } from '../app.component';
import { RegisterCourseComponent } from './pages/register-course/register-course.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';


@NgModule({
	declarations: [
		HomeComponent,
		NavbarComponent,
		FooterComponent,
		RegisterCourseComponent,
  CursosComponent,
  ComentariosComponent
	],
	imports: [
		CommonModule,
		UserRoutingModule,
		FormsModule,
        ReactiveFormsModule,
        HttpClientModule
	],
	providers: [AuthService, AuthGuard],
	bootstrap: [AppComponent]
})
export class UserModule { }
