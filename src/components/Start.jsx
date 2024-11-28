import React, { useRef, useState } from 'react'
import { GithubLogo } from "phosphor-react"
import useSound from "use-sound";
import game from "../assets/main.mp3";

export default function Inicio({ setNomeUsuario, nomeUsuario }) {
    // Mensagem de erro
    const [erro, setErro] = useState(false);
    // Referência do input
    const inputRef = useRef();

    const [tocarJogo, { stop }] = useSound(game);

    const handleClick = () => {
        // Se o campo de entrada estiver vazio, define erro como true; caso contrário, define o valor como o nome do usuário
        if (inputRef.current.value === "") {
            setErro(true);
        } else {
            // Para o som
            stop();
            setNomeUsuario(inputRef.current.value);
        }
    }

    return (
        <div className='inicio'>
            <div className="conteudo">
                <div className="github">
                    <a href="https://github.com/Signor1" target='_blank' rel='noreferrer'>
                        <GithubLogo size={25} />
                    </a>
                </div>
                <div className="wrapper">
                    <label>Digite seu nome de usuário para começar</label>
                    <input 
                        type="text" 
                        placeholder='Digite seu nome de usuário' 
                        className='inputInicio' 
                        ref={inputRef} 
                        onFocus={() => tocarJogo()} 
                    />
                    {
                        erro && <code>Digite o nome de usuário!</code>
                    }
                    <div className="btn">
                        <button className='botaoInicio' onClick={handleClick}>Iniciar Quiz</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
