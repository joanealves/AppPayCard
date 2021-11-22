import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { getUser, postTransaction } from '../../useCases/listUserAPI'
import { cards } from './cards.js'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";


const Carduser = () => {
    const [user, setUser] = useState([])
    const [isOpenModalNewTransaction, setIsOpenModalNewTransaction] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [required, setRequired] = useState(false)
    const [userSelected, setUserSelected] = useState(false)
    const [isPrice, setIsPrice] = useState(0)
    const [isCardNumber, setCardNumber] = useState('')

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

    const onSubmit = (e) => {
        e.preventDefault()
        let cardValid = isCardNumber === 'validCard' && cards[0]
        let cardInValid = isCardNumber === "inValidCard" && cards[1]

        const result = {
            card_number: cardValid ? cardValid?.card_number : cardInValid?.card_number,
            cvv: cardValid ? cardValid?.cvv : cardInValid?.cvv,
            expiry_date: cardValid ? cardValid?.expiry_date : cardInValid?.expiry_date,
            destination_user_id: userSelected?.id,
            value: Number(isPrice),
        }

        console.log('result', result)
        if (result?.card_number !== undefined) {
            postTransaction(result).then(response => {
                response.data.status === "Aprovada" && setSuccessMessage(true)
                setIsPrice(0)
                setCardNumber('')
                setErrorMessage(false)
            })
        } else {
            isPrice === 0 && setRequired(true)
            setErrorMessage(true)
        }

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
                            placeholder="R$ 0,00"
                            type='number'
                            value={isPrice}
                            onChange={(e) => setIsPrice(e.target.value)}
                        >
                        </input>
                        {required && <p className="error">Digite um valor</p>}
                        <select
                            name="card_number"
                            value={isCardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        >
                            {cards?.map((card) => (
                                <option value={card?.name} >
                                    {card?.card_number}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                        >Pagar</button>
                    </form>
                )}
                {successMessage && (
                    <div className="sucess">
                        <h3 >Pagamento Realizado</h3>
                        <div> <IoIosCheckmarkCircleOutline /> </div>
                    </div>
                )}
                {errorMessage && (
                    <div className="errorMessage">
                        <h3 >Erro ao realizar pagamento</h3>
                        <div>  </div>
                    </div>
                )}

            </Modal>
        </>
    )
}

export default Carduser;