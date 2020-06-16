'use strict';
var Question = require('../models/question.js');

/**
* Question Loader class.
*/

class QuestionLoader {
    // constructor(question_subject, answer, question_type, proposals, maw_reward) {
    //     this.question_subject = question_subject;
    //     this.answer = answer;
    //     this.question_type = question_type;
    //     this.proposals = proposals;
    //     this.maw_reward = maw_reward;
    // }
    constructor() {}

    list() {
        var questions = {};
        Question.find((error, docs) => {
            if (!error) {
                questions = docs.map(function (doc) {
                    return doc;
                });
                return questions;

            } else {
                return JSON.stringify(error, undefined, 2);
            }
        });


    }

}

module.exports = QuestionLoader;
