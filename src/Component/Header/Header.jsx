import React, { useCallback, useContext, useEffect, useState } from  "react"
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbBed } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useCloubesActions from "../../Actions/useCloubesActions";
import { useSelector } from "react-redux";
import  AutoProvider  from "../../UseContext.js/Autoprovider";
import { FaRegCreditCard } from "react-icons/fa6";
import { useDebounce } from "use-debounce";
import { Spinner } from "@nextui-org/react";
import { FaDollarSign } from "react-icons/fa";
import { MdOutlinePriceChange } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";

const Header =()  =>{

    const {getHotelCloubeds,getReservationCloubeds} =useCloubesActions()
    const {jwt,setJwt} = useContext(AutoProvider)
    const {HotelCloubedsReservation,loadingReservationCloubeds,errorgetReservationcloubeds,loadingGetHotelCloubeds,errorgetHotelCloubeds,HotelCloubeds
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


    const goToDashboard = () => {
        navigate(`/dashboard`);
    };

    const goToPrice = () => {
        navigate(`/Price`);
    };


    const goToInvoinceRelax = () => {
        navigate(`/InvoinceRelax`);
    };
    
    const fetData =async() =>{
        await getHotelCloubeds({token:jwt?.result?.TokenCloubeds,propertyID:jwt?.result?.propertyID})
    }

    useEffect(() =>{
        fetData()
    },[])

    const [showContextMenu, setShowContextMenu] = useState(false);

    const [searchTerm, setSearchTerm] = useState();
    const [debouncedSearchTerm] = useDebounce(searchTerm, 200); // 500ms de retraso
  
    const fetchSearchResults = useCallback(async () => {
      try {
        if (debouncedSearchTerm) {
        await getReservationCloubeds({token:jwt?.result?.TokenCloubeds,propertyID:jwt?.result?.propertyID,search:debouncedSearchTerm})
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }, [debouncedSearchTerm]); // Dependencia para el useCallback
    

  
    const handleChange = useCallback((event) => {
        const { value } = event.target;
        setSearchTerm(value);
        setShowContextMenu(value.trim() !== '');
      }, []); 

    useEffect(() => {
        fetchSearchResults();
      }, [fetchSearchResults]); // Ejecutar el efecto cuando fetchSearchResults cambie
    

      const handleNextReservation = (reservationID) => {
        if (!reservationID) {
            console.error('Reservation ID is missing');
            return;
        }
        setShowContextMenu(false)
        navigate(`/reservation/${reservationID}`);
    };  

   
    const fillContent =()=>{
        if(loadingGetHotelCloubeds){
          return <p>Cargando</p>
        }
        if(errorgetHotelCloubeds){
          return <p>Error </p>
      }

      return <>
      
                <div className="flex  items-center">
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
                    onChange={handleChange}
                    placeholder="Buscar reservas, huéspedes y más"
                    className="w-[40%] bg-white text-black  left-0 m-auto right-0 absolute  p-2  rounded-lg"
                    />
                
                    {showContextMenu && 
                    <div className="styled-context-menu-search" >
                        {loadingReservationCloubeds  ? <Spinner  /> : <>
                            {HotelCloubedsReservation.map((item) => {
                                return (
                                    <div  key={item.propertyID} onClick={() => handleNextReservation(item.reservationID)} className="styled-menu-item flex justify-between  items-center space-x-2 p-2">
                                    <span className="flex-shrink-0 w-1/3 truncate">{item.guestName}</span>
                                    <div className="flex items-center space-x-2 w-2/3 justify-end">
                                        <span className="truncate">{item.startDate} a {item.endDate}</span>
                                        <span className={`${item.status === "checked_out" && "status-dot" }
                                        ${item.status === "confirmed" && "status-dot-conirmed" }
                                        ${item.status === "canceled" && "status-dot-Cancel" }
                                        ${item.status === "not_confirmed" && "status-dot-not-confirmed" }
                                        ${item.status === "no_show" && "status-dot-not-show" }
                                        ${item.status === "checked_in" && "status-dot" }`}></span>
                                        <span className="truncate">
                                        {item.status === "checked_in" && "Hospedado"}
                                        {item.status === "checked_out" && "Checked Out"}
                                        {item.status === "no_show" && "No show"}
                                        {item.status === "confirmed" && "Confirmado"}
                                        {item.status === "canceled" && "Cancelada"}
                                        {item.status === "not_confirmed" && "Confirmación pendiente"}
                                        </span>
                                        <span><FaRegCreditCard fontSize={25} /></span>
                                    </div>
                                    </div>
                                );
                                })} 
                           </> }        
                        </div>
                        }
                    </div>
                <div className="flex items-center">
                        <div className="mr-4 p-2">
                           <span className="status-dot" ></span>  <span className="font-semibold"  >{jwt?.result?.name}</span>
                        </div>
                    <button className="mr-4 p-2">
                        <FaDollarSign color="#3366ff" fontSize={25} onClick={goToDashboard} />
                    </button>
                    <button className="mr-4 p-2">
                        <MdOutlinePriceChange  color="#3366ff" fontSize={25} onClick={goToPrice} />
                    </button>
                    <button className="mr-4 p-2"  onClick={goToCalendar} > 
                        <FaRegCalendarAlt fontSize={18} />
                    </button>
                    <button className="mr-4 p-2"  onClick={goToInvoinceRelax} > 
                        <CiMoneyBill fontSize={20} />
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