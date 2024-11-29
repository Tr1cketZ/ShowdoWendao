import React from 'react';

const Home = ({ startGame }) => {
    return (
        <div>
            <h1>Show do Milhão</h1>
            <h2>Escolha a Dificuldade</h2>
            <button onClick={() => startGame(1)}>Médio</button>
            <button onClick={() => startGame(2)}>Difícil</button>
        </div>
    );
};

export default Home;