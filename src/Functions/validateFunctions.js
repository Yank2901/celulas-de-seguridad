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
  
  export function validateName(name) {
    // Verificar que el nombre no esté vacío
    if (name.trim() === '') {
      return false;
    }
  
    // Verificar que el nombre no contenga caracteres especiales o números
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return false;
    }
  
    // Si todos los criterios son cumplidos, el nombre es válido
    return true;
  }

  export function validateLastName(lastName) {
    // Verificar que el apellido no esté vacío
    if (lastName.trim() === '') {
      return false;
    }
  
    // Verificar que el apellido no contenga caracteres especiales o números, excepto espacios en blanco
    if (!/^[a-zA-Z\s]+$/.test(lastName)) {
      return false;
    }
  
    // Si todos los criterios son cumplidos, el apellido es válido
    return true;
  }
  
  export function validateEmail(email) {
    // Verificar que el correo electrónico no esté vacío
    if (email.trim() === '') {
      return false;
    }
  
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Verificar si el correo electrónico cumple con el formato válido
    if (!emailRegex.test(email)) {
      return false;
    }
  
    // Si todos los criterios son cumplidos, el correo electrónico es válido
    return true;
  }

  export function generateUniqueColors(numColors) {
    const uniqueColors = [];
    const letters = "0123456789ABCDEF";
  
    while (uniqueColors.length < numColors) {
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      
      if (!uniqueColors.includes(color)) {
        uniqueColors.push(color);
      }
    }
  
    return uniqueColors;
  }
  