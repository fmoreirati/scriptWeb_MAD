import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../model/endereco';
import { Usuario } from '../model/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // localURL -> "http://localhost:3000/"
  private localURL = environment.apidados;
  private colletionUser = "usuario"

  constructor(
    private http: HttpClient,
  ) { }

  getEndereco(cep: string) {
    return this.http.get<Endereco>("http://viacep.com.br/ws/" + cep + "/json/")

  }

  addEndereco(endereco: Endereco, iduser) {
    let user: Usuario = new Usuario;
    this.getUser(iduser).subscribe(
      res => {
        user = res
      }
    )
    console.log(user);
    user.endereco.push(endereco);
    console.log(user);
    return this.http.patch(this.localURL + this.colletionUser + "/" + iduser, user);
  }

  addUser(usuario: Usuario) {
    return this.http.post<Usuario>(this.localURL + this.colletionUser, usuario);
  }

  getUser(id) {
    return this.http.get<Usuario>(this.localURL + this.colletionUser + "/" + id);
  }

}