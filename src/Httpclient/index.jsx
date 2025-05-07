import { config } from "../Config/Config";

const GetListHotel = async () => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/listmotels`, {
          method: "GET",
          headers: {
            'Content-type': 'application/json'
          }
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }   
        const {query} = await resp.json();
        return query;
      } catch (error) {
       
        throw error; // Puedes lanzar el error nuevamente o manejarlo de otra manera según tus necesidades
      }
  }


  const ENDPOINT = `${config.serverRoute}/api/auth/login`

  const LoginService =({username,password,hotel})=>{
    return fetch(`${ENDPOINT}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({username,password,hotel})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}

const PostAutenticationDian = async({Dian}) => {
  
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/sigo/PostAuthSigo`, {
      method: "POST",
      headers: {
          'Content-type': 'application/json',
      },
      body: JSON.stringify({Dian})
    });
    if (!resp.ok) {
        throw new Error('Response is not ok');
      }
      const {data} = await resp.json();
      return data
} catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // You can re-throw the error or handle it differently based on your needs
}
}

const PostGetHotelCloudbeds = async ({propertyID,token}) => {
  try {
      const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/getHotel`, {
          method: "POST",
          headers: {
              'Content-type': 'application/json',
          },
          body:JSON.stringify({propertyID,token})
      });
      if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const {data} = await resp.json();
        return data
  } catch (error) {
      console.error('Error in PostInformeInfomeMetricas:', error);
      throw error; // You can re-throw the error or handle it differently based on your needs
  }
};

const PostGetReservationBypropertyID = async ({propertyID,token,search}) => {
  try {
      const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/getReservationBypropertyID`, {
          method: "POST",
          headers: {
              'Content-type': 'application/json',
          },
          body:JSON.stringify({propertyID,token,search})
      });
      if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const {data} = await resp.json();
        return data
  } catch (error) {
      console.error('Error in PostInformeInfomeMetricas:', error);
      throw error; // You can re-throw the error or handle it differently based on your needs
  }
};



const GetReservationBypropertyRangeDate = async ({propertyID,token,start,end,search}) => {
  try {
      const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/GetReservationBypropertyRangeDate`, {
          method: "POST",
          headers: {
              'Content-type': 'application/json',
          },
          body:JSON.stringify({propertyID,token,start,end,search})
      });
      if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const {data} = await resp.json();
        return data
  } catch (error) {
      console.error('Error in PostInformeInfomeMetricas:', error);
      throw error; // You can re-throw the error or handle it differently based on your needs
  }
};


const GetReservationDetailBypropertyID = async ({propertyID,token,reservationID}) => {
  try {
      const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/GetReservationDetailBypropertyID`, {
          method: "POST",
          headers: {
              'Content-type': 'application/json',
          },
          body:JSON.stringify({propertyID,token,reservationID})
      });
      if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const {data} = await resp.json();
        return data
  } catch (error) {
      console.error('Error in PostInformeInfomeMetricas:', error);
      throw error; // You can re-throw the error or handle it differently based on your needs
  }
};


const GetReservation = async ({propertyID,token,reservationID}) => {
  try {
      const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/GetReservation`, {
          method: "POST",
          headers: {
              'Content-type': 'application/json',
          },
          body:JSON.stringify({propertyID,token,reservationID})
      });
      if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const {data} = await resp.json();
        return data
  } catch (error) {
      console.error('Error in PostInformeInfomeMetricas:', error);
      throw error; // You can re-throw the error or handle it differently based on your needs
  }
};


const GetCitySigo  = async () => {
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/sigo/CitySiigo`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!resp.ok) {
      throw new Error('Response is not ok');
    }
    const data = await resp.json();
    return data.query;
  } catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // Puedes lanzar el error nuevamente o manejarlo de otra manera según tus necesidades
  }
};

const PostRegisterCloubeds = async ({ID_Tipo_documento,ID_city,ReservationID,token,body}) => {
  try {
      const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/PostRegisterCloubeds`, {
          method: "POST",
          headers: {
              'Content-type': 'application/json',
          },
          body:JSON.stringify({ID_Tipo_documento,ID_city,ReservationID,token,body})
      });
      if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();
        return data
  } catch (error) {
      console.error('Error in PostInformeInfomeMetricas:', error);
      throw error; // You can re-throw the error or handle it differently based on your needs
  }
};

