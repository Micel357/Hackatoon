document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quizForm");
    const resultadoDiv = document.getElementById("resultado");
    const nomeResultado = document.getElementById("nome-resultado");
    const pontuacaoResultado = document.getElementById("pontuacao-resultado");
    const faixaResultado = document.getElementById("faixa-resultado");
    const nomeInput = document.getElementById("nome");

    // Respostas corretas
    const respostasCorretas = {
        Q1: "Op1",
        Q2: "O3",
        Q3: "P3",
        Q4: "M4",
        Q5: "A1",
        Q6: "B3",
        Q7: "C2",
        Q8: "D2",
        Q9: "E3",
        Q10: "F1",
        Q11: "Um tipo de malware que registra teclas digitadas em um teclado para roubar informações",
Q12: "Detectar e remover malware do sistema",
Q13: "Manipulação psicológica de pessoas para obter informações úteis",
Q14: "Gerenciamento de informações e eventos de segurança",
Q15:  "Firewalls, Antivírus e Antimalware, Criptografia,  Autenticação Multifator (MFA), Backups de Dados, Treinamento de Conscientização em Segurança, Monitoramento de Rede, Segurança em Nuvem, Políticas de Segurança, Respostas a Incidentes, Gerenciamento de Patches",
    };

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio do formulário
        let pontuacao = 0;

        // Calcula a pontuação
        for (const [questao, respostaCorreta] of Object.entries(respostasCorretas)) {
            const respostaSelecionada = form.querySelector(`input[name="${questao}"]:checked`);
            if (respostaSelecionada && respostaSelecionada.id === respostaCorreta) {
                pontuacao++;
            }
        }

        // Exibe o resultado
        const nome = nomeInput.value || "Anônimo";
        nomeResultado.textContent = `Seu nome: ${nome}`;
        pontuacaoResultado.textContent = `Você acertou ${pontuacao} de ${Object.keys(respostasCorretas).length} perguntas.`;

        // Define a faixa de acordo com a pontuação
        if (pontuacao <= 5) {
            faixaResultado.textContent = "Faixa: Iniciante";
        } else if (pontuacao <= 8) {
            faixaResultado.textContent = "Faixa: Intermediário";
        } else {
            faixaResultado.textContent = "Faixa: Avançado";
        }

        resultadoDiv.style.display = "block"; // Exibe a div de resultado
    });
});
