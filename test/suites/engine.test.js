"use strict";
const Phase = require("../../sources/engine/Phase.js");
const Player = require("../../sources/engine/Player.js");
const helper = require("../../sources/Helper.js");
const Quizz = require("../../sources/engine/Quizz.js");
const Joker = helper.Joker;

// Test de Quizz
describe("Test method of Quizz", () => {
    test("Test Quizz constructeur", () => {
        var quizz = new Quizz();
        expect(quizz.counterPhase).toBe(1);
    });

    test("Test Quizz step", () => {
        var quizz = new Quizz();
        quizz.step = 5;
        expect(quizz.step).toBe(5);
    });
    test("Test Quizz started", () => {
        var quizz = new Quizz();
        quizz.started = true;
        expect(quizz.started).not.toBeFalsy();
    });

    test("Test Quizz timer", () => {
        var quizz = new Quizz();
        expect(quizz.timer).toBeNull();
    });

    test("Test Quizz register", () => {
        var quizz = new Quizz();
        quizz.register("mon_id", "toto");
        expect(quizz.register("mon_id", "toto")).toBe(true);
    });

    test("Test Quizz Players", () => {
        var quizz = new Quizz();
        quizz.register("mon_id", "libasse");
        quizz.register("mon_id1", "marcel");
        expect(quizz.getPlayers().length).toBe(2);
    });
});

// Test de Phase
describe("Test method of Phase", () => {
    test("Test Phase constructor", () => {
        Phase.build(helper.QuestionType.QUESTION_TYPE_PROPOSAL).then(function (
            phase
        ) {
            expect(phase.counter).toBe(5);
        });
    });

    test("Test Phase nextQuestion", () => {
        Phase.build(helper.QuestionType.QUESTION_TYPE_PROPOSAL).then(function (
            phase
        ) {
            var question = phase.nextQuestion();
            expect(question).not.toBeNull();
            expect(phase.counter).toBe(4);
        });
    });

    test("Test Phase isEndOfPhase", () => {
        Phase.build(helper.QuestionType.QUESTION_TYPE_PROPOSAL).then(function (
            phase
        ) {
            phase.nextQuestion();
            phase.nextQuestion();
            expect(phase.isEndOfPhase()).toBeFalsy();
            phase.nextQuestion();
            phase.nextQuestion();
            phase.nextQuestion();
            expect(phase.isEndOfPhase()).toBeTruthy();
        });
    });
});

// Test de Player
describe("Test method of Player", () => {
    test("Test Player constructeur", () => {
        // simulons l'id du socket.io
        var player = new Player("mon_id", "toto");
        expect(player.score).toBe(0);
    });

    test("Test Player score", () => {
        // simulons l'id du socket.io
        var player = new Player("mon_id", "toto");
        player.score = 15;
        expect(player.score).toBe(15);
    });

    test("Test Player pseudo", () => {
        // simulons l'id du socket.io
        var player = new Player("mon_id", "toto");
        player.pseudo = "tata";
        expect(player.pseudo).toBe("tata");
    });
});