const GetRegisterCloubes  = async ({id}) => {
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/GetRegisterCloubes/${id}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!resp.ok) {
      throw new Error('Response is not ok');
    }
    const data = await resp.json();

    return data.query;
  } catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // Puedes lanzar el error nuevamente o manejarlo de otra manera según tus necesidades
  }
};

const PostPaymentCloubeds = async ({ReservationID,subTotal,taxesFees,additionalItems,Date,body,token,id_user,propertyID,tokenCloudbes}) => {
  try {
      const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/PostPaymentCloubeds`, {
          method: "POST",
          headers: {
              'Content-type': 'application/json',
          },
          body:JSON.stringify({ReservationID,subTotal,taxesFees,additionalItems,Date,body,token,id_user,propertyID,tokenCloudbes})
      });
      if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();
        return data
  } catch (error) {
      console.error('Error in PostInformeInfomeMetricas:', error);
      throw error; // You can re-throw the error or handle it differently based on your needs
  }
};



const GetPaymentCloubeds  = async ({id}) => {
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/GetPaymentCloubeds/${id}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!resp.ok) {
      throw new Error('Response is not ok');
    }
    const data = await resp.json();

    return data.query;
  } catch (error) {
    throw error; // Puedes lanzar el error nuevamente o manejarlo de otra manera según tus necesidades
  }
};



const PostRegisterSigoCloudbeds = async ({token,body}) => {
  try {
      const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/PostRegisterSigoCloudbeds`, {
          method: "POST",
          headers: {
              'Content-type': 'application/json',
          },
          body:JSON.stringify({token,body})
      });
      if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();
        return data
  } catch (error) {
      console.error('Error in PostInformeInfomeMetricas:', error);
      throw error; // You can re-throw the error or handle it differently based on your needs
  }
};


const GetProducts= async({token}) => {
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/sigo/GetProductSigo`, {
      method: "POST",
      body: JSON.stringify({ token}),
      headers: {
          'Content-type': 'application/json',
      },
    });
    if (!resp.ok) {
      throw new Error('Response is not ok');
    }
    const {data} = await resp.json();
    return data
    
  } catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // You can re-throw the error or handle it differently based on your needs
  }
};


const GetLisClienteDian = async({token,document}) => {
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/sigo/GetClientSigo`, {
      method: "POST",
      body: JSON.stringify({ token,document}),
      headers: {
          'Content-type': 'application/json',
      }
    });

    if (!resp.ok) {
        throw new Error('Response is not ok');
      }
      const data = await resp.json();
      return data
} catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // You can re-throw the error or handle it differently based on your needs
}
};

const GetInvoincesByReservationDian  = async ({ id}) => {
  try {
    const resp = await fetch(`${config.serverRoute}/api/resecion/GetFacturacionDianByIdReserva/${id}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      }
    });
    if (!resp.ok) {
      throw new Error('Response is not ok');
    }
    const data = await resp.json();
    return data.query;
  } catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // Puedes lanzar el error nuevamente o manejarlo de otra manera según tus necesidades
  }
};


const GetSalesInvoice= async({token,id}) => {
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/sigo/GetPdfSigo`, {
      method: "POST",
      body: JSON.stringify({token,id}),
      headers: {
          'Content-type': 'application/json',
      },
    });
    if (!resp.ok) {
      throw new Error('Response is not ok');
    }
    const {data} = await resp.json();
    return data
    
  } catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // You can re-throw the error or handle it differently based on your needs
  }
};



