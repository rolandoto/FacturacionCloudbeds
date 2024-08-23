import React, { useContext, useEffect } from  "react"
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbBed } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useCloubesActions from "../../Actions/useCloubesActions";
import { useSelector } from "react-redux";
import  AutoProvider  from "../../UseContext.js/Autoprovider";

const Header =()  =>{

    const {getHotelCloubeds} =useCloubesActions()
    const {jwt,setJwt} = useContext(AutoProvider)
    const {loadingGetHotelCloubeds,errorgetHotelCloubeds,HotelCloubeds
    } =useSelector((state) => state.Cloubeds)
    const navigate = useNavigate();

    const handExit =() =>{
        localStorage.removeItem('jwt')
        localStorage.removeItem('tokenDian')
        setJwt(null)
        navigate("/")  
    }

    const goToCalendar = () => {
        navigate(`/connect/${jwt?.result?.propertyID}#/calendar`);
    };

    const fetData =async() =>{
        await getHotelCloubeds({token:jwt?.result?.TokenCloubeds,propertyID:jwt?.result?.propertyID})
    }

    useEffect(() =>{
        fetData()
    },[])

    const fillContent =()=>{
        if(loadingGetHotelCloubeds){
          return <p>Cargando</p>
        }
        if(errorgetHotelCloubeds){
          return <p>Error </p>
      }

      return <>
      
                <div className="flex bg-white items-center">
                    <button className="mr-4 p-2">
                    <RxHamburgerMenu  fontSize={25} />
                    </button>
                    <div className="flex items-center">
                    <img
                       src={HotelCloubeds?.propertyImage?.[0]?.image || 'default-image-url.jpg'}
                        alt="Hotel"
                        className="w-10 h-10 rounded-full mr-2"
                    />
                    <span className="font-semibold">{HotelCloubeds?.propertyType} {HotelCloubeds?.propertyName} </span>
                    </div>
                </div>
                <div className="flex items-center flex-grow max-w-lg mx-auto">
                    <input
                    type="text"
                    placeholder="Buscar reservas, huéspedes y más"
                    className="w-full p-2 border rounded-lg"
                    />
                </div>
                {/* Iconos y botones a la derecha */}
                <div className="flex items-center">
                    <button className="mr-4 p-2">
                        <IoIosAddCircle color="#3366ff" fontSize={25} />
                    </button>
                    <button className="mr-4 p-2"  onClick={goToCalendar} > 
                        <FaRegCalendarAlt fontSize={18} />
                    </button>
                    <button className="mr-4 p-2">
                        <TbBed fontSize={25} />
                    </button>
                    <button className="mr-4 p-2" onClick={handExit}>
                        <IoExitOutline fontSize={25} />
                    </button>
                </div>
           </> 
    }

    return <>{fillContent()}</>

}
export default Header