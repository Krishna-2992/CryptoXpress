const axios = require('axios')

const SERVER_URL = 'https://cryptoxpress-back.onrender.com'

const calculatePublicKey = async (privateKey) => {
    const response = await axios(
        `${SERVER_URL}/calculatePublicKey?privateKey=${privateKey}`
    )
    return response.data
}

export default {
    calculatePublicKey,
}
