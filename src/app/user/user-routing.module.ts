import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterCourseComponent } from './pages/register-course/register-course.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'home', component: HomeComponent, canActivate: [AuthGuard]
			},
			{
				path: 'registerCourse', component: RegisterCourseComponent, canActivate: [AuthGuard]
			},
			{
				path: 'registerCourse/:id', component: RegisterCourseComponent, canActivate: [AuthGuard]
			},
            {
                path: 'curso', component: CursosComponent, canActivate: [AuthGuard]
            },
            {
                path: 'contacto', component: ComentariosComponent, canActivate: [AuthGuard]
            },
			{
				path: '**', redirectTo: 'home'
			}
		], canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class UserRoutingModule { }
