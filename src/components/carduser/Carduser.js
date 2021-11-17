import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { getUser } from '../../useCases/listUserAPI'
import { cards } from './cards.js'

const Carduser = () => {
    const [user, setUser] = useState([])
    const [isOpenModalNewTransaction, setIsOpenModalNewTransaction] = useState(false)
    const [userSelected, setUserSelected] = useState(false)

    useEffect(() => {
        getUser().then(response => setUser(response))
        
        }, [])

    const handleOpenModalNewTransaction = (item) => {
        setUserSelected(item)
        setIsOpenModalNewTransaction(true)
    }

    const handleCloseModalNewTransaction = () => {
        setIsOpenModalNewTransaction(false)
    }

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
                            <button
                                type="button"
                                onRequestClose={handleCloseModalNewTransaction}
                                onClick={() => handleOpenModalNewTransaction(item)}
                            >
                                Pagar
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <Modal
                isOpen={isOpenModalNewTransaction}
                onRequestClose={handleCloseModalNewTransaction}
            >
                <h2>
                    Pagamento para
                    <span> {userSelected?.name}</span>
                </h2>
                <div>
                    <input placeholder="R$ 0,00">
                    </input>
                    <select>
                        {cards?.map((card) => (
                            <option>
                                {card?.card_number}
                            </option>
                        ))}
                    </select>
                    <button> Pagar </button>
                </div>
            </Modal>
        </>
    )
}

export default Carduser;
