import React from "react"
import { motion } from 'framer-motion';
import { FaCheck, FaRegSquare } from "react-icons/fa";
const StepTwo =({currentStep,
  animationDirection,
  containerVariants,
  setCurrentStep,
  numberWithCommas,
  generalValue,
  setGeneralValue,
  handleCheckboxChange,
  checkboxes,
  prevStep,
  confirmPolicy}) =>{

return <>

<div className="mb-4 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4">
          <h2 className="font-medium text-lg text-gray-900">
            2. Elegir produtos
          </h2>
          <motion.div
            key={`step-2-${currentStep}`}
            custom={animationDirection}
            initial="hidden"
            animate={currentStep >= 2 ? "visible" : "visible"}
            exit="exit"
            variants={containerVariants}
            >
      {currentStep === 2 ? (
        <div className="mt-3">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Valor General</label>
            <input
              type="text"
              value={generalValue !== '' ? numberWithCommas(generalValue) : ''}
              onChange={(e) => setGeneralValue(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingrese un valor general"
            />
          </div>

          {["iva", "retencion","retencion_agencias"].map((item) => (
            <div key={item} className="flex items-center mb-2">
              <div onClick={() => handleCheckboxChange(item)} className="cursor-pointer">
                {checkboxes[item].checked ? (
                  <FaCheck className="text-blue-500 text-xl" />
                ) : (
                  <FaRegSquare className="text-gray-500 text-xl" />
                )}
              </div>
              <span className="ml-2 text-sm text-blue-600 capitalize">{item}</span>
             
            </div>
          ))}

          <div className="mt-4 flex justify-between">
            <button 
              className="border border-gray-300 px-6 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              onClick={prevStep}
            >
              Volver
            </button>
            <button 
              className="bg-black text-white px-6 py-2 rounded-lg font-medium transform transition hover:scale-105"
              onClick={confirmPolicy}
            >
              Siguiente
            </button>
          </div>
        </div>
      ) : currentStep === 3 ? (
        <div className="flex justify-between items-center mt-2">
          <div>${numberWithCommas(generalValue)}</div>
          <button 
            className="px-4 py-1 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition"
            onClick={() => setCurrentStep(2)}
          >
            Cambiar
          </button>
        </div>
      ) : null}
    </motion.div>
        </div>
      </div>

</>

}

export default StepTwo