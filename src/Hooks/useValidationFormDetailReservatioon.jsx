import { useCallback } from 'react';

const useValidationFormDetailReservatioon = () => {
  const validate = useCallback((values) => {
    const errors = {};
    
    if (!values.tipoDocument) errors.tipoDocument = 'Tipo de documento es requerido';
    if (!values.name) errors.name = 'Nombre es requerido';
    if (!values.lastname) errors.lastname = 'Apellido es requerido';
    if (!values.document) errors.document = 'Documento es requerido';
    if (!values.email) {
        errors.email = 'Email es requerido';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email no es válido';
    }
    if(!values.city) errors.city = 'Ciudad requerido';
    
    return errors;
  }, []);

  return validate;
};

export default useValidationFormDetailReservatioon;