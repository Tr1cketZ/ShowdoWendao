import { useEffect, useState } from 'react'

export default function Temporizador({ setParar, numeroPergunta }) {
    const [temporizador, setTemporizador] = useState(30);

    useEffect(() => {
        // Se o temporizador acabar, para o quiz
        if (temporizador === 0) return setParar(true);
        const intervalo = setInterval(() => {
            setTemporizador(prev => prev - 1);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [setParar, temporizador]);

    useEffect(() => {
        // Se o número da pergunta mudar, o temporizador será resetado para 30
        setTemporizador(30);
    }, [numeroPergunta]);

    return temporizador;
}
