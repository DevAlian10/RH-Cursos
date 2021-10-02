import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
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
