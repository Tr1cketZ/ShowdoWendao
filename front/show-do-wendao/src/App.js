import React, { useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import Result from './components/Result';

const App = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [difficultyId, setDifficultyId] = useState(null);

    const startGame = (difficulty) => {
        setDifficultyId(difficulty);
        setGameStarted(true);
    };

    const endGame = (finalScore) => {
        setScore(finalScore);
        setGameStarted(false);
    };

    return (
        <div>
            {!gameStarted && !score && <Home startGame={startGame} />}
            {gameStarted && <Game difficultyId={difficultyId} endGame={endGame} />}
            {!gameStarted && score > 0 && <Result score={score} resetGame={() => setScore(0)} />}
        </div>
    );
};

export default App;