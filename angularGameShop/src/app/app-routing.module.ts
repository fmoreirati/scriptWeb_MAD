import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from './view/page-home/page-home.component';
import { UsuarioFormComponent } from './view/usuario-form/usuario-form.component';
import { UsuarioLoginComponent } from './view/usuario-login/usuario-login.component';
import { UsuarioPerfilComponent } from './view/usuario-perfil/usuario-perfil.component';

const routes: Routes = [
  {
    path:"", component:PageHomeComponent
  },
  {
    path:"login", component:UsuarioLoginComponent
  },
  {
    path:"formUser", component:UsuarioFormComponent
  },
  {
    path:"perfilUser", component:UsuarioPerfilComponent
  },
  {
    path:"perfilUser/:rapadura", component:UsuarioPerfilComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
