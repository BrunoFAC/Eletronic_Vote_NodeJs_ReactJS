import React from 'react';
import zxcvbn from 'zxcvbn';

const VerificacaoPassword = ({ password }) => {
  const passwordteste = zxcvbn(password);
  const num = passwordteste.score * 100/4;

  const resultadosDaPW = () => {
    switch(passwordteste.score) {
      case 0:
        return 'Palavra-passe muito fraca';
      case 1:
        return 'Palavra-passe fraca'; //4 letras diferentes
      case 2:
        return 'Palavra-passe média'; //4 letras diferentes + 3 letras
      case 3:
        return 'Palavra-passe forte'; //4 letras diferentes + 3 letras + ( combinação de 1 letra com 1 numero ou 2 numeros)
      case 4:
        return 'Palavra-passe muito forte'; //4 letras diferentes + 3 letras + (combinação de 1 letra com 1 numero ou 2 numeros) + 3 caracteres
      default:
        return '';
    }
  }

  const corProgressiva = () => {
    switch(passwordteste.score) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#9bc158';
      case 4:
        return '#00b500';
      default:
        return 'none';
    }
  }

  const mudarCorDaPassword = () => ({
    width: `${num}%`,
    background: corProgressiva(),
    height: '7px'
  })

  return (
    <>
      <div className="progress" style={{ height: '7px' }}>
        <div className="progress-bar" style={mudarCorDaPassword()}></div>
      </div>
      <p style={{ color: corProgressiva() }}>{resultadosDaPW()}</p>
    </>
  )
}

export default VerificacaoPassword