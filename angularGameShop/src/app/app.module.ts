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

// Firebase ----
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UsuarioLoginComponent } from './view/usuario-login/usuario-login.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNavComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PageHomeComponent,
    UsuarioFormComponent,
    UsuarioPerfilComponent,
    EnderecoFormComponent,
    UsuarioLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrMaskerModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
