import axios from 'axios';

const GET_USERS = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce'
const URL_TRANSACTION = 'https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989'

export const getUser = async () => {
  let result = ""
    try {
      const response = await axios.get(GET_USERS)
      if (response.data) result = response.data 
    } 
    catch (error) {
      console.error(error)
    }

    return result
  }

export const postTransaction = async (payload) => {
  let result = ""
    try {
      const response = await axios.post(URL_TRANSACTION, payload)
      if (response) result = response
    } 
    catch (error) {
      console.error(error)
    }

    return result
  }
  