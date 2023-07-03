const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    job: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    summary: { type: String, required: true },
    experience: [{
        title: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        startYear: { type: String, required: true },
        finishYear: { type: String, required: true },
        details: { type: String, required: true }
    }],
    education: [{
        title: { type: String, required: true },
        studies: { type: String, required: true },
        location: { type: String, required: true },
        startYear: { type: String, required: true },
        finishYear: { type: String, required: true },
    }],
    languages: [{ language: { type: String, required: true }, level: { type: Number, required: true } }],
    skills: [{ skill: { type: String, required: true }, level: { type: Number, required: true } }],
});

module.exports = mongoose.model('cv',cvSchema);