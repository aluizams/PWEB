/*Operacoes da Atividade 6*/

var numero1;
var numero2;

var sub;
var mult;
var div;
var resto;

numero1 = parseFloat(prompt('Digite um numero inteiro: '));
numero2 = parseFloat(prompt('Digite outro numero inteiro: '));

sub = numero1 - numero2;
mult = numero1 * numero2;
div = numero1 / numero2;
resto = numero1 % numero2; 

alert("Subtração do segundo numero do primeiro: " + sub);
alert("Multiplicação dos numeros: " + mult);
alert("Divisão do primeiro numero pelo segundo: " + div);
alert("Resto da divisão inteira: " + resto);