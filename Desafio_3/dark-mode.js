const iconeBt = document.querySelector('.icone-do-botao');

const alternar = document.getElementById('alternar');
const tema = localStorage.getItem('tema');

if (tema === 'dark-mode') {
    document.body.classList.add('dark-mode');
    iconeBt.src = 'Icones/sunny-preto.svg'; // icone para tema escuro
}
else {
    document.body.classList.remove('dark-mode');
    iconeBt.src = 'Icones/moon-branca.svg'; // icone para tema claro
}

alternar.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('tema', 'dark-mode');
        iconeBt.src = 'Icones/sunny-preto.svg';
    }
    else {
        localStorage.setItem('tema', 'light');
        iconeBt.src = 'Icones/moon-branca.svg';
    }
})