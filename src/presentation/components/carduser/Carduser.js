import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { getUser, postTransaction } from '../../useCases/listUserAPI'
import { cards } from './cards.js'

const transactionPayload = {
    card_number: '',
    cvv: 0,
    expiry_date: '',
    destination_user_id: 0,
    value: 0,
}

const Carduser = () => {
    const [user, setUser] = useState([])
    const [isOpenModalNewTransaction, setIsOpenModalNewTransaction] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [userSelected, setUserSelected] = useState(false)
    const [values, setValues] = useState(transactionPayload)

    useEffect(() => {
        getUser().then(response => setUser(response))

    }, [])

    const handleOpenModalNewTransaction = (item) => {
        setUserSelected(item)
        setIsOpenModalNewTransaction(true)
    }

    const handleCloseModalNewTransaction = () => {
        setIsOpenModalNewTransaction(false)
        setSuccessMessage(false)
       
    }

    const onSubmit = (ev) => {
       ev.preventDefault()
        console.log(values)
        postTransaction(values).then(response => {
            response.data.status === "Aprovada" && setSuccessMessage(true)
        })
        setValues(transactionPayload)
    }

    const onChange = (ev) => {
        const { name, value } = ev.target
        setValues({
            ...values,
            [name]: value,
            destination_user_id: userSelected.id,
            cvv: value === 'validCard' ? cards[0]?.cvv : cards[1]?.cvv,
            card_number: value === 'validCard' ? cards[0]?.card_number : cards[1]?.card_number,
            expiry_date: value === 'validCard' ? cards[0]?.expiry_date : cards[1]?.expiry_date
        })

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
                overlayClassName="reactModalOverlay"
                className="reactModalContent"
            >
                <div className="reactModalHeader">
                    <h2>
                        Pagamento para
                        <span>{userSelected?.name}</span>
                    </h2>
                    <button onClick={handleCloseModalNewTransaction}>X</button>
                </div>
                {!successMessage && (
                    <form
                        onSubmit={onSubmit}
                        className="formNewTranscation"
                    >
                        <input
                            onChange={onChange}
                            name='value'
                            placeholder="R$ 0,00"
                            type='number'
                        >
                        </input>
                        <select
                            onChange={onChange}
                            name="card_number"
                        >
                            {cards?.map((card) => (
                                <option value={card?.name} >
                                    {card?.card_number}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Pagar</button>
                    </form>
                )}
                {successMessage && (
                    <div className="sucess">
                        <h3 >Pagamento Realizado</h3>
                        <div ></div>
                    </div>
                )}

            </Modal>
        </>
    )
}

export default Carduser;