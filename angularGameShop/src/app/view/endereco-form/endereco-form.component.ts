import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Endereco } from 'src/app/model/endereco';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css']
})
export class EnderecoFormComponent implements OnChanges {
  @Input() public idUser: string;
  @Input() public idEndereco: string;
  @Output() mandaAtualizarListaEndereco = new EventEmitter();

  public endereco: Endereco = new Endereco;
  public cep: string = "";
  public numero: string = "";
  public complementoLocal: string = "";

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if (this.idEndereco) {
      this.usuarioService.getOneEndereco(this.idEndereco, this.idUser).subscribe(
        res => {
          this.endereco = res
          this.endereco.id = this.idEndereco
          this.cep = this.endereco.cep
        }
      )
    }
  }

  buscaCEP() {
    this.usuarioService.getEndereco(this.cep).subscribe(
      res => {
        this.endereco = res;
        this.cep = this.endereco.cep;
        console.log("Endereco ViaCEP:", res);
        if (res.erro) {
          alert("Endereço não localizado!");
        } else {
          this.mandaAtualizarListaEndereco.emit(res);
        };
      },
      err => {
        console.error(err);
        alert("Não foi possivel fazer a busca do CEP!");
      }
    )
    this.idEndereco = "";
  }

  salvarEndereco() {
    if (this.idEndereco) {
      this.updateEndereco()
    } else {
      this.addEndereco()
    }
    this.mandaAtualizarListaEndereco.emit();
  }


  addEndereco() {
    this.usuarioService.addEndereco(this.endereco, this.idUser).then(
      res => {
        alert("Adicionado");
        this.endereco = new Endereco;
        this.cep = ""
        //console.log(res);
      },
      err => {
        console.log(err);
      });
  }

  updateEndereco() {
    this.usuarioService.updateEndereco(this.endereco, this.idUser).then(
      res => {
        alert("Atualiazado");
        this.endereco = new Endereco;
        this.cep = ""
        this.idEndereco = "";
        //console.log(res);
      },
      err => {
        console.log(err);
      });
  }

}
