document.addEventListener("DOMContentLoaded", function() {
    function setupPasswordToggle() {
        document.querySelectorAll('.password-container').forEach(container => {
            const input = container.querySelector('input');
            const toggle = container.querySelector('.toggle-password');
            const icon = toggle.querySelector('.eye-icon');
            const lock = container.querySelector('.lock-icon');
    
            // Quando digita, troca o ícone
            input.addEventListener('input', () => {
                if (input.value.length > 0) {
                    toggle.classList.add('visible');
                    lock.classList.add('hidden');
                } else {
                    toggle.classList.remove('visible');
                    lock.classList.remove('hidden');
                    input.type = 'password';
                    icon.src = './Icones/eye-open.svg';
                    icon.alt = 'Mostrar senha';
                }
            });
    
            // Lógica do botão de alternar visibilidade
            toggle.addEventListener('click', () => {
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.src = './Icones/eye-hide.svg';
                    icon.alt = 'Ocultar senha';
                } else {
                    input.type = 'password';
                    icon.src = './Icones/eye-open.svg';
                    icon.alt = 'Mostrar senha';
                }
            });
        });
    }
        
    
    function mostrarErro(mensagem) {
        const erroExistente = document.querySelector('.erro-login');
        if (erroExistente) {
            erroExistente.remove();
        }
        
        const erro = document.createElement('p');
        erro.className = 'erro-login';
        erro.textContent = mensagem;
        erro.style.color = 'red';
        erro.style.marginTop = '10px';
        erro.style.textAlign = 'center';
        
        const botoesLogin = document.querySelector('.botoes-login');
        botoesLogin.parentNode.insertBefore(erro, botoesLogin);
    }
    
    function mostrarPopupSucesso(usuario) {
        // Cria overlay para escurecer o background
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        
        // Cria popup
        const popup = document.createElement('div');
        popup.className = 'popup-login';
        popup.innerHTML = `
            <h2>Login realizado com sucesso!</h2>
            <p>Bem-vindo, ${usuario}!</p>
            <button id="fechar-popup">OK</button>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
        
        document.getElementById('fechar-popup').addEventListener('click', function() {
            overlay.remove();
            popup.remove();
        });
    }
    
    document.getElementById('botao-login').addEventListener('click', function(e) {
        e.preventDefault();
        
        const usuarioInput = document.getElementById('idUsuario').value;
        const senhaInput = document.getElementById('senhaUsuario').value;
        
        const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioCadastrado'));
        
        if (!usuarioSalvo) {
            mostrarErro('Nenhum usuário cadastrado. Por favor, faça sua inscrição primeiro.');
            return;
        }
        
        if (usuarioInput === usuarioSalvo.usuario && senhaInput === usuarioSalvo.senha) {
            mostrarPopupSucesso(usuarioInput);
        } else {
            mostrarErro('Usúario ou senha incorretos.');
        }
    });
    
    setupPasswordToggle();
});