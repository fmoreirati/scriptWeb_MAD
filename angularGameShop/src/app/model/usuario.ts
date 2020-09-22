import { Endereco } from './endereco';

export class Usuario {
    id:string;
    nome: string;
    email: string;
    pws: string; //Senha
    tel: string;
    foto: string;
    ativo: boolean = true;
    //apagado:boolean= true;
    //status:number = 1;

    endereco: Endereco[] = [];
}
/* tipos de status: 1 = normal; 2 = bloqueado */
