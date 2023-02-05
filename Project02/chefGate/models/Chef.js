const mongoose = require('mongoose');
const chefSchema = mongoose.Schema({
    firstName: String,
    LastName: String,
    emailAddress: String,
},
{
    timestamps: true
})

const Chef = mongoose.model('Chef', chefSchema);
module.exports = Chef;
