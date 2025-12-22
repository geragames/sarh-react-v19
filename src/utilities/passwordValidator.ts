export const validatePassword = (password: string): string | null => {
    if(password.length < 8) {
        return "La nueva contraseña debe tener al menos 8 caracteres";
    }
    if(!/[A-Z]/.test(password)){
        return "Debe tener al menos una letra mayuscula";
    }
    if(!/[a-z]/.test(password)){
        return "Debe tener al menos una letra muniscula";
    }
    if(!/[0-9]/.test(password)){
        return "Debe tener al menos un numero";
    }

    return null;
}