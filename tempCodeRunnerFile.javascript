function getOnlyNumbersFromString(string) {
    return string.replace(/\D/g, "");
}

console.log(getOnlyNumbersFromString("123hola123"))