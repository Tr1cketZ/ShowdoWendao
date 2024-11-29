import React from 'react';

const Result = ({ score, resetGame }) => {
    return (
        <div>
            <h1>Jogo Terminado</h1>
            <h2>Pontuação Final: {score}</h2>
            <button onClick={resetGame}>Reiniciar Jogo</button>
        </div>
    );
};

export default Result;