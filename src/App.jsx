import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { PiramidePremios } from "./data/MoneyPyramid";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Inicio from "./components/Start";
import { PremiosGanhos } from "./components/Earned";
import { ListaDePerguntas } from './data/questions';

function App() {
  // Nome do usuário
  const [nomeUsuario, setNomeUsuario] = useState(null);
  // Pergunta - Configurando o número atual da pergunta
  const [numeroPergunta, setNumeroPergunta] = useState(1);
  // Estado para definir quando o jogo para
  const [parar, setParar] = useState(false);
  // Estado para definir o valor ganho
  const [ganhos, setGanhos] = useState("0");

  // Usando o hook useMemo para manter os dados da pirâmide de prêmios
  const DadosPiramidePremios = useMemo(() => PiramidePremios, []);

  useEffect(() => {
    // Se o comprimento da lista de perguntas for diferente de numeroPergunta,
    // define o valor ganho para o valor correspondente ao numeroPergunta - 1 e ao id da pirâmide.
    // Caso contrário, define para o valor correspondente ao numeroPergunta e id.
    if (ListaDePerguntas.length !== numeroPergunta) {
      numeroPergunta > 1 && setGanhos(PiramidePremios.find((m) => m.id === numeroPergunta - 1).valor);
    } else {
      numeroPergunta > 1 && setGanhos(PiramidePremios.find((m) => m.id === numeroPergunta).valor);
    }
  }, [numeroPergunta]);

  // Formatando valores monetários
  const converter = (num) => {
    const formatoLocal = new Intl.NumberFormat("pt-BR").format(num);
    return formatoLocal;
  };

  return (
    <div className="app">
      {nomeUsuario ? (
        <>
          <div className="principal">
            {parar ? (
              <PremiosGanhos
                ganhos={ganhos}
                setNomeUsuario={setNomeUsuario}
                nomeUsuario={nomeUsuario}
                setParar={setParar}
                setNumeroPergunta={setNumeroPergunta}
                setGanhos={setGanhos}
              />
            ) : (
              <>
                <div className="topo">
                  <div className="cronometro">
                    <Timer setParar={setParar} numeroPergunta={numeroPergunta} />
                  </div>
                </div>
                <div className="base">
                  <Trivia
                    setParar={setParar}
                    setNumeroPergunta={setNumeroPergunta}
                    numeroPergunta={numeroPergunta}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pirâmide">
            <ul className="listaPremios">
              {DadosPiramidePremios.map((premio) => (
                <li
                  className={
                    numeroPergunta === premio.id
                      ? "itemListaPremios ativo"
                      : "itemListaPremios"
                  }
                >
                  <span className="numeroItemLista">{premio.id}</span>
                  <span className="valorItemLista">R$ {converter(premio.valor)}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Inicio setNomeUsuario={setNomeUsuario} nomeUsuario={nomeUsuario} />
      )}
    </div>
  );
}

export default App;
