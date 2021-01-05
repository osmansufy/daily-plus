import axios from 'axios'

const instance=axios.create({
    baseURL:'https://api.dailyplus.store/v0/'
})

export default instance