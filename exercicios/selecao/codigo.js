
function media(nota1, nota2) {
    return (parseFloat(nota1) + parseFloat(nota2)) / 2;
}

function resultado(nota1, nota2, optativa = -1) {
    if (optativa >= 6) {
        if (nota1 < 6) {
            nota1 = optativa;
        } else if (nota2 < 6) {
            nota2 = optativa;
        }
    }
    var mediaSementre = media(nota1, nota2);
    if (mediaSementre >= 6) {
        saida("<p class= 'alert alert-success'> APROVADO! Sua media: " + mediaSementre.toFixed(2) + "</p>");
    } else if (mediaSementre < 3) {
        saida("<p class= 'alert alert-danger'> REPROVADO! Sua media: " + mediaSementre.toFixed(2) + "</p>");
    } else {
        saida("<p class= 'alert alert-warning'> Em EXAME! Sua media: " + mediaSementre.toFixed(2) + "</p>");
    }
}

function saida(texto) {
    document.getElementById("saidaTexto").innerHTML = texto;

}
