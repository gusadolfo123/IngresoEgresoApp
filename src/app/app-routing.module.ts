import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthGuardService} from './guards/auth-guard.service';
// import {DashboardComponent} from './dashboard/dashboard.component';
// import {dashboardRoutes} from './dashboard/dashboard.routes';
// import {AuthGuardService} from './guards/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // lazy load
  {
    path: '',
    loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
    // canActivate: [] sirve pero solo si el modulo esta cargado
    canLoad: [AuthGuardService], // se usa para cargar modulo si cumple una condicion
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
