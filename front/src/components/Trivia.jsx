import React, { useEffect, useState } from 'react'
import { ListaDePerguntas } from '../data/questions';
import useSound from "use-sound";
import tocarInicio from "../assets/sounds_play.mp3";
import somCorreto from "../assets/sounds_correct.mp3";
import somErrado from "../assets/sounds_wrong.mp3";

export default function Trivia({ setParar, setNumeroPergunta, numeroPergunta }) {
    // Estado para uma única pergunta
    const [pergunta, setPergunta] = useState(null);
    // Estado para a resposta selecionada
    const [respostaSelecionada, setRespostaSelecionada] = useState(null);
    // Estado para os nomes das classes que causam animação na opção selecionada
    const [classe, setClasse] = useState("resposta");

    // Som para resposta correta
    const [respostaCorreta] = useSound(somCorreto);
    // Som para resposta errada
    const [respostaErrada] = useSound(somErrado);
    // Som inicial para o início do quiz
    const [iniciarSom] = useSound(tocarInicio);

    useEffect(() => {
        // Tocar o som ao montar o componente
        iniciarSom();
    }, [iniciarSom]);

    useEffect(() => {
        // Definir a pergunta da lista de perguntas
        setPergunta(ListaDePerguntas[numeroPergunta - 1]);
    }, [numeroPergunta]);

    // Função personalizada para timeout com duração e uma função de callback como parâmetros
    const atraso = (duracao, callback) => {
        setTimeout(() => {
            callback();
        }, duracao);
    };

    const handleClick = (resposta) => {
        setRespostaSelecionada(resposta);
        setClasse("resposta ativa");
        atraso(3000, () => setClasse(resposta.correta ? "resposta correta" : "resposta errada"));
        atraso(5000, () => {
            if (resposta.correta) {
                respostaCorreta();
                atraso(1000, () => {
                    if (ListaDePerguntas.length !== numeroPergunta) {
                        setNumeroPergunta(prev => prev + 1);
                        setRespostaSelecionada(null);
                    } else {
                        setParar(true);
                        setNumeroPergunta(1);
                        setRespostaSelecionada(null);
                    }
                });
            } else {
                respostaErrada();
                atraso(1000, () => {
                    setParar(true);
                });
            }
        });
    };

    return (
        <div className='trivia'>
            <div className="pergunta">{pergunta?.pergunta}</div>
            <div className="respostas">
                {
                    pergunta?.respostas.map((resposta) => (
                        <div className={respostaSelecionada === resposta ? classe : "resposta"} onClick={() => handleClick(resposta)}>{resposta.texto}</div>
                    ))
                }
            </div>
        </div>
    )
}
