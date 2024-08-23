import React, { useEffect, useState } from "react";

const Autoconext = React.createContext({})

export const AutoProvider =({children}) =>{

    const [jwt, setJwt] = useState(() => JSON.parse(localStorage.getItem('jwt')));
    const [dian, setDian] = useState(() => JSON.parse(localStorage.getItem('tokenDian')));

    return (
            <Autoconext.Provider value={{jwt,
                                        dian,
                                        setDian,
                                        setJwt}}>
                {children}
            </Autoconext.Provider>
    )
}
export default Autoconext