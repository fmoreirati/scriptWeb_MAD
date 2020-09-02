
class Aluno {
    constructor(nome, nota1, nota2, optativa, result) {
        this.nome = nome;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.optativa = optativa;
        this.resultado = result;
        this.media = this.media();
    }

    media() {
        return (parseFloat(this.nota1) + parseFloat(this.nota2)) / 2;
    }
}

var alunos = [];

function media(nota1, nota2) {
    return (parseFloat(nota1) + parseFloat(nota2)) / 2;
}


function resultado(nome, nota1, nota2, optativa = -1) {
    var result = "";
    var texto = "";
    if (optativa >= 6) {
        if (nota1 < 6) {
            nota1 = optativa;
        } else if (nota2 < 6) {
            nota2 = optativa;
        }
    }
    var mediaSementre = media(nota1, nota2);
    if (mediaSementre >= 6) {
        texto = ("<p class= 'alert alert-success'> APROVADO! Sua media: " + mediaSementre.toFixed(2) + "</p>");
        result = "Aprovado";
    } else if (mediaSementre < 3) {
        texto = ("<p class= 'alert alert-danger'> REPROVADO! Sua media: " + mediaSementre.toFixed(2) + "</p>");
        result = "Reprovado";
    } else {
        texto = ("<p class= 'alert alert-warning'> Em EXAME! Sua media: " + mediaSementre.toFixed(2) + "</p>");
        result = "Exame";
    }
    var aluno = new Aluno(nome, nota1, nota2, optativa, result);
    addAluno(aluno, texto);
}


function saida(texto) {
    document.getElementById("saidaTexto").innerHTML = texto;
}

function valida() {
    var elementos = document.getElementsByClassName("require");
    var status = true;
    for (var element of elementos) {
        //console.log(element.value);
        if (element.value == "") {
            element.style = "border: solid 2px #f00";
            status = false;
        } else {
            element.style = "";
        }
    }
    return status;
}

function mostraTabela(){
    var tabela = "<table class='table'>";

    tabela += "<tr> <th> Nome </th> <th> Nota 1 </th> <th> Nota 2 </th> <th> Média </th> <th> Resultado </th><th> X </th> </tr>";

    //for (var aluno of alunos) {
    for (var index = 0; index < alunos.length; index++) {
        tabela += "<tr> <td> "+ alunos[index].nome + "</td> <td> " + parseFloat(alunos[index].nota1).toFixed(2) + "</td> <td> "+ parseFloat(alunos[index].nota2).toFixed(2) + "</td> <td>" + parseFloat(alunos[index].media).toFixed(2) + " </td> <td> " + alunos[index].resultado +" </td><td onclick='removeAluno("+index+")'  style='cursor:pointer'> X </td> </tr>";
    }

    tabela += "</table>";

    document.getElementById("saidaTabela").innerHTML =  tabela;
}

//CRUD -----------

function addAluno(aluno, texto) {
    if (valida()) {
        alunos.push(aluno);
        document.forms[0].reset();
        console.log(alunos);
        saida(texto)
        mostraTabela();
    }
    //console.log(document.getElementsByTagName('p'));
}

function removeAluno(index){
    alunos.splice(index, 1);
    console.log(alunos);
    mostraTabela();

}