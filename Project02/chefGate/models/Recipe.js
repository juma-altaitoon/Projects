const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
    mealName: String,
    mealType: String,
    prepareTime: String,
    mealIngrediants: String,
    category: {
        type: String,
        enum: ['Bahraini', 'American', 'Italian','Chinese', 'Greek'], 
    },
    // enum under category was not working chaned to string
    mealDescription: String,
    chef : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;