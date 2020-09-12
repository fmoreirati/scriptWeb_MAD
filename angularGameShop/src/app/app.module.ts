import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNavComponent } from './view/page-nav/page-nav.component';
import { PageHeaderComponent } from './view/page-header/page-header.component';
import { PageFooterComponent } from './view/page-footer/page-footer.component';
import { PageHomeComponent } from './view/page-home/page-home.component';
import { UsuarioFormComponent } from './view/usuario-form/usuario-form.component';
import { UsuarioPerfilComponent } from './view/usuario-perfil/usuario-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNavComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PageHomeComponent,
    UsuarioFormComponent,
    UsuarioPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
