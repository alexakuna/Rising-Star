const FormRequest = require('../models/FormRequest')
const nodemailer = require("nodemailer")

module.exports.request = async function (req, res) {
    // const candidate = await FormRequest.findOne({email: req.body.email})
    // if (req) {
    //     res.status(409).json({
    //         message: 'Емаил занят.'
    //     })
    // } else {
    console.log(req.body)
    req.body.image = req.files.image.map(i => {return i.path})
    req.body.video = req.files.video ? req.files.video[0].path : ''
    const request = new FormRequest(req.body)
    //console.log(request)

    try {
        await request.save()
        const images = [{filename: req.files.video ? req.files.video[0].filename : '', path: req.files.video ? req.files.video[0].path : ''}]
        req.files.image.forEach(i => {
            images.push({
                filename: i.filename,
                path: i.path
            })
        })

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            logger: true,
            auth: {
                user: 'alevtinaischenko@gmail.com', // generated ethereal user
                pass: 'pnoass2789243', // generated ethereal password
            },
        })
        await transporter.sendMail({
            from: `"Заявка" <${req.body.email}>`,
            to: "risingstarfest@gmail.com",
            subject: `Заявка: ${req.body.nomination}, ${req.body.name_organisation}`,
            html: `<div style='margin: 0 auto; width: 70%;border: #4a148c solid 1px;padding: 10px 15px'>
                    <ul>
                        <li>${req.body.country}</li>
                        <li>${req.body.name_organisation}</li>
                        <li>${req.body.pip}</li>
                        <li>${req.body.nomination}</li>
                        <li>${req.body.age}</li>
                        <li>${req.body.name_performance}</li>
                        <li>${req.body.tel}</li>
                        <li>${req.body.email}</li>
                        <li>${req.body.pip_getter}</li>
                        <li style="display: ${req.body.text ? 'block' : 'none'}"><a href="${req.body.text}">Ссылка на видео</a></li>
                    </ul>
               </div>`,
            attachments: images
        }).catch(e => {
            res.render('regulations/done-request', {message: 'Произошла непредвиденная ошибка.'})
            console.log(e)
        })
        res.render('regulations/done-request', {message: 'Заявка принята'})
    } catch (e) {
        res.render('regulations/done-request', {message: 'Произошла не предвиденая ошибка.'})
        console.log(e.errors)
    }
    //}
}

module.exports.getById = async function (req, res) {
    try {
        const category = await FormRequest.findById(req.params.id);
        res.status(200).json(category);
    } catch (e) {
       console.log(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        await FormRequest.remove({_id: req.params.id});
        await FormRequest.remove({category: req.params.id});
        res.status(200).json({message: 'Category has been delete.'});
    } catch (e) {
        console.log(res, e);
    }
};

module.exports.create = async function (req, res) {
    const category = new FormRequest({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''
    });
    try {
        await category.save();
        res.status(201).json(category)
    } catch (e) {
        console.log(res, e);
    }
};

module.exports.update = async function (req, res) {
    const updated = {name: req.body.name};
    if (req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const category = await FormRequest.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(category)
    } catch (e) {
        console.log(res, e);
    }
};
