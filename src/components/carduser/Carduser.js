import React, { useEffect, useState } from "react";
import { getUser } from '../../useCases/listUserAPI'

const Carduser = () => {
    const [user, setUser] = useState([])

    useEffect(() => {
        getUser()
            .then(response => {
                setUser(response)
            })
    }, [])

    return (
        <>
            {user.length > 0 && (
                <>
                    {user?.map((item) => (
                        <div>
                            <img src={item?.img} alt={`Foto ${item?.name}`} />
                            <div>
                                <h4> {`Nome do usuário ${item?.name}`} </h4>
                                <h4>{`ID: ${item?.id}  - Username: ${item?.username} `}</h4>
                            </div>
                            <button>Pagar</button>
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default Carduser;

