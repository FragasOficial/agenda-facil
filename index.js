// Armazena as senhas por especialidade
let senhas = {
    pediatria: 0,
    psiquiatria: 0,
    psicologia: 0
};

// Função para gerar comprovante de agendamento
function gerarComprovante(dados) {
    let comprovante = `
        Comprovante de Agendamento\n
        Nome Completo: ${dados.nome}\n
        RG/CPF: ${dados.rgcpf}\n
        Cartão do SUS: ${dados.sus}\n
        Telefone: ${dados.telefone}\n
        Email: ${dados.email}\n
        Data: ${dados.data}\n
        Especialidade: ${dados.especialidade}\n
        Senha: ${dados.senha}
    `;
    return comprovante;
}

// Função para compartilhar pelo WhatsApp
function compartilharWhatsApp(comprovante) {
    let numero = "5588993754503"; // número com DDI e DDD
    let mensagem = "Este é meu agendamento conforme comprovante em anexo.\n" + encodeURIComponent(comprovante);
    let url = `https://api.whatsapp.com/send?phone=${numero}&text=${mensagem}`;
    window.open(url, "_blank");
}

// Função para agendar consulta e gerar senha
function agendarConsulta(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os dados do formulário
    let nome = document.getElementById("nome").value;
    let rgcpf = document.getElementById("rgcpf").value;
    let sus = document.getElementById("sus").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;
    let data = document.getElementById("data").value;
    let especialidade = document.getElementById("especialidade").value;

    // Verifica se ainda há senhas disponíveis para a especialidade
    if (senhas[especialidade] < 10) {
        // Incrementa o número de senhas
        senhas[especialidade] += 1;
        let senha = senhas[especialidade];

        // Gera o comprovante
        let dadosAgendamento = {
            nome: nome,
            rgcpf: rgcpf,
            sus: sus,
            telefone: telefone,
            email: email,
            data: data,
            especialidade: especialidade,
            senha: senha
        };

        let comprovante = gerarComprovante(dadosAgendamento);

        // Compartilha o comprovante via WhatsApp
        compartilharWhatsApp(comprovante);

        // Mostra uma mensagem de sucesso
        alert(`Consulta agendada com sucesso! Sua senha é: ${senha}`);
    } else {
        alert(`As senhas para ${especialidade} já estão esgotadas para hoje.`);
    }
}

// Adiciona o evento ao botão de agendar
document.querySelector("form").addEventListener("submit", agendarConsulta);
