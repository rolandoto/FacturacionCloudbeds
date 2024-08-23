import React, { useEffect, useState } from 'react';
import UseUsers from "../Hooks/UseUsers";
import {useNavigate } from 'react-router-dom';
import useListHotel from '../Actions/useListHotel';
import { useSelector } from 'react-redux';
import useFormValues from '../Hooks/useFormValues';
import useValidation from '../Hooks/useValidation';

const Login =() =>{
  const {getHotelList} = useListHotel()
  const {HotelList,loadingHotelListo,errorHotelList
  } =useSelector((state) => state.listHotel)
  const [formErrors, setFormErrors] = useState({});
  const [formValues, handleChange] = useFormValues();
  const { login, isLogin, isLoading,isError } = UseUsers();
  const validate = useValidation();
  const navigate = useNavigate();

  useEffect(() =>{
    if(isLogin){
      navigate("/dashboard");
    }
},[isLogin])

  const FechDate =async() =>{
    await getHotelList()
  }

  useEffect(() =>{
    FechDate()
  },[])



  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0){
      login({username:formValues.username,password:formValues.passaword,hotel:formValues.userTypeHotel})
    }
    //login({ username: email, password }); // puedes incluir `password` y otros datos si es necesario
  };

  const fillContent =()=>{
    if(loadingHotelListo){
      return <p>Cargandog</p>
    }
    if(errorHotelList){
      return <p>Error </p>
  }

  return <>
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto"
            src="https://hotels.cloudbeds.com/assets/home/images/cloudbeds_nebula_logo.png"
            alt="Cloudbeds Logo"
          />
          <h2 className="mt-6 text-center text-1xl font-extrabold text-gray-900">
            Ingresar a su cuenta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input

                type="text"
                autoComplete="Nombre"
     
                name="username"
                value={formValues.username}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Usuario"
              />
                   {formErrors.username && <p className="text-red-500 text-xs">{formErrors.username}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                type='password'
                autoComplete="current-password"
                name="passaword"
                value={formValues.passaword}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
              {formErrors.passaword && <p className="text-red-500 text-xs">{formErrors.passaword}</p>}
            </div>
          </div>
          
          {/* Select dropdown */}
          <div>
            <label htmlFor="user-type" className="sr-only">Tipo de usuario</label>
            <select
              id="user-type"
              name="userTypeHotel"
              value={formValues.userTypeHotel}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
                <option value="" disabled>Seleccione tipo de usuario</option>
              {HotelList.map((itemHotel)  =>((
                    <option value={itemHotel.id_hotel}>{itemHotel.nombre}</option>  
              )))}
         
            </select>
            {formErrors.userTypeHotel && <p className="text-red-500 text-xs">{formErrors.userTypeHotel}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white hover:bg-[#32c0a0] focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#32c0a0]"
            >
              Iniciar sesión
            </button>
          </div>
          {isError && <p className="text-red-500 text-xs">Error de contraseña o usuario</p>}
        </form>
        <p className="mt-6 text-center text-gray-500 text-xs">
          Con tecnología de Cloudbeds
        </p>       
        {isLoading  ? <h1>cargando</h1> : <span>iniciar sesión</span>}
      </div>
    </div>
      </>

  }

    return (<>{fillContent()} </>)
}   

export default  Login