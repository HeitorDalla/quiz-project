"use strict";

const dados = {
    textoPergunta: null,
    opcaoSelecionada: null,
    acertosErros: {
        quantiadeAcertos: 0,
        quantidadeErros: 0
    }
};

// Variáveis Globais dos Containers
const inicio = document.querySelector("#inicio");
const perguntas = document.querySelector("#perguntas");
const resultado = document.querySelector("#resultado");

let perguntaResposta = [
    'Elefante Africano',
    'Leão',
    'Baleia Azul',
    '9',
    'Falcão Peregrino',
    'Cobra',
    'Baleia Azul',
    'Herbívoro',
    'Elefante',
    'Canguru'
];

let indicePergunta = 0; // Vai controlar qual pergunta vai estar sendo exibida

// Funcao para exibir pergunta com base no indice global
function mostrarPerguntas (indice) {

    // Vai desativar todas as perguntas
    const todasPerguntas = [...perguntas.querySelectorAll(".pergunta")];
    todasPerguntas.forEach((pergunta) => { 
        pergunta.style.display = 'none';
    });

    const perguntaAtual = todasPerguntas[indice]; // Vai pegar o container da pergunta atual
    perguntaAtual.style.display = 'block'; // Vai fazer aparecer o container da pergunta atual

    // Funcionalidades do botao de enviar resposta
    const enviarResposta = perguntaAtual.querySelector(".enviarResposta");
    enviarResposta.addEventListener("click", (event) => {
        event.preventDefault();

        const textoPergunta = perguntaAtual.querySelector(".perguntaQuiz"); // Pegar o container da pergunta
        dados.textoPergunta = textoPergunta.textContent; // Adicionar o texto da pergunta dentro do objeto

        const respostaSelecionada = perguntaAtual.querySelector("input:checked"); // Pegar a radio selecionado

        // Verificando se foi selecionado uma resposta
        if (respostaSelecionada) {

            const textoInputSelecionado = respostaSelecionada.parentElement.textContent.trim(); // Pegar o texto de dentro do radio selecionado
            dados.opcaoSelecionada = textoInputSelecionado; // Adicionar a resposta ao objeto

            if (indice < todasPerguntas.length - 1) {

                if (dados.opcaoSelecionada === perguntaResposta[indice]) {
                    dados.acertosErros.quantiadeAcertos += 1;
                } else {
                    dados.acertosErros.quantidadeErros += 1;
                }

                contabilizarResultado();
                indicePergunta ++;
                mostrarPerguntas(indicePergunta);
            } else {
                if (dados.opcaoSelecionada === perguntaResposta[indice]) {
                    dados.acertosErros.quantiadeAcertos += 1;
                } else {
                    dados.acertosErros.quantidadeErros += 1;
                }

                contabilizarResultado();
                resultado.style.display = 'block';
                perguntaAtual.style.display = 'none';
                perguntas.style.display = 'none';
            }
        } else {
            alert("Por favor, selecione uma resposta antes de avançar!");
        }
    });
};

// Função para mostrar o resultado de todas as perguntas
function contabilizarResultado () {
    const textoResultado = resultado.querySelector("#textoResposta");

    
    const containerResposta = document.querySelector("#resultado #resposta");

    const divResultado = document.createElement("div");
    divResultado.setAttribute("class", "resultado")

    divResultado.innerHTML = `
            <p> Pergunta: ${dados.textoPergunta} </p>
            <p> Resposta Selecionada: ${dados.opcaoSelecionada} </p>
            <p> Resposta Correta: ${perguntaResposta[indicePergunta]} </p>
        `;
    containerResposta.appendChild(divResultado);
};

// Funcionalidades do botao de iniciar quiz
const iniciarQuiz = document.querySelector("#inicio #iniciarQuiz");
iniciarQuiz.addEventListener("click", (event) => {
    event.preventDefault();

    inicio.style.display = 'none'; // Esconde o container inicio
    perguntas.style.display = 'block'; // Introduz o container das perguntas

    mostrarPerguntas(indicePergunta); // Vai mostrar a pergunta com base em seu indice
});