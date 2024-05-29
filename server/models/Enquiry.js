const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
        name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique :true,
    },
    mobile :{
    type: Number,
    required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status:
     { type: String,
     enum: ['New', 'Pending', 'Completed'],
     default: 'New' }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
