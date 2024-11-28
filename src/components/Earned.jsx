import React from 'react'

export const Ganhos = ({ ganhos, setGanhos, setNomeUsuario, nomeUsuario, setParar, setNumeroPergunta }) => {
    // Formatação do valor
    const formatar = (num) => {
        const numeroFormatado = new Intl.NumberFormat("pt-BR").format(num);
        return numeroFormatado;
    };

    const handleClick = () => {
        // Resetar o nome do usuário
        setNomeUsuario(null);
        // Resetar ganhos para 0
        setGanhos("0");
        // Resetar o estado de parada
        setParar(false);
        // Resetar o número da pergunta para 1
        setNumeroPergunta(1);
    }

    return (
        <>
            {
                ganhos < 8000 ?
                    <div className='conteudoGanhos'>
                        <div className="conteudo">
                            <h3 className="textoFinal">Você ganhou: R${formatar(ganhos)}</h3>
                            <button onClick={handleClick} className='tenteNovamente'>Tente Novamente</button>
                        </div>
                    </div>
                    :
                    <div className='conteudoGanhos parabens'>
                        <div className="conteudo">
                            <h1 className='textoFinal'>Parabéns {nomeUsuario}</h1>
                            <h3 className="textoFinal">Você ganhou: R${formatar(ganhos)}</h3>
                            <button onClick={handleClick} className='tenteNovamente'>Reiniciar</button>
                        </div>
                    </div>
            }
        </>
    )
}
