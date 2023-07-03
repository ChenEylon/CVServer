const cv = require('../models/cv');
const user = require('../models/user');


exports.create = async (req, res) => {
    try {
        const {_id} = req.body;
        const info = req.body;
        delete info._id;
        const createCv = await cv.create(info);
        const userArr = await user.findByIdAndUpdate(
            { _id: _id },
            { $push: { cvInfo: [{ _id: createCv._id }] } },
            { new: true }
        );

        return res.status(200).json(userArr);
    } catch (err) {
        return res.status(500).json(err.message);
    }
};

exports.patch = async (req, res) => {
    try {
        const patchPost = await cv.findByIdAndUpdate(req.body._id,req.body,{new:true})
        console.log(patchPost);
        return res.status(200).json(patchPost)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}
