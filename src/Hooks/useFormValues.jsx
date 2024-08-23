import { useState } from 'react';

const useFormValues = () => {

  const [formValues, setFormValues] = useState({
    username: '',
    passaword: '',
    userTypeHotel:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target
      setFormValues({ ...formValues, [name]: value });
  };

  return [formValues, handleChange];
};

export default useFormValues;