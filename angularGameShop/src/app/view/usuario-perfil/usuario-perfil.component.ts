import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {

  public id: string = null;
  public usuario: Usuario = new Usuario;

  constructor(
    private activatedRouter: ActivatedRoute,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.paramMap.get("rapadura");
    if (this.id) {
      this.usuarioService.getUser(this.id).subscribe(
        res => {
          this.usuario = res;
        }
      )
      this.usuarioService.getAllEndereco(this.id).subscribe(
        res => {
          this.usuario.endereco = res
        })
    }
  }

  recebeEndereco(event) {
    console.log("Endereço recebido:\n", event);
  }

  marcarPrincipal(index) {
    let i = 0;
    for (let endereco of this.usuario.endereco) {
      if (i == index) {
        endereco.principal = true
      } else {
        endereco.principal = false
      }
      i++
    }
    //this.usuario.endereco[index].principal = !this.usuario.endereco[index].principal
  }
}
