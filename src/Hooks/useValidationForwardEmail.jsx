import { useCallback } from 'react';

const useValidationForwardEmail = () => {
  const validate = useCallback((values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Email es requerido';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email no es válido';
      }
    return errors;
  }, []);

  return validate;
};

export default useValidationForwardEmail;