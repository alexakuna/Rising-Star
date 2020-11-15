const FormRequest = require('../models/FormRequest');

module.exports.request = async function (req, res) {
    const candidate = await FormRequest.findOne({email: req.body.email})
    if (candidate) {
        res.status(409).json({
            message: 'Емаил занят.'
        })
    } else {
        req.body.image = req.files.image.map(i => {return i.path})
        req.body.video = req.files.video[0] ? req.files.video[0].path : ''
        const request = new FormRequest(req.body)
        try {
            await request.save()
            res.render('regulations/done-request', request)
        } catch (e) {
            console.log(e)
        }
    }
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
