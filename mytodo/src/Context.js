import { createContext, useState } from 'react'

export const MyContext = createContext();

export const MyProvider = (props) => {

    const [uid, setUid] = useState("");
    return(
        <MyContext.Provider value = {[uid, setUid]}>
            {props.children}
        </MyContext.Provider>
    );
}