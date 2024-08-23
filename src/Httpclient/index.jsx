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

const PostAutenticationDian = async() => {
  
  try {
    const resp = await fetch(`${config.serverRoute}/api/hotels/sigo/PostAuthSigo`, {
      method: "POST",
      headers: {
          'Content-type': 'application/json',
      }
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

const PostGetReservationBypropertyID = async ({propertyID,token}) => {
  try {
      const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/getReservationBypropertyID`, {
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

const PostPaymentCloubeds = async ({ReservationID,subTotal,taxesFees,additionalItems,Date,body,token,id_user}) => {
  try {
      const resp = await fetch(`${config.serverRoute}/api/hotels/cloubeds/PostPaymentCloubeds`, {
          method: "POST",
          headers: {
              'Content-type': 'application/json',
          },
          body:JSON.stringify({ReservationID,subTotal,taxesFees,additionalItems,Date,body,token,id_user})
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
      body: JSON.stringify({ token,id}),
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
    GetSalesInvoice
  }

