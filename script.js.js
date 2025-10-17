document.addEventListener('DOMContentLoaded', () => {
    const discos = document.querySelectorAll('.disco');
    const prato = document.querySelector('.prato');
    const ondas = document.querySelector('.ondas');
    const frase = document.querySelector('.frase');
    let audioFaixa = new Audio(); // Áudio da faixa
    let audioStatic = new Audio('audio/vinyl_static.mp3'); // Chiado de vinil
    audioStatic.loop = true;
    audioStatic.volume = 0.2; // Volume baixo para efeito nostálgico

    discos.forEach(disco => {
        disco.addEventListener('click', () => {
            const faixa = disco.dataset.faixa;
            const discoElement = disco.cloneNode(true); // Clona o disco para animação
            discoElement.classList.add('disco-no-prato'); // Adiciona classe para rotação
            discoElement.style.position = 'absolute';
            discoElement.style.top = '0'; // Posição inicial
            discoElement.style.left = '50%'; // Centraliza
            discoElement.style.transform = 'translateX(-50%)';
            discoElement.style.transition = 'top 1s ease-in-out'; // Animação de descida

            // Adiciona o disco à vitrola para animação
            prato.appendChild(discoElement);
            setTimeout(() => {
                discoElement.style.top = '50px'; // Move para o prato (ajuste conforme layout)
            }, 100);

            // Reproduz som de vinil sendo colocado
            let audioStart = new Audio('audio/vinyl_start.mp3');
            audioStart.play();

            setTimeout(() => {
                // Inicia rotação e efeitos
                ondas.style.display = 'block'; // Mostra ondas
                frase.style.opacity = '1'; // Mostra frase com transição
                audioFaixa.src = `audio/faixa${faixa}.mp3`;
                audioFaixa.play(); // Toca a faixa
                audioStatic.play(); // Toca chiado

                audioFaixa.onended = () => {
                    // Quando a faixa termina, continua o chiado por 5 segundos
                    setTimeout(() => {
                        audioStatic.pause();
                        audioStatic.currentTime = 0;
                        ondas.style.display = 'none'; // Esconde ondas
                        frase.style.opacity = '0'; // Esconde frase
                        prato.removeChild(discoElement); // Remove disco do prato
                    }, 5000); // 5 segundos de chiado
                };
            }, 1000); // 1 segundo após o som de início
        });
    });
});