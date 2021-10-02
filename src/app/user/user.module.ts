import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';
import { RegisterCourseComponent } from './pages/register-course/register-course.component';


@NgModule({
	declarations: [
		HomeComponent,
		NavbarComponent,
		FooterComponent,
		RegisterCourseComponent
	],
	imports: [
		CommonModule,
		UserRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [AuthService, AuthGuard],
	bootstrap: [AppComponent]
})
export class UserModule { }
