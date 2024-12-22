import React, { useState } from "react";
import Concluidos from "./Concluidos";
import '../styles/History.css';

export default function History() {
    const [lavagensConcluidas, setLavagensConcluidas] = useState([]);

    return (
        <section className="container-history">
            <h1>Histórico de Lavagens</h1>
            <Concluidos setLavagensConcluidas={setLavagensConcluidas} />
        </section>
    );
}