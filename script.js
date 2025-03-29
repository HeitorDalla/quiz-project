"use strict";

// Variáveis Globais dos Containers
const inicio = document.querySelector("#inicio");
const perguntas = document.querySelector("#perguntas");
const resultado = document.querySelector("#resultado");

const todasPerguntas = [...perguntas.querySelectorAll("#perguntas .pergunta")]; // Vai pegar todas as perguntas
let indicePergunta = 0; // Vai controlar qual pergunta vai estar sendo exibida

// Funcao para exibir pergunta com base no indice global
function mostrarPerguntas (indice) {

    todasPerguntas.forEach((pergunta) => { // Desativar todas as perguntas
        pergunta.style.display = 'none';
    });

    const perguntaAtual = todasPerguntas[indice];
    perguntaAtual.style.display = 'block';

    // Funcionalidades do botao de enviar resposta
    const enviarResposta = perguntaAtual.querySelector(".enviarResposta");
    enviarResposta.addEventListener("click", (event) => {
        event.preventDefault();

        const respostaSelecionada = perguntaAtual.querySelector("input:checked");

        if (respostaSelecionada) {
            if (indice < todasPerguntas.length - 1) {
                indicePergunta ++;
                mostrarPerguntas(indicePergunta);
            } else {
                resultado.style.display = 'block';
                perguntaAtual.style.display = 'none';
                perguntas.style.display = 'none'; // Oculta o container das perguntas
            }
        } else {
            alert("Por favor, selecione uma resposta antes de avançar!");
        }
    });
};

// Funcionalidades do botao de iniciar quiz
const iniciarQuiz = document.querySelector("#inicio #iniciarQuiz");
iniciarQuiz.addEventListener("click", (event) => {
    event.preventDefault();

    inicio.style.display = 'none'; // Esconde o container inicio
    perguntas.style.display = 'block'; // Introduso o container das perguntas

    mostrarPerguntas(indicePergunta); // Vai mostrar a pergunta com base em seu indice
});

