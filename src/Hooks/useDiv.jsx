function calcularDV(cedula) {
    // Verificar si la cédula está vacía o no es un número válido
    if (!cedula || isNaN(parseInt(cedula))) {
        return 0; // Retornar 0 si la cédula no está definida o no es válida
    }

    // Secuencia de multiplicación
    const secuencia = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43];
    let suma = 0;

    // Convertir la cédula a string y revertirla
    const cedulaStr = cedula.toString().split('').reverse().join('');

    // Multiplicar cada dígito por el número correspondiente en la secuencia
    for (let i = 0; i < cedulaStr.length; i++) {
        suma += parseInt(cedulaStr[i]) * secuencia[i % secuencia.length];
    }

    // Calcular el residuo de la suma dividida por 11
    const residuo = suma % 11;

    // Restar el residuo de 11 para obtener el dígito de verificación
    const dv = 11 - residuo;

    // Si el resultado es 10 o mayor, el dígito de verificación es 0
    return dv >= 10 ? 0 : dv;
}


export default  calcularDV