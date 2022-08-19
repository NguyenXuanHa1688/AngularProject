import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginAndRegisterComponent } from './components/users/login-and-register/login-and-register.component';
import { WeatherComponent } from './components/weather/weather.component';
import { InspectionComponent } from './inspection/inspection.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', component: LoginAndRegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'app', component: InspectionComponent, canActivate: [AuthGuard]},
  {path: 'weather', component: WeatherComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
