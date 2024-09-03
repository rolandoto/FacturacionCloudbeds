import { useState } from 'react';

const useFormValuesForwardEmail = () => {

  const [formValues, setFormValues] = useState({
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target
      setFormValues({ ...formValues, [name]: value });
  };

  return [formValues, handleChange];
};

export default useFormValuesForwardEmail;