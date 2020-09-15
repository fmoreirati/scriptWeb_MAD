import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNavComponent } from './view/page-nav/page-nav.component';
import { PageHeaderComponent } from './view/page-header/page-header.component';
import { PageFooterComponent } from './view/page-footer/page-footer.component';
import { PageHomeComponent } from './view/page-home/page-home.component';
import { UsuarioFormComponent } from './view/usuario-form/usuario-form.component';
import { UsuarioPerfilComponent } from './view/usuario-perfil/usuario-perfil.component';
import { EnderecoFormComponent } from './view/endereco-form/endereco-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNavComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PageHomeComponent,
    UsuarioFormComponent,
    UsuarioPerfilComponent,
    EnderecoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrMaskerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
