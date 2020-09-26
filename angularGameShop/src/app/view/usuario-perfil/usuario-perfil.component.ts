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
  public idEndereco: string = null;

  constructor(
    private activatedRouter: ActivatedRoute,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.verificarUser()
  }

  marcarPrincipal(idEndereco) {
    this.usuarioService.definirPrincipal(this.id, idEndereco).then(
      () => {
        // this.verificarUser()
        this.usuarioService.getAllEndereco(this.id).subscribe(
          res => {
            this.usuario.endereco = res
          })
      });
  }

  verificarUser() {
    this.usuarioService.auth.user.subscribe(
      res => {
        this.id = res.uid;
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
    )
    //this.id = this.activatedRouter.snapshot.paramMap.get("rapadura");
    // if (this.id) {
    //   this.usuarioService.getUser(this.id).subscribe(
    //     res => {
    //       this.usuario = res;
    //     }
    //   )
    //   this.usuarioService.getAllEndereco(this.id).subscribe(
    //     res => {
    //       this.usuario.endereco = res
    //     })
    // }
  }


  atualizarEndereco(idEndedeco){ // id ou key ou uid
    this.idEndereco = idEndedeco;
  }

  removerEndereco(idEndedeco){
    if (confirm("Deseja apagar o Endereço?")){
     this.usuarioService.removerEndereco(idEndedeco, this.id)
    } 
    this.atualizarListaEndereco(null)
  }

  atualizarListaEndereco(event) {
    //console.log("Endereço recebido:\n", event);
    this.verificarUser()
  }
}
