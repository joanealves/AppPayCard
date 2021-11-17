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
                <div className="CardContainer">
                    {user?.map((item) => (
                        <div className="CardConteudo">
                            <img src={item?.img} alt={`Foto ${item?.name}`} />
                            <div>
                                <h4> {`Nome do usuário ${item?.name}`} </h4>
                                <h4>{`ID: ${item?.id}  - Username: ${item?.username} `}</h4>
                            </div>
                            <button>Pagar</button>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Carduser;

