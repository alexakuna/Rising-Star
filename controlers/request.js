const FormRequest = require('../models/FormRequest')
const fs = require('fs')
const nodemailer = require("nodemailer")
const config = require('../config/cnfg')
const configEmailBody = require('../emails/requestCandidate')
const hbjs = require('handbrake-js')

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

    const newPathVideo = req.files.video ? `${req.files.video[0].path.split('.')[0]}.mp4` : ''
    const newNameVideo = req.files.video ? `${req.files.video[0].filename.split('.')[0]}.mp4` : ''

    req.body.image = req.files.image.map(i => {return i.path})
    req.body.artimages = req.files.artimages ? req.files.artimages.map(i => {return i.path}) : ''
    req.body.video = newPathVideo
    req.body.invoice = req.files.invoice[0].path

    const images = [
        {
            filename: req.files.invoice[0].filename,
            path: req.files.invoice[0].path
        }
    ]
    req.files.image.forEach(i => {
        images.push({
            filename: i.filename,
            path: i.path
        })
    })
    if(req.files.artimages) {
        req.files.artimages.forEach(i => {
            images.push({
                filename: i.filename,
                path: i.path
            })
        })
    }

    const options = {
        input: req.files.video ? req.files.video[0].path : '',
        output: newPathVideo,
        preset: 'Gmail Medium 5 Minutes 480p30',
    }
    async function startEncoding () {
        console.log('Start decoding video')
        const result = await hbjs.run(options)
        console.log(`${result.stdout}End decoding video`)
    }

    //console.log(req.body)
    const request = new FormRequest(req.body) // Созд. инстанс для сохр. в БД
    try {
        await request.save() // Сохраняем в БД

        localStorage.setItem('done', 'Заявка принята! В ближайшее время с вами свяжутся.')
        if(newPathVideo) {
            await startEncoding() // Сжимаем видео
        }
        await transporter // Отправляем на почту
            .sendMail(configEmailBody(req.body, config.EMAIL_TARGET, helpPushVideo()))
        res.redirect('/request') // редирект на стр. Заявки
        images.forEach(i => fs.unlink( // Удаляем файлы
            i.path, (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log(`File: ${i.filename} has been deleted`)
            }
        }))
        if(newPathVideo) {
            fs.unlink(req.files.video[0].path, (err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log(`File: ${req.files.video[0].path} has been deleted`)
                }
            })
        }
    } catch (e) {
        res.render('regulations/done-request', {message: 'Произошла не предвиденая ошибка.'})
        console.log(e)
    }

    function helpPushVideo() { //
        if(newPathVideo) {
            images.push({
                filename: newNameVideo,
                path: newPathVideo
            })
            return images
        } else {
            return images
        }
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
