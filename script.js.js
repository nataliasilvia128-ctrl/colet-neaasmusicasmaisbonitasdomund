document.addEventListener('DOMContentLoaded', () => {
    console.log('Script carregado e pronto!');  // Log para depuração inicial
    const discos = document.querySelectorAll('.disco');
    const prato = document.querySelector('.prato');
    const ondas = document.querySelector('.ondas');
    const frase = document.querySelector('.frase');
    let audioFaixa = new Audio();  // Áudio da faixa
    let audioStatic = new Audio('audio/vinyl_static.mp3');  // Chiado de vinil
    audioStatic.loop = true;
    audioStatic.volume = 0.2;  // Volume baixo

    // Função para parar todos os áudios e resetar
    function pararAudios() {
        audioFaixa.pause();
        audioFaixa.currentTime = 0;
        audioStatic.pause();
        audioStatic.currentTime = 0;
        ondas.style.display = 'none';  // Esconde ondas
        frase.style.opacity = '0';  // Esconde frase
    }

    discos.forEach(disco => {
        disco.addEventListener('click', () => {
            console.log(`Clicou no disco com faixa: ${disco.dataset.faixa}`);  // Log do clique
            const faixa = disco.dataset.faixa;
            pararAudios();  // Para qualquer áudio em reprodução
            
            const discoElement = disco.cloneNode(true);  // Clona o disco
            discoElement.classList.add('disco-no-prato');  // Adiciona classe para rotação
            discoElement.style.position = 'absolute';
            discoElement.style.top = '0';  // Posição inicial
            discoElement.style.left = '50%';  // Centraliza
            discoElement.style.transform = 'translateX(-50%)';
            discoElement.style.transition = 'top 1s ease-in-out';  // Animação
            
            prato.appendChild(discoElement);
            setTimeout(() => {
                discoElement.style.top = '50px';  // Ajuste conforme layout (mude se necessário)
            }, 100);

            // Reproduz som de vinil sendo colocado com tratamento de erro
            let audioStart = new Audio('audio/vinyl_start.mp3');
            audioStart.onerror = () => console.error('Erro ao carregar vinyl_start.mp3');
            audioStart.play();

            setTimeout(() => {
                audioFaixa.src = `audio/faixa${faixa}.mp3`;
                audioFaixa.onerror = () => console.error(`Erro ao carregar audio/faixa${faixa}.mp3`);  // Tratamento de erro
                audioFaixa.play();
                audioStatic.play();  // Toca chiado
                ondas.style.display = 'block';  // Mostra ondas
                frase.style.opacity = '1';  // Mostra frase
            }, 1000);  // 1 segundo de delay

            audioFaixa.onended = () => {
                console.log('Áudio da faixa terminou');
                setTimeout(() => {
                    audioStatic.pause();
                    audioStatic.currentTime = 0;
                    ondas.style.display = 'none';
                    frase.style.opacity = '0';
                    prato.removeChild(discoElement);  // Remove disco
                }, 5000);  // 5 segundos de chiado
            };
        });
    });
});
