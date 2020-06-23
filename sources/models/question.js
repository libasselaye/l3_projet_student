// importation du module mongoose
const mongoose = require("mongoose");

// definition du shema(la forme des données au sein de la collection)
var questionSchema = new mongoose.Schema(
    {
        question_subject: {
            type: String,
            default: "",
        },
        answer: {
            type: String,
            default: "",
        },
        question_type: {
            type: String,
            default: "",
        },
        proposals: {
            type: [String],
            default: [],
        },
        maw_reward: {
            type: Number,
            default: 0,
        },
    },
    { collection: "quiz" }
);

// Déclaration du model Mongoose lié au schema de la collection Quiz
var Question = mongoose.model("Question", questionSchema);

/**
 * Module Question implémenant le modéle Question
 * @module Question
 */
module.exports = Question;
