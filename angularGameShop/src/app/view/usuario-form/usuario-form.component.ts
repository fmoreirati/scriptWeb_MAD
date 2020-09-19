import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endereco } from 'src/app/model/endereco';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  public usuario: Usuario = new Usuario;
  public conf: string = "";
  
  constructor(
    private usuarioService: UsuarioService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }


  onSubmit(form) {
    //console.log("Usuario: \n", this.usuario, "Form: \n", form);
    this.usuarioService.addUser(this.usuario).then(
      res => {
        alert("Cadastrado!");
        form.reset();
        this.router.navigate(['perfilUser', res.id]);

      },
      err => {
        alert("Não foi possivel fazer o cadastro!");
      }
    )
  }
}
