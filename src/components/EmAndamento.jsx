import React from 'react';
import WashList from './WashList';

const EmAndamento = () => {
  return (
    <div>
      <h2>Lavagens em Andamento</h2>
      <WashList status="em andamento" />
    </div>
  );
};

export default EmAndamento;
