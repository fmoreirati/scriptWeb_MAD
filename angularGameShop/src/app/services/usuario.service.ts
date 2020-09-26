import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../model/endereco';
import { Usuario } from '../model/usuario';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //localURL -> "http://localhost:3000/"
  private localURL = environment.apidados;
  private colletionUser = "usuario"

  constructor(
    private http: HttpClient,
    private firedb: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router
  ) { }

  // ViaCEP e Endereco -----------------------------------------------
  getEndereco(cep: string) {
    return this.http.get<Endereco>("http://viacep.com.br/ws/" + cep + "/json/")
  }

  getAllEndereco(id) {
    //return this.firedb.collection(this.colletionUser).doc(id).collection("endereco").valueChanges();
    return this.firedb.collection(this.colletionUser).doc(id).collection("endereco").snapshotChanges().
      pipe(
        map(
          actions => actions.map(a => {
            const data = a.payload.doc.data() as Endereco;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
  }

  addEndereco(endereco: Endereco, iduser) {
    //let user: Usuario = new Usuario;
    // this.getUser(iduser).subscribe(
    //   res => {
    //     user = res
    //   }
    // )
    //user.endereco.push(endereco);
    //return this.http.patch(this.localURL + this.colletionUser + "/" + iduser, user);
    //return this.firedb.collection("endereco").add(endereco).then(
    //   res => {
    //     let novoEndereco:any = [{ id: res.id , numero: endereco.numero, complemento: endereco.complementos }]
    //     return this.firedb.collection(this.colletionUser).doc(iduser).update({endereco : novoEndereco});
    //   }
    // )
    return this.firedb.collection(this.colletionUser).doc(iduser).collection("endereco").add(
      {
        //id: endereco.id,
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        localidade: endereco.localidade,
        uf: endereco.uf,
        complemento: endereco.complemento = "",
        numero: endereco.numero = "",
        complementos: endereco.complementos = "",
        tipo: endereco.tipo = ""
      }
    );

  }

  definirPrincipal(keyUser, keyEndereco) {
    return this.firedb.collection(this.colletionUser).doc(keyUser).update(
      {
        enderecoPrincipal: keyEndereco
      }
    )
  }

  getOneEndereco(idEndereco, idUsuario) {
    return this.firedb.collection(this.colletionUser).doc(idUsuario).collection("endereco").doc<Endereco>(idEndereco).valueChanges();
  }

  updateEndereco(endereco: Endereco, idUsuario) {
    return this.firedb.collection(this.colletionUser).doc(idUsuario).collection("endereco").doc<Endereco>(endereco.id).update(endereco);
  }

  removerEndereco(idEndereco, idUsuario){
    return this.firedb.collection(this.colletionUser).doc(idUsuario).collection("endereco").doc(idEndereco).delete();
  }

  // Usuarios -----------------------------------------------
  addUser(usuario: Usuario) {
    //return this.http.post<Usuario>(this.localURL + this.colletionUser, usuario);
    return this.auth.createUserWithEmailAndPassword(usuario.email, usuario.pws).then(
      resAuth => {
        return this.firedb.collection(this.colletionUser).doc(resAuth.user.uid).set(
          {
            nome: usuario.nome,
            email: usuario.email,
            tel: usuario.tel,
            ativo: usuario.ativo,
            foto: usuario.foto = "",
            //pws: usuario.pws,
            enderecoPrincipal: usuario.enderecoPrincipal = "",
            endereco: usuario.endereco = [],
          }
        ).catch(
          err => {
            this.auth.user.subscribe(
              res => {
                res.delete
                console.log(err)
              }
            )
          }
        )
      })
  }

  getUser(id) {
    //return this.http.get<Usuario>(this.localURL + this.colletionUser + "/" + id);
    return this.firedb.collection(this.colletionUser).doc<Usuario>(id).valueChanges();
  }

  getAll() {
    return this.firedb.collection(this.colletionUser).snapshotChanges().
      pipe(
        map(
          actions => actions.map(a => {
            const data = a.payload.doc.data() as Usuario;
            const end = a.payload.doc.get("endereco");
            const id = a.payload.doc.id;
            return { id, ...data, end };
          })
        )
      )
  }

  logout() {
    this.auth.signOut().then(
      res => {
        this.router.navigate(["/"])
        console.log(res);
      },
      err => console.log(err)
    )
  };

}