import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.css']
})
export class PageNavComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    public auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.usuarioService.auth.signOut().then(
      res => {
        this.router.navigate(["/"])
        console.log(res);
      },
      err => console.log(err)
    )
  };

}
