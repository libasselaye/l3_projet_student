"use strict";

/**
 * classe comportant des fonctions tierces qui ont pour but d'aider au bon fonctionnement
 * de l'application
 * @class Helper
 */
class Helper {
    static QUESTION_TYPE_PROPOSAL = "proposal";
    static QUESTION_TYPE_TRUE_FALSE = "true_or_false";
    static QUESTION_TYPE_NUMBER = "number";

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
}

module.exports = Helper;
