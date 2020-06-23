"use strict";
const QuizzesLoader = require("../../sources/engine/QuizzesLoader.js");

// Test de QuizzesLoader, ce test pour fonctionner a besoin que mongoose soit installé
describe("test method of QuizzesLoader", () => {
    test("test getQuizzesByType", () => {
        let query = QuizzesLoader.getQuizzesByType("number", 5);

        if (query) {
            query.exec(function (error, quizzes) {
                if (!error) {
                    expect(quizzes.length).toBe(5);
                }
            });
        }
    });
});
