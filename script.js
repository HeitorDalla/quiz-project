"use strict";

// Variáveis Globais dos Containers
const inicio = document.querySelector("#inicio");
const perguntas = document.querySelector("#perguntas");
const resultado = document.querySelector("#resultado");

const dados = {
    textosPerguntas: [],
    perguntaEscolhida: [],
};

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

const todasPerguntas = [...perguntas.querySelectorAll("#perguntas .pergunta")]; // Vai pegar todas as perguntas
let indicePergunta = 0; // Vai controlar qual pergunta vai estar sendo exibida

// Funcao para exibir pergunta com base no indice global
function mostrarPerguntas (indice) {
    todasPerguntas.forEach((pergunta) => { // Desativar todas as perguntas
        pergunta.style.display = 'none';
    });

    const perguntaAtual = todasPerguntas[indice];

    // Pegar todos os texto das perguntas
    const textoPergunta = perguntaAtual.querySelector(".perguntaQuiz");
    dados.textosPerguntas.push(textoPergunta.textContent);
    
    perguntaAtual.style.display = 'block';

    // Funcionalidades do botao de enviar resposta
    const enviarResposta = perguntaAtual.querySelector(".enviarResposta");
    enviarResposta.addEventListener("click", (event) => {
        event.preventDefault();

        const respostaSelecionada = perguntaAtual.querySelector("input:checked");

        // Verificando se foi selecionado uma resposta
        if (respostaSelecionada) {
            // Adicionando cada resposta que selecionei
            const textoInputSelecionado = respostaSelecionada.parentElement.textContent.trim();
            dados.perguntaEscolhida.push(textoInputSelecionado);

            if (indice < todasPerguntas.length - 1) {
                indicePergunta ++;
                mostrarPerguntas(indicePergunta);
                mostrarResultado();
            } else {
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
function mostrarResultado () {
    const containerResposta = document.querySelector("#resultado #resposta");
    containerResposta.innerHTML = '';

    const divResultado = document.createElement("div");
    divResultado.setAttribute("class", "resultado")

    divResultado.innerHTML = `
            <p><strong> Pergunta: ${dados.textosPerguntas} </strong></p>
            <p><strong> Resposta Selecionada: ${dados.perguntaEscolhida} </strong></p>
            <p><strong> Resposta Correta: ${perguntaResposta} </strong></p>
        `;
    containerResposta.appendChild(divResultado);
};

// Funcionalidades do botao de iniciar quiz
const iniciarQuiz = document.querySelector("#inicio #iniciarQuiz");
iniciarQuiz.addEventListener("click", (event) => {
    event.preventDefault();

    inicio.style.display = 'none'; // Esconde o container inicio
    perguntas.style.display = 'block'; // Introduso o container das perguntas

    mostrarPerguntas(indicePergunta); // Vai mostrar a pergunta com base em seu indice
});

