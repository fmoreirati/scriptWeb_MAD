import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../model/endereco';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
  ) { }

  getEndereco(cep: string) {
    return this.http.get<Endereco>("http://viacep.com.br/ws/" + cep + "/json/")

  }

}