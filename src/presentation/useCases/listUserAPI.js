import axios from 'axios';

const GET_USERS = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce'

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
  