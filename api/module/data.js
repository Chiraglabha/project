const mongoose = require('mongoose');

const dataSchemaa = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    email: { type: String },
    mobileNumber: { type: Number },
    department: { type: String }
})


module.exports = mongoose.model('Data', dataSchemaa);
