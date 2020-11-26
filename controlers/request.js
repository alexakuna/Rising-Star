const FormRequest = require('../models/FormRequest')
const nodemailer = require("nodemailer")
const config = require('../config/cnfg')
const configEmailBody = require('../emails/requestCandidate')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    logger: true,
    auth: {
        type: 'OAuth2',
        user: config.USER,
        refreshToken: config.REFRESH_TOKEN,
        clientId: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET
    }
})

module.exports.request = async function (req, res) {

    req.body.image = req.files.image.map(i => {return i.path})
    req.body.video = req.files.video ? req.files.video[0].path : ''
    const images = [
        {
            filename: req.files.video ? req.files.video[0].filename : '',
            path: req.files.video ? req.files.video[0].path : ''
        }
    ]
    req.files.image.forEach(i => {
        images.push({
            filename: i.filename,
            path: i.path
        })
    })
    const request = new FormRequest(req.body)
    try {
        await request.save()
        res.render('regulations/done-request', {message: 'Заявка принята'})
        await transporter.sendMail(configEmailBody(req.body, config.EMAIL_TARGET, images))
    } catch (e) {
        res.render('regulations/done-request', {message: 'Произошла не предвиденая ошибка.'})
        console.log(e)
    }
}

// module.exports.getById = async function (req, res) {
//     try {
//         const category = await FormRequest.findById(req.params.id);
//         res.status(200).json(category);
//     } catch (e) {
//        console.log(res, e);
//     }
// };
//
// module.exports.remove = async function (req, res) {
//     try {
//         await FormRequest.remove({_id: req.params.id});
//         await FormRequest.remove({category: req.params.id});
//         res.status(200).json({message: 'Category has been delete.'});
//     } catch (e) {
//         console.log(res, e);
//     }
// };
//
// module.exports.create = async function (req, res) {
//     const category = new FormRequest({
//         name: req.body.name,
//         user: req.user.id,
//         imageSrc: req.file ? req.file.path : ''
//     });
//     try {
//         await category.save();
//         res.status(201).json(category)
//     } catch (e) {
//         console.log(res, e);
//     }
// };
//
// module.exports.update = async function (req, res) {
//     const updated = {name: req.body.name};
//     if (req.file) {
//         updated.imageSrc = req.file.path
//     }
//     try {
//         const category = await FormRequest.findOneAndUpdate(
//             {_id: req.params.id},
//             {$set: updated},
//             {new: true}
//         )
//         res.status(200).json(category)
//     } catch (e) {
//         console.log(res, e);
//     }
// };
