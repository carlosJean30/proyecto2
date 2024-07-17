// src/utils/validationUtils.ts
export const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password: string) => password.length >= 3 && password.length <= 10;

export const validateName = (name: string) => /^[A-Za-z\sáéíóúÁÉÍÓÚ]{4,15}$/.test(name);

export const validateCedula = (cedula: string) => /^\d{10}$/.test(cedula);

export const validatePhone = (phone: string) => /^\d{10}$/.test(phone);
