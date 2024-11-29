import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Game = ({ difficultyId, endGame }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get(`/api/game/questions/${difficultyId}`);
            setQuestions(response.data);
        };
        fetchQuestions();
    }, [difficultyId]);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setIsGameOver(true);
        }
    };

    if (isGameOver) {
        endGame(score);
        return null;
    }

    const question = questions[currentQuestionIndex];

    return (
        <div>
            <h2>Pontuação: {score}</h2>
            <h3>{question?.questionText}</h3>
            <div>
                {question?.alternatives.map((alt) => (
                    <button key={alt.id} onClick={() => handleAnswer(alt.isCorrect)}>
                        {alt.alternativeText}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Game;