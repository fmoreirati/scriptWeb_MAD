import { Component, OnInit } from '@angular/core';
import { Endereco } from 'src/app/model/endereco';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css']
})
export class EnderecoFormComponent implements OnInit {
  public endereco: Endereco = new Endereco;
  public cep: string = "";

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  buscaCEP() {
    this.usuarioService.getEndereco(this.cep).subscribe(
      res => {
        this.endereco = res;
        console.log(res);
      },
      err => {
        console.error(err);

      }
    )
  }

}
