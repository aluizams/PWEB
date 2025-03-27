/*Atividade 6 - chamada de notas */

var nome;
var nota1;
var nota2;
var nota3;
var nota4;
var media;

nome = prompt('Qual o seu nome?');
nota1 = prompt('Digite a Primeira nota:');
nota2 = prompt('Digite a Segunda nota:');
nota3 = prompt('Digite a Terceira nota:');
nota4 = prompt('Digite a Quarta nota:');

media = ( parseFloat(nota1)+parseFloat(nota2)+parseFloat(nota3)+parseFloat(nota4))/4; 

alert("Media Final do Aluno " +nome +" nesse Semestre " + media);