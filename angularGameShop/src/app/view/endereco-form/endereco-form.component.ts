import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Endereco } from 'src/app/model/endereco';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css']
})
export class EnderecoFormComponent implements OnInit {
  @Input() public id: string;
  @Output() enviaEndereco = new EventEmitter<Endereco>();

  public endereco: Endereco = new Endereco;
  public cep: string = "";
  public numero: string = "";
  public complementoLocal: string = "";

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
        this.enviaEndereco.emit(res);
      },
      err => {
        console.error(err);
        alert("Endereço não localizado!")
      }
    )
  }

  addEndereco() {
    this.usuarioService.addEndereco(this.endereco, this.id).subscribe(
      res => {
        alert("Adicionado")
        this.endereco = new Endereco
        this.cep = ""
        console.log(res)
      },
      err => {
        console.log(err)
      })
  }

}
