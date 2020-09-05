
var app = angular.module("myApp", ['ngSanitize']);

app.controller("myCtrl", function ($scope) {
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
    $scope.aviso = "";
    $scope.alunos = [];

    $scope.resultado = function () {
        var result = "";
       texto = "";
        if ($scope.optativa >= 6) {
            if ($scope.nota1 < 6) {
                $scope.nota1 = $scope.optativa;
            } else if (nota2 < 6) {
                $scope.nota2 = $scope.optativa;
            }
        }
        var aluno = new Aluno($scope.nome, $scope.nota1, $scope.nota2, $scope.optativa, result);
        var mediaSementre = aluno.media;
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
        aluno.resultado = result;
        addAluno(aluno, texto);

        $scope.aviso = texto;
    };

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

    //CRUD -----------

    function addAluno(aluno, texto) {
        if (valida()) {
            $scope.alunos.push(aluno);
            document.forms[0].reset();
            console.log( $scope.alunos);
        }
        //console.log(document.getElementsByTagName('p'));
    }

     $scope.removeAluno= function(index) {
        $scope.alunos.splice(index, 1);
        console.log( $scope.alunos);
    }

});