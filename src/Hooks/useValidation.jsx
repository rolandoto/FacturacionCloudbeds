import { useCallback } from 'react';

const useValidation = () => {
  const validate = useCallback((values) => {
    const errors = {};
    
    if (!values.username) errors.username = 'Nombre es requerido';
    if (!values.passaword) errors.passaword = 'Contraseña es requerido';
    if (!values.userTypeHotel) errors.userTypeHotel = 'Hotel es requerido';
    return errors;
  }, []);

  return validate;
};

export default useValidation;