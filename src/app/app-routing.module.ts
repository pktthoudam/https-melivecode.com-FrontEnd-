import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionComponent } from './attraction/attraction.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuard } from '../app/auth.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {path:"listUser", component:ListUserComponent},
  {path:"details/:id", component:DetailsComponent},
  {path:"home", component:HomeComponent},
  {path:"login", component:LoginComponent, canActivate:[LoginGuard]},
  {path:"userDetails", component:UserDetailsComponent, canActivate:[AuthGuard]},
  {path:"attraction", component:AttractionComponent},
  {path:"attraction/:id", component:AttractionComponent},
  {path:"", redirectTo:"home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }