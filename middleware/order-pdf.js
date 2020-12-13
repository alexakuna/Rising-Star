const config = require('../config/cnfg')
const axios = require('axios')


module.exports = (req, res) => {
    // Перед продакшеном обязатаельно поменять локальный url на url домена где будет сайт
    const url = localStorage.getItem('url')
    axios.get(`${config.BASE_URL}${url}`)
        .then(resp => {
            const str = resp.data.indexOf('main')
            const str2 = resp.data.lastIndexOf('main')
            const result = resp.data.substring(str - 1, str2 + 5)
            res.pdfFromHTML({
                filename: `${url.replace('/', '')}.pdf`,
                htmlContent: result,
                // Перед продакшеном обязатаельно поменять локальный url на url домена где будет сайт
                // https://rsfrontend.herokuapp.com
                options: config.OPTIONS_PDF
            })
        }).catch(e => console.log(e))
}
