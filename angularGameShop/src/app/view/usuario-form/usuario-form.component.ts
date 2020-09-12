import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  public usuario:Usuario = new Usuario;
  public conf:string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
