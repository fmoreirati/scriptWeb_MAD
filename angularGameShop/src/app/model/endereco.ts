export class Endereco {
    id: string;
    bairro:string;
    cep: string;
    complemento: string;
    //ddd: string;
    //gia: string;
    //ibge:string;
    localidade: string;
    logradouro: string;
    //siafi: string;
    uf: string;

    numero:string;
    complementos:string;

    tipo:string; //Nome dado ao endereço

    erro:boolean = false;
}
