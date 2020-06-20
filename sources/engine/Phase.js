"use strict";
var Question = require("../models/question.js");
var QuizzesLoader = require("./QuizzesLoader.js");
const Helper = require("../Helper.js");
// compteur maximum
var MAX_COUNTER = 5;

/**
 * La classe Phase qui s'occupe des phases du jeu
 * @class
 * @requires module:Question
 * @requires module:QuizzesLoader
 */
class Phase {
    /**
     * Constructeur de la classe Phase
     * @constructor
     * @example
     * var phase = new Phase("number"); // objet phase
     * @param {String} id L'id de la phase
     */
    constructor(id) {
        this._id = id;
        this._questions = {};
        this._counter = MAX_COUNTER;
        this._currentQuestion = null;
        QuizzesLoader.getQuizzesByType(id, this.MAX_COUNTER).exec(function (
            error,
            questions
        ) {
            if (!error) {
                this._questions = questions;
            }
        });
    }

    /**
     * Retourne l'identifiant de la phase en cours
     * @example
     * phase.id; // retourne la question actuelle de la phase
     * @public
     * @return {String} la question courante
     */
    get id() {
        return this._id;
    }

    /**
     * Attribue un identifiant à la phase en cours
     * @example
     * phase.id = "number";
     * @private
     * @param {String} id Identifiant de la phase
     */
    set id(id) {
        this._id = id;
    }

    /**
     * Retourne l'identifiant de la phase en cours
     * @example
     * phase.counter; // retourne la question actuelle de la phase
     * @public
     * @return {number} Retourne la valeur du compteur de question
     */
    get counter() {
        return this._counter;
    }

    /**
     * Attribue une valeur au compteur de question de la phase en cours
     * @example
     * phase.counter = value;
     * @private
     * @param {number} value
     */
    set counter(value) {
        this._counter = value;
    }

    /**
     * Permet d'avoir la question suivante sauf que ça décale le compteur courant
     * C'est une fonction à appeler qu'une fois pour changer la valeur du compteur de question
     * @method nextQuestion
     * @public
     * @return {Question} La question suivante dans la phase en cours si la phase n'est pas terminée,
     * sinon elle renvoie 'null'
     */
    nextQuestion() {
        if (this._counter > 0 && this._questions) {
            this._currentQuestion = this._questions[
                MAX_COUNTER - this._counter
            ];
            this._counter--;
            let proposals = {};
            proposals.push(this._currentQuestion.answer);
            switch (id) {
                case Helper.QUESTION_TYPE_PROPOSAL:
                    proposals.push(
                        this._currentQuestion.proposals[Helper.randomInt(0, 3)]
                    );
                    let i = Helper.randomInt(3, 5);
                    proposals.push(
                        this._currentQuestion.proposals[i == 3 ? i + 1 : i]
                    );
                    break;
                case Helper.QUESTION_TYPE_TRUE_FALSE:
                    proposals.push(
                        this._currentQuestion.answer == "vrai" ? "faux" : "vrai"
                    );
                    break;
            }
            this.currentQuestion.proposals = proposals;
            return this._currentQuestion;
        }
        return null;
    }

    /**
     * Retourne la question en cours
     * @example
     * phase.currentQuestion; // retourne la question actuelle de la phase
     * @public
     * @return {Question} la question courante
     */
    get currentQuestion() {
        return this._currentQuestion;
    }

    /**
     * Modifier la question actuelle
     * @private
     * @param {Question} currentQuestion Question courante
     */
    set currentQuestion(currentQuestion) {
        this._currentQuestion = currentQuestion;
    }

    /**
     * Permet de savoir si une phase est terminée ou non
     * @method isEndOfPhase
     * @public
     * @returns {Boolean} 'true' si la phase est terminée, sinon 'false'
     */
    isEndOfPhase() {
        return this._counter <= 0;
    }
}

module.exports = Phase;
