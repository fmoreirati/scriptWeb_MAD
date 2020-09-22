import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../model/endereco';
import { Usuario } from '../model/usuario';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

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
    public auth: AngularFireAuth
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
    let user: Usuario = new Usuario;
    this.getUser(iduser).subscribe(
      res => {
        user = res
      }
    )
    //user.endereco.push(endereco);
    //return this.http.patch(this.localURL + this.colletionUser + "/" + iduser, user);
    //return this.firedb.collection("endereco").add(endereco).then(
    //   res => {
    //     let novoEndereco:any = [{ id: res.id , numero: endereco.numero, complemento: endereco.complementos }]
    //     return this.firedb.collection(this.colletionUser).doc(iduser).update({endereco : novoEndereco});
    //   }
    // )
    return this.firedb.collection(this.colletionUser).doc(iduser).collection("endereco").add(endereco);

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
            endereco: usuario.endereco = [],
          }
        ).catch(
          err => {
            this.auth.currentUser.then(
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

}