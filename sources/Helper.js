"use strict";

/**
 * Enumération des Jokers dont pourrait se servir nos joueurs
 * @enum Joker
 */
const Joker = Object.freeze({
    INCREASE_REWARD: 0,
    PUBLIC_NOTICE: 1,
    DELETE_ONE: 2,
});

/**
 * Enumération des types de Questions qui représentent les phases de jeu
 * @enum Question
 */
const QuestionType = Object.freeze({
    QUESTION_TYPE_PROPOSAL: "proposal",
    QUESTION_TYPE_TRUE_FALSE: "true_or_false",
    QUESTION_TYPE_NUMBER: "number",
});

/**
 * classe comportant des fonctions tierces qui ont pour but d'aider au bon fonctionnement
 * de l'application
 * @class Helper
 */
class Helper {
    constructor() {}

    /**
     * Fonction permettant de mélanger des un tableau de contenant des élements
     * @example
     * list = {0, 1, 5, 8}
     * QuestionLoader.shuffleQuestions(list)
     * // retourne {5, 1, 0, 8}
     *
     * @method shuffle
     * @static
     * @public
     * @param {Array} myList tableau
     * @returns {Array} Le nouveau tableau contenant des éléments qui sont tous mélangés
     */
    static shuffle(myList) {
        if (myList !== undefined) {
            for (let i = myList.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * i);
                const temp = myList[i];
                myList[i] = myList[j];
                myList[j] = temp;
            }
        }
        return myList;
    }

    /**
     * Méthode random pour générer les nombres aléatoires
     *
     * @param {number} min - nombre entier minimum
     * @param {number} max - nombre entier maximum
     */
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

module.exports = {
    Joker: Joker,
    QuestionType: QuestionType,
    Helper: Helper,
};
