/**
 * importation du module mongoose
 */
const mongoose = require('mongoose');

/**
 * definition du shema(la forme des données au sein de la collection)
 */
var questionSchema = new mongoose.Schema({
    question_subject: {
        type: String,
        default: ""
    },
    answer: {
        type: String,
        default: ""
    },
    question_type: {
        type: String,
        default: ""
    },
    proposals: {
        type: [String],
        default: []

    },
    maw_reward: {
        type: Number,
        default: 0
    }

});
/**
 * importation du modèle
 */
var Question = mongoose.model("Question", questionSchema);

module.exports = Question;
