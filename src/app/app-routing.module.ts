import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ChatComponent } from './components/chat/chat.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginAndRegisterComponent } from './components/users/login-and-register/login-and-register.component';
import { WeatherComponent } from './components/weather/weather.component';
import { InspectionComponent } from './inspection/inspection.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', component: LoginAndRegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'detail/:id', component: DetailsComponent},
  {path: 'app', component: InspectionComponent, canActivate: [AuthGuard]},
  {path: 'weather', component: WeatherComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'chat', component: ChatComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'playlist', component: PlaylistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
