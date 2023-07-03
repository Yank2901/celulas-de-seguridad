export function validateId (id) {
  // Verificar si el valor tiene 10 dígitos
  if (id.length !== 10) {
    return false;
  }

  // Obtener los primeros dos dígitos correspondientes a la provincia
  const provincia = id.substring(0, 2);

  // Verificar si los primeros dos dígitos son válidos
  if (provincia < "01" || provincia > "24") {
    return false;
  }

  // Verificar el tercer dígito
  const tercerDigito = id.charAt(2);
  if (tercerDigito < "0" || tercerDigito > "5") {
    return false;
  }

  // Aplicar el algoritmo de verificación del décimo dígito
  const verificador = id.charAt(9);
  const sumaTotal = id
    .substring(0, 9)
    .split("")
    .map(Number)
    .reduce((sum, digit, index) => {
      if (index % 2 === 0) {
        let multiplied = digit * 2;
        if (multiplied > 9) {
          multiplied -= 9;
        }
        sum += multiplied;
      } else {
        sum += digit;
      }
      return sum;
    }, 0);

  const modulo = sumaTotal % 10;
  const calculado = modulo === 0 ? 0 : 10 - modulo;

  return Number(verificador) === calculado;
}

export function validatePassword (password) {
    // Verificar la longitud mínima de la cédula
    if (password.length < 8) {
      return false;
    }
  
    // Verificar al menos un número
    if (!/\d/.test(password)) {
      return false;
    }
  
    // Verificar al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // Verificar al menos una letra minúscula
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    // Verificar al menos un caracter especial
    if (!/[-!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return false;
    }
  
    // Si todos los criterios son cumplidos, la cédula es válida
    return true;
  }
  