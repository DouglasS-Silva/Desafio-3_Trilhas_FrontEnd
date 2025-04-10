document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("form");
    const botaoInscricao = document.getElementById("botao-inscricao");
    const checkTermos = document.querySelector(".termos-condicoes input");
    const trilhas = document.querySelectorAll('input[name="area-selecionada"]');
    const cepInput = document.getElementById("CEP");
    const botaoCancelar = document.getElementById("botao-cancelar");

    cepInput.addEventListener("blur", function () {
        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        // Verifica se o CEP tem 8 dígitos
        if (cep.length === 8) {
            buscarEndereco(cep);
        } else {
            mostrarErro(cepInput, "CEP inválido. Digite 8 dígitos.");
        }
    });

    function buscarEndereco(cep) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    mostrarErro(document.getElementById("CEP"), "CEP não encontrado.");
                } else {
                    // Preenche os campos de endereço automático
                    document.getElementById("rua").value = data.logradouro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("estado").value = data.uf;
                }
            })
            .catch(() => {
                mostrarErro(document.getElementById("CEP"), "Erro ao buscar o CEP.");
            });
    }

    Inputmask({
        mask: '999.999.999-99', // Máscara para CPF
        placeholder: '000.000.000-00' // Placeholder
    }).mask(document.getElementById('CPF'));

    Inputmask({
        mask: '(99) 9 9999-9999', // Máscara para Telefone
        placeholder: '(00) 0 0000-0000' // Placeholder
    }).mask(document.getElementById('telefone'));

    Inputmask({
        mask: '99/99/9999', // Máscara para Data de Nascimento
        placeholder: 'dd/mm/aaaa' // Placeholder
    }).mask(document.getElementById('dataDeNascimento'));

    Inputmask({
        mask: '99999-999', // Máscara para o CEP
        placeholder: '00000-000'
    }).mask(document.getElementById('CEP'));

    const inputs = document.querySelectorAll("input, select");
    inputs.forEach(input => {
        input.addEventListener("focus", function () {
            this.style.borderColor = "#E43A12";
        });
        input.addEventListener("blur", function () {
            this.style.borderColor = "#D6D3D1";
        });
    });

    botaoInscricao.addEventListener("click", function (event) {
        event.preventDefault();

        // Limpar mensagens de erro anteriores
        document.querySelectorAll(".erro").forEach(erro => erro.remove());

        // Verificar campos obrigatórios
        const nomeCompleto = document.getElementById("nomeCompleto");
        const email = document.getElementById("email");
        const telefone = document.getElementById("telefone");
        const dataDeNascimento = document.getElementById("dataDeNascimento");
        const CPF = document.getElementById("CPF");
        const sexo = document.getElementById("sexo");
        const CEP = document.getElementById("CEP");
        const numero = document.getElementById("numero");
        const documentoIdentidade = document.getElementById("documento-identidade");
        const comprovanteResidencial = document.getElementById("comprovante-residencial");
        const usuario = document.getElementById("usuarioID");
        const senha = document.getElementById("senhaUsuario");

        let valido = true;

        if (!nomeCompleto.value) {
            mostrarErro(nomeCompleto, "Por favor, insira seu nome completo.");
            valido = false;
        }

        if (!email.value) {
            mostrarErro(email, "Por favor, insira seu e-mail.");
            valido = false;
        } else if (!validarEmail(email.value)) {
            mostrarErro(email, "Por favor, insira um e-mail válido.");
            valido = false;
        }

        if (!telefone.value) {
            mostrarErro(telefone, "Por favor, insira seu telefone.");
            valido = false;
        }

        if (!dataDeNascimento.value) {
            mostrarErro(dataDeNascimento, "Por favor, preencha a data de nascimento.");
            valido = false;

        }

        if (!CPF.value) {
            mostrarErro(CPF, "Por favor, preencha o CPF.");
            valido = false;
        }

        if (!sexo.value) {
            mostrarErro(sexo, "Por favor, escolha o Sexo.");
            valido = false;
        }

        if (!CEP.value) {
            mostrarErro(CEP, "Por favor, preencha o CEP.");
            valido = false;
        }

        if (!numero.value) {
            mostrarErro(numero, "Por favor, insira o número da residência.");
            valido = false;
        }

        if (!documentoIdentidade.files || documentoIdentidade.files.length === 0) {
            mostrarErro(documentoIdentidade, "Por favor, selecione o documento de identidade.");
            valido = false;
        }

        if (!comprovanteResidencial.files || comprovanteResidencial.files.length === 0) {
            mostrarErro(comprovanteResidencial, "Por favor, selecione o comprovante residencial.");
            valido = false;
        }

        if (!usuario.value) {
            mostrarErro(usuario, "Escreva seu nome de Usuário.");
            valido = false;
        }

        if (!senha.value) {
            mostrarErro(senha, "Crie sua senha por favor.");
            valido = false;
        }

        // Verificar se uma trilha foi selecionada
        let trilhaSelecionada = false;
        trilhas.forEach(trilha => {
            if (trilha.checked) {
                trilhaSelecionada = true;
            }
        });


        if (!trilhaSelecionada) {
            const trilhasContainer = document.querySelector(".subtitulo-aprendizagem");
            mostrarErro(trilhasContainer, "Por favor, selecione uma trilha.");
            valido = false;
        }

        // Verificar termos e condições
        if (!checkTermos.checked) {
            mostrarErro(checkTermos, "Você precisa aceitar os termos e condições.");
            valido = false;
        }

        // Se tudo estiver válido, exibir o loading e o pop-up
        if (valido) {
            const loading = document.getElementById("loading");
            loading.style.display = "block";

            setTimeout(function () {
                loading.style.display = "none";

                // Pop-up de confirmação
                const popup = document.createElement("div");
                popup.className = "popup-inscricao";
                popup.innerHTML = `
                <div class="popup-content">
                    <h2>Inscrição realizada!</h2>
                    <p>Você se inscreveu com sucesso na trilha escolhida.</p>
                    <p>Confirmação enviada para seu e-mail!</p>
                    <button id="fecharPopup">Fechar</button>
                </div>
                `;
                document.body.appendChild(popup);

                
                document.getElementById("fecharPopup").addEventListener("click", function () {
                    popup.remove();
                });
            }, 2000);
        }
    });

    botaoCancelar.addEventListener("click", function () {
        // Limpa o LocalStorage
        localStorage.removeItem("dadosInscricaoTemporarios");
        localStorage.removeItem("dadosSalvosIntencionalmente");

        // Limpa todos os campos do formulário
        document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"])').forEach(input => {
            input.value = '';
        });


        document.querySelectorAll('select').forEach(select => {
            select.value = '';
        });

        
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });

        
        document.getElementById("termos").checked = false;

        // Feedback visual
        mostrarFeedback("Dados removidos com sucesso!", "#E43A12");

        // Redireciona para a página de login
        setTimeout(() => {
            window.location.href = "pgLogin.html";
        }, 1500);
    });
    // Função para exibir mensagens de erro
    function mostrarErro(campo, mensagem) {
        let erroExistente;

        
        if (campo.classList && (campo.classList.contains("subtitulo-aprendizagem") || campo.classList.contains("trilhas-aprendizagem"))) {
            erroExistente = document.querySelector(".subtitulo-aprendizagem .erro");
            const containerErro = document.querySelector(".subtitulo-aprendizagem");

            if (!erroExistente) {
                erroExistente = document.createElement("p");
                erroExistente.classList.add("erro");
                containerErro.appendChild(erroExistente);
            }
        } else {
            erroExistente = campo.parentNode.querySelector(".erro");
            if (!erroExistente) {
                erroExistente = document.createElement("p");
                erroExistente.classList.add("erro");
                campo.parentNode.appendChild(erroExistente);
            }
        }

        erroExistente.textContent = mensagem;
        erroExistente.style.color = "red";
        erroExistente.style.fontSize = "14px";
    }

    // Função para remover erro quando o usuário começa a digitar/preencher o campo
    function removerErro(campo) {
        let erro = campo.parentNode.querySelector(".erro");
        if (erro) {
            erro.remove();
        }
    }

    
    const camposTexto = ["nomeCompleto", "email", "telefone", "dataDeNascimento", "CPF", "CEP", "numero"];
    const camposSelect = ["sexo"];
    const camposArquivo = ["documento-identidade", "comprovante-residencial"];

    
    camposTexto.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener("input", () => removerErro(campo));
        }
    });

    
    camposSelect.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener("change", () => removerErro(campo));
        }
    });

    
    camposArquivo.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener("change", () => removerErro(campo));
        }
    });

    
    checkTermos.addEventListener("change", function () {
        removerErro(checkTermos);
    });
    
    trilhas.forEach(trilha => {
        trilha.addEventListener("change", function () {
            const erro = document.querySelector(".subtitulo-aprendizagem .erro");
            if (erro) {
                erro.remove();
            }
        });
    });

    // Função para validar e-mail
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Botão Salvar Informações
    const botaoSalvar = document.getElementById("botao-salvar");
    botaoSalvar.addEventListener("click", function () {
        salvarDadosTemporarios();
        mostrarFeedback("Dados salvos temporariamente!", "#2135A6");
    });

    // Função para mostrar feedback visual
    function mostrarFeedback(mensagem, cor) {
        
        const feedbacksAntigos = document.querySelectorAll(".feedback-salvo");
        feedbacksAntigos.forEach(feedback => feedback.remove());

        const feedback = document.createElement("div");
        feedback.className = "feedback-salvo";
        feedback.textContent = mensagem;
        feedback.style.position = "fixed";
        feedback.style.bottom = "20px";
        feedback.style.right = "20px";
        feedback.style.backgroundColor = cor;
        feedback.style.color = "white";
        feedback.style.padding = "12px 24px";
        feedback.style.borderRadius = "8px";
        feedback.style.zIndex = "1000";
        feedback.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        feedback.style.animation = "fadeIn 0.3s ease-in-out";

        document.body.appendChild(feedback);

        // Remove o feedback após 3 segundos
        setTimeout(() => {
            feedback.style.animation = "fadeOut 0.3s ease-in-out";
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }

    // Função para salvar dados no LocalStorage
    function salvarDadosTemporarios() {
        const dadosFormulario = {
            nomeCompleto: document.getElementById("nomeCompleto").value,
            dataDeNascimento: document.getElementById("dataDeNascimento").value,
            CPF: document.getElementById("CPF").value,
            sexo: document.getElementById("sexo").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            CEP: document.getElementById("CEP").value,
            rua: document.getElementById("rua").value,
            numero: document.getElementById("numero").value,
            cidade: document.getElementById("cidade").value,
            estado: document.getElementById("estado").value,
            usuarioID: document.getElementById("usuarioID").value,
            trilhaSelecionada: document.querySelector('input[name="area-selecionada"]:checked')?.id,
            termosAceitos: document.getElementById("termos").checked
        };

        localStorage.setItem("dadosInscricaoTemporarios", JSON.stringify(dadosFormulario));
        localStorage.setItem("dadosSalvosIntencionalmente", "true");
        const usuario = document.getElementById("usuarioID").value;
        const senha = document.getElementById("senhaUsuario").value;

        if (usuario && senha) {
            localStorage.setItem("usuarioCadastrado", JSON.stringify({
                usuario: usuario,
                senha: senha
            }));
        }

    }

    // Função para carregar dados salvos
    function carregarDadosTemporarios() {
        if (localStorage.getItem("dadosSalvosIntencionalmente") === "true") {
            const dadosSalvos = localStorage.getItem("dadosInscricaoTemporarios");
            if (dadosSalvos) {
                const dados = JSON.parse(dadosSalvos);

                // Preenche os campos com os dados salvos
                document.getElementById("nomeCompleto").value = dados.nomeCompleto || "";
                document.getElementById("dataDeNascimento").value = dados.dataDeNascimento || "";
                document.getElementById("CPF").value = dados.CPF || "";
                document.getElementById("sexo").value = dados.sexo || "";
                document.getElementById("email").value = dados.email || "";
                document.getElementById("telefone").value = dados.telefone || "";
                document.getElementById("CEP").value = dados.CEP || "";
                document.getElementById("rua").value = dados.rua || "";
                document.getElementById("numero").value = dados.numero || "";
                document.getElementById("cidade").value = dados.cidade || "";
                document.getElementById("estado").value = dados.estado || "";
                document.getElementById("usuarioID").value = dados.usuarioID || "";

                // Marca a trilha selecionada
                if (dados.trilhaSelecionada) {
                    document.getElementById(dados.trilhaSelecionada).checked = true;
                }

                // Marca os termos se estavam aceitos
                document.getElementById("termos").checked = dados.termosAceitos || false;
            }
        }
    }

    carregarDadosTemporarios();

    // Adiciona animações de fadeIn e fadeOut para o feedback
    const style = document.createElement("style");
    style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }`;
    document.head.appendChild(style);

    function setupPasswordToggle() {
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', function () {
                const input = this.parentElement.querySelector('input');
                const icon = this.querySelector('.eye-icon');

                if (input.type === 'password') {
                    input.type = 'text';
                    icon.src = 'Icones/eye-hide.svg';
                    icon.alt = 'Ocultar senha';
                } else {
                    input.type = 'password';
                    icon.src = 'Icones/eye-open.svg';
                    icon.alt = 'Mostrar senha';
                }
            });
        });
    }

    setupPasswordToggle();
});

