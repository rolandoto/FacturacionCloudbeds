function calcularDV(cedula) {
    // Validar que la cédula sea un número entero positivo válido
    if (!cedula || !Number.isInteger(Number(cedula)) || Number(cedula) <= 0) {
        return 0; // Retornar 0 si la cédula no es válida
    }

    // Secuencia de multiplicación
    const secuencia = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43];
    let suma = 0;

    // Convertir la cédula a string, revertirla y calcular la suma ponderada
    const cedulaStr = String(cedula).split('').reverse();

    for (let i = 0; i < cedulaStr.length; i++) {
        suma += Number(cedulaStr[i]) * secuencia[i % secuencia.length];
    }

    // Calcular el dígito de verificación
    const residuo = suma % 11;
    const dv = residuo > 1 ? 11 - residuo : 0;

    return dv;
}

export default calcularDV;
