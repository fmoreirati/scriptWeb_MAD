import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  public email: string = "";
  public senha: string = "";

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.loginWEB();
  }

  loginWEB() {
    this.usuarioService.auth.signInWithEmailAndPassword(this.email, this.senha).then(
      res => {
        this.router.navigate(["/"]);
      },
      err => {
        alert("E-mail e/ou senha não localizado!");
        console.log(err);
      }
    )
  }

  logout() {
    this.usuarioService.logout();
  }
}
