import React from  "react"
import { motion } from 'framer-motion';

const StepOne =({currentStep,
                animationDirection,
                containerVariants,
                handleSubmit,
                formErrors,
                formValues,
                setCurrentStep,
                handleChange,
                filteredCities,
                dv,
                searchTerm,
                handleChangeCity,
                showDropdown,
                handleCityClick,
                loadingRegisterCloubesd,
                document}) =>{

    return <>
     <div className="mb-4 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4">
          <h2 className="font-medium text-lg text-gray-900">
            1. Datos personales
          </h2>
          <motion.div
            key={`step-1-${currentStep}`}
            custom={animationDirection}
            initial="hidden"
            animate={currentStep === 1 ? "visible" : "visible"}
            exit="exit"
            variants={containerVariants}
          >
            {currentStep === 1 ? (
              <div className="mt-4">
                <div className="bg-white rounded-lg">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Tipo documento</label>
                        {formErrors.tipoDocument && <p className="text-red-500 text-xs">{formErrors.tipoDocument}</p>}
                        <select
                          name="tipoDocument"
                          value={formValues.tipoDocument}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value=""></option>
                          {document?.map((category) => (
                            <option value={category.ID} key={category.ID}>{category.nombre}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Nombre / Nombre empresa</label>
                        {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
                        <input type="text" name="name" value={formValues.name} onChange={handleChange} className="w-full p-2 border rounded-md" />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Apellido / Nombre empresa</label>
                        {formErrors.lastname && <p className="text-red-500 text-xs">{formErrors.lastname}</p>}
                        <input type="text" name="lastname" value={formValues.lastname} onChange={handleChange} className="w-full p-2 border rounded-md" />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Documento / NIT</label>
                        {formErrors.document && <p className="text-red-500 text-xs">{formErrors.document}</p>}
                        <input type="text" name="document" value={formValues.document} onChange={handleChange} className="w-full p-2 border rounded-md" />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">DV</label>
                        <input type="number" name="div" value={dv} disabled className="w-full p-2 border rounded-md bg-gray-100" />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Correo electrónico</label>
                        {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
                        <input type="email" name="email" value={formValues.email} onChange={handleChange} className="w-full p-2 border rounded-md" />
                      </div>

                      <div className="relative">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Ciudad</label>
                        {formErrors.city && <p className="text-red-500 text-xs">{formErrors.city}</p>}
                        <input type="text" value={searchTerm} onChange={handleChangeCity} className="w-full p-2 border rounded-md" />
                        {showDropdown && filteredCities.length > 0 && (
                          <ul className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                            {filteredCities.map(category => (
                              <li key={category.ID} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleCityClick(category)}>
                                {category.Country} - {category.City}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Dirección</label>
                        <input type="text" name="address" value={formValues.address} onChange={handleChange} className="w-full p-2 border rounded-md" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-black transition"
                      >
                        {loadingRegisterCloubesd ? "Cargando..." : "Guardar y Continuar"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center mt-2">
                <div>
                  <span className="text-sm text-gray-600">
                    {formValues.name} {formValues.lastname} • {formValues.email}
                  </span>
                </div>
                <button 
                  className="px-4 py-1 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition"
                  onClick={() => setCurrentStep(1)}
                >
                  Cambiar
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
        </>

}


export default StepOne