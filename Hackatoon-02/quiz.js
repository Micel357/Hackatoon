document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quizForm");
    const resultadoDiv = document.getElementById("resultado");
    const nomeResultado = document.getElementById("nome-resultado");
    const pontuacaoResultado = document.getElementById("pontuacao-resultado");
    const faixaResultado = document.getElementById("faixa-resultado");
    const nomeInput = document.getElementById("nome");

    // Respostas corretas para todas as 15 questões
    const respostasCorretas = {
        Q1: "Op1",   // Segurança de Rede, Segurança de Dados
        Q2: "O3",    // Ransomware, Malware
        Q3: "P3",    // Confidencialidade, Integridade e Disponibilidade
        Q4: "M4",    // Firewalls
        Q5: "A1",    // IA pode ser usada para detectar ameaças e anomalias
        Q6: "B3",    // Todos os funcionários têm um papel na cibersegurança
        Q7: "C2",    // As senhas podem ser facilmente lembradas (INCORRETA)
        Q8: "D2",    // Adicionar camadas extras de segurança
        Q9: "E3",    // Capturar informações pessoais e credenciais
        Q10: "F1",   // Um programa que criptografa arquivos
        Q11: "G1",   // Um tipo de malware que registra teclas
        Q12: "H2",   // Detectar e remover malware
        Q13: "I2",   // Manipulação psicológica de pessoas
        Q14: "J2",   // Gerenciamento de informações e eventos de segurança
        Q15: "K1",   // Todas as medidas de proteção
    };

    // Definições de faixas baseadas na pontuação
    const faixas = {
        branco: {
            min: 0,
            max: 5,
            nome: "Faixa: Branco",
            descricao: "Iniciante em Cibersegurança",
            emoji: "🤍",
            mensagem: "Você está começando sua jornada em cibersegurança. Continue estudando e praticando!"
        },
        marrom: {
            min: 6,
            max: 10,
            nome: "Faixa: Marrom",
            descricao: "Intermediário em Cibersegurança",
            emoji: "🤎",
            mensagem: "Você tem um bom conhecimento em cibersegurança. Mantenha o aprendizado contínuo!"
        },
        preta: {
            min: 11,
            max: 15,
            nome: "Faixa: Preta",
            descricao: "Especialista em Cibersegurança",
            emoji: "🖤",
            mensagem: "Parabéns! Você é um especialista em cibersegurança!"
        }
    };

    // Função para determinar a faixa baseado na pontuação
    function obterFaixa(pontuacao) {
        if (pontuacao <= faixas.branco.max) {
            return faixas.branco;
        } else if (pontuacao <= faixas.marrom.max) {
            return faixas.marrom;
        } else {
            return faixas.preta;
        }
    }

    // Event listener para o envio do formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Validar se todas as questões foram respondidas
        let todasRespondidas = true;
        for (const questao of Object.keys(respostasCorretas)) {
            const respostaSelecionada = form.querySelector(`input[name="${questao}"]:checked`);
            if (!respostaSelecionada) {
                todasRespondidas = false;
                alert(`Por favor, responda a Questão ${questao.replace('Q', '')}`);
                break;
            }
        }

        if (!todasRespondidas) {
            return;
        }

        // Calcular a pontuação
        let pontuacao = 0;
        for (const [questao, respostaCorreta] of Object.entries(respostasCorretas)) {
            const respostaSelecionada = form.querySelector(`input[name="${questao}"]:checked`);
            if (respostaSelecionada && respostaSelecionada.id === respostaCorreta) {
                pontuacao++;
            }
        }

        // Obter informações do usuário
        const nome = nomeInput.value.trim() || "Participante";
        const faixa = obterFaixa(pontuacao);
        const totalQuestoes = Object.keys(respostasCorretas).length;
        const percentual = Math.round((pontuacao / totalQuestoes) * 100);

        // Atualizar o conteúdo do resultado
        nomeResultado.innerHTML = `${faixa.emoji} <strong>${nome}</strong>`;
        pontuacaoResultado.innerHTML = `Você acertou <strong>${pontuacao} de ${totalQuestoes}</strong> perguntas (${percentual}%)`;
        faixaResultado.innerHTML = `<div style="font-size: 1.3em; margin: 15px 0;">${faixa.nome}</div>
                                    <div style="font-size: 1.05em; opacity: 0.9;">${faixa.descricao}</div>
                                    <div style="font-size: 1em; margin-top: 15px; font-style: italic;">"${faixa.mensagem}"</div>`;

        // Rolar para o resultado
        resultadoDiv.style.display = "flex";
        resultadoDiv.style.flexDirection = "column";
        resultadoDiv.style.justifyContent = "center";
        resultadoDiv.style.alignItems = "center";
        
        // Smooth scroll para o resultado
        setTimeout(() => {
            resultadoDiv.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);

        // Desabilitar o botão de envio
        form.querySelector('button[type="submit"]').disabled = true;
        form.querySelector('button[type="submit"]').textContent = "✓ Respostas Enviadas";
    });

    // Adicionar feedback visual ao selecionar opções
    const radios = form.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener("change", function() {
            // Remover destaque de outras opções na mesma questão
            const questao = this.name;
            const outrasOpcoes = form.querySelectorAll(`input[name="${questao}"]`);
            outrasOpcoes.forEach(opcao => {
                opcao.parentElement.style.opacity = "0.7";
            });
            // Destacar a opção selecionada
            this.parentElement.style.opacity = "1";
            this.parentElement.style.fontWeight = "600";
        });
    });
});
