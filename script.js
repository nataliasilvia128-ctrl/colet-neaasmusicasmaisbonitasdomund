document.addEventListener('DOMContentLoaded', () => {
    console.log('Script carregado e pronto!');
    const discos = document.querySelectorAll('.disco');
    const prato = document.querySelector('.prato');
    const agulha = document.querySelector('.agulha');
    const ondas = document.querySelector('.ondas');
    const fraseContainer = document.querySelector('.frase-container');
    const repeatButton = document.getElementById('repeat-button');
    let audioFaixa = new Audio();
    let audioStatic = new Audio('https://raw.githubusercontent.com/nataliasilvia128-ctrl/colet-neaasmusicasmaisbonitasdomund/main/audio/vinyl_static.mp3');
    audioStatic.loop = true;
    audioStatic.volume = 0.2;

    function pararAudios() {
        audioFaixa.pause();
        audioFaixa.currentTime = 0;
        audioStatic.pause();
        audioStatic.currentTime = 0;
        ondas.style.opacity = 0;
        fraseContainer.style.opacity = 0;
        agulha.style.transform = 'rotate(45deg)'; // Agulha volta
        agulha.style.opacity = 0;
    }

    discos.forEach(disco => {
        disco.addEventListener('click', () => {
            console.log(`Clicou no disco com faixa: ${disco.dataset.faixa}`);
            const faixa = disco.dataset.faixa;
            pararAudios();
            
            const discoElement = disco.cloneNode(true);
            discoElement.classList.add('disco-no-prato');
            discoElement.style.position = 'absolute';
            discoElement.style.top = '50%';
            discoElement.style.left = '50%';
            discoElement.style.transform = 'translate(-50%, -50%)';
            prato.appendChild(discoElement);

            // Animação de movimento do disco
            setTimeout(() => {
                discoElement.style.transition = 'top 1s ease-in-out, left 1s ease-in-out';
                discoElement.style.top = '20%'; // Ajuste para vitrola
                discoElement.style.left = '20%';
            }, 100);

            let audioStart = new Audio('https://raw.githubusercontent.com/nataliasilvia128-ctrl/colet-neaasmusicasmaisbonitasdomund/main/audio/vinyl_start.mp3');
            audioStart.onerror = () => console.error('Erro ao carregar vinyl_start.mp3');
            audioStart.play();

            setTimeout(() => {
                agulha.style.opacity = 1; // Agulha aparece
                agulha.style.transform = 'rotate(0deg)'; // Agulha desce
                ondas.style.opacity = 1;
                fraseContainer.style.opacity = 1;
                audioFaixa.src = `https://raw.githubusercontent.com/nataliasilvia128-ctrl/colet-neaasmusicasmaisbonitasdomund/main/audio/faixa${faixa}.mp3`;
                audioFaixa.onerror = () => console.error(`Erro ao carregar audio/faixa${faixa}.mp3`);
                audioFaixa.play();
                audioStatic.play();
            }, 1000);

            audioFaixa.onended = () => {
                console.log('Áudio da faixa terminou');
                setTimeout(() => {
                    audioStatic.pause();
                    audioStatic.currentTime = 0;
                    setTimeout(() => {
                        agulha.style.transform = 'rotate(45deg)';
                        agulha.style.opacity = 0;
                        discoElement.style.top = 'initial'; // Retorna disco
                        discoElement.style.left = 'initial';
                    }, 2000); // 2 segundos para agulha subir
                }, 5000); // 5 segundos de chiado
            };

            repeatButton.addEventListener('click', () => {
                audioFaixa.play();
                audioStatic.play();
            });
        });
    });
});
