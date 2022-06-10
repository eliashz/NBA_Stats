/**
 * Trasnsforma el peso de libras a kilos
 * y la altura de pies y pulgadas a metros y centrímetros
 * 
 */

const poundsToKg = (weight) => {
    if (weight === null) {return '-'};
    return parseInt(weight * 0.453592) + ' kg';
}

const inchesToCm = (feet, inch) => {
    if (feet === null) {return '-'};
    return parseInt(feet * 30.48 + inch * 2.54) + ' cm';
}

export { poundsToKg, inchesToCm}