
function maiorNumero(num1, num2, num3) {
    return Math.max(num1, num2, num3);
}



function ordemCrescente(num1, num2, num3) {
    let numeros = [num1, num2, num3];
    let n = numeros.length;

    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (numeros[j] > numeros[j + 1]) {
                
                let temp = numeros[j];
                numeros[j] = numeros[j + 1];
                numeros[j + 1] = temp;
            }
        }
    }
    
    return numeros;
}


function isPalindromo(str) {
    const strMaiuscula = str.toUpperCase();
    const strInvertida = strMaiuscula.split('').reverse().join('');
    return strMaiuscula === strInvertida;
}


function tipoTriangulo(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        if (a === b && b === c) {
            return "Triângulo Equilátero";
        } else if (a === b || b === c || a === c) {
            return "Triângulo Isósceles";
        } else {
            return "Triângulo Escaleno";
        }
    } else {
        return "Os valores não formam um triângulo";
    }
}