const GetTypePaymentSiigo= async({token}) => {
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/sigo/getTypePaymentSiigo`, {
      method: "POST",
      body: JSON.stringify({ token}),
      headers: {
          'Content-type': 'application/json',
      },
    });
    if (!resp.ok) {
      throw new Error('Response is not ok');
    }
    const {data} = await resp.json();
    return data
    
  } catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // You can re-throw the error or handle it differently based on your needs
  }
};


const Gettaxesfree= async({propertyID,token}) => {
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/getTaxesfree`, {
      method: "POST",
      body: JSON.stringify({propertyID,token}),
      headers: {
          'Content-type': 'application/json',
      },
    });
    if (!resp.ok) {
      throw new Error('Response is not ok');
    }
    const {data} = await resp.json();
    return data
    
  } catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // You can re-throw the error or handle it differently based on your needs
  }
};


const GetTransition= async({reservationID,token}) => {
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/GetTransitionCloubeds`, {
      method: "POST",
      body: JSON.stringify({reservationID,token}),
      headers: {
          'Content-type': 'application/json',
      },
    });
    if (!resp.ok) {
      throw new Error('Response is not ok');
    }
    const {data} = await resp.json();
    return data
    
  } catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // You can re-throw the error or handle it differently based on your needs
  }
};


const PostForwardEmail= async({token,id,Email_to,Copy_to}) => {

  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/sigo/FowrwardEmail`, {
      method: "POST",
      body: JSON.stringify({token,id,Email_to,Copy_to}),
      headers: {
          'Content-type': 'application/json',
      },
    });

    if (!resp.ok) {
      throw new Error('Response is not ok');
    }
    const data = await resp.json();
    return data
    
  } catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // You can re-throw the error or handle it differently based on your needs
  }
};


const RatesDollar  = async () => {
  try {
    const resp = await fetch(`https://v6.exchangerate-api.com/v6/f024262e246f3d02bf6498f1/latest/USD`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      }
    });
    if (resp.result =="error") {
      throw new Error('Response is not ok');
    }
    const data = await resp.json();
    return data
  } catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // Puedes lanzar el error nuevamente o manejarlo de otra manera según tus necesidades
  }
};


const GetInvoinceDian= async({fecha}) => {
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/getInvoniceDian`, {
      method: "POST",
      body: JSON.stringify({fecha}),
      headers: {
          'Content-type': 'application/json',
      },
    });
    if (!resp.ok) {
      throw new Error('Response is not ok');
    }
    const {query} = await resp.json();
    return query
    
  } catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // You can re-throw the error or handle it differently based on your needs
  }
};


const GetAmmountAdvance= async({propertyID,startDate,endDate}) => {
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/GetAmmountAdvance`, {
      method: "POST",
      body: JSON.stringify({propertyID,startDate,endDate}),
      headers: {
          'Content-type': 'application/json',
      },
    });
    if (!resp.ok) {
      throw new Error('Response is not ok');
    }
    const {data} = await resp.json();
    return data
    
  } catch (error) {
    console.error('Error in PostInformeInfomeMetricas:', error);
    throw error; // You can re-throw the error or handle it differently based on your needs
  }
};



  export default {
    GetListHotel,
    LoginService,
    PostAutenticationDian,
    PostGetHotelCloudbeds,
    PostGetReservationBypropertyID,
    GetReservationBypropertyRangeDate,
    GetReservationDetailBypropertyID,
    GetReservation,
    GetCitySigo,
    PostRegisterCloubeds,
    GetRegisterCloubes,
    PostPaymentCloubeds,
    GetPaymentCloubeds,
    PostRegisterSigoCloudbeds,
    GetProducts,
    GetLisClienteDian,
    GetInvoincesByReservationDian,
    GetSalesInvoice,
    PostForwardEmail,
    RatesDollar,
    Gettaxesfree,
    GetTransition,
    GetTypePaymentSiigo,
    GetInvoinceDian,
    GetAmmountAdvance
  }

