module.exports = function (req, to, images) {
    return {
        from: `<${req.email}>`,
        to: to,
        subject: `Заявка: ${req.nomination}, ${req.name_organisation}`,
        html: `<div style='margin: 0 auto; width: 70%;border: #4a148c solid 1px;padding: 10px 15px'>
                    <ul>
                        <li>${req.country}</li>
                        <li>${req.name_organisation}</li>
                        <li>${req.pip}</li>
                        <li>${req.nomination}</li>
                        <li>${req.age}</li>
                        <li>${req.name_performance}</li>
                        <li>${req.tel}</li>
                        <li>${req.email}</li>
                        <li>${req.pip_getter}</li>
                        <li style="display: ${req.text ? 'block' : 'none'}"><a href="${req.text}">Ссылка на видео</a></li>
                    </ul>
               </div>`,
        attachments: images
    }
}
