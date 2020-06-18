"use strict";
var Question = require("../models/question.js");

/**
 * Classe qui s'occupe du chargement des questionnaires du quiz
 * @class
 * @requires module:mongoose
 * @requires module:Question
 */
class QuizzesLoader {
    constructor() {}

    /**
     * Méthode retournant la liste des questions dans notre base de données
     * @static
     * @method getQuizzes
     * @public
     * @returns {Query} Objet mongoose de type 'Query' sur lequel on pourra appeler la méthode
     * exec()
     */
    static getQuizzes() {
        var query = Question.find();
        return query;
    }

    /**
     * Méthode retournant un objet Query des question dont le type est passé en paramètre
     * @static
     * @method getQuizzesByType
     * @param {String} type le type de phase des questions que l'on veut recupérer
     * @example
     * QuestionLoader.getQuestionsByType(QuestionLoader.QUESTION_TYPE_NUMBER)
     * // Retourne un objet de type 'Query'
     *
     * @returns {Query} objet mongoose de type 'Query' sur lequel on pourra appeler la méthode
     * exec()
     */
    static getQuizzesByType(type, limit) {
        var query = Question.aggregate([
            { $match: { question_type: type } },
        ]).sample(limit);
        return query;
    }
}

module.exports = QuizzesLoader;
