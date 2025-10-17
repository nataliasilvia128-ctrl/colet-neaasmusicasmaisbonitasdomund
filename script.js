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
    let currentDisco = null;

    let isDragging = false;
    let startX, startY;

    agulha.addEventListener('mousedown', dragStart);
    agulha.addEventListener('touchstart', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);

    function dragStart(e) {
        isDragging = true;
        startX = e.clientX || e.touches[0].clientX;
        startY = e.clientY || e.touches[0].clientY;
    }

    function drag(e) {
        if (!isDragging || !currentDisco) return;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        agulha.style.transform = `translate(${clientX - startX}px, ${clientY - startY}px) rotate(45deg)`;
    }

    function dragEnd(e) {
        isDragging = false;
        const clientX = e.clientX || e.changedTouches[0].clientX;
        const clientY = e.clientY || e.changedTouches[0].clientY;
        if (isOverPrato(clientX, clientY) && currentDisco) {
            playAudio();
        } else {
            agulha.style.transform = 'translate(0, 0) rotate(45deg)';
        }
    }

    function isOverPrato(x, y) {
        const rect = prato.getBoundingClientRect();
        return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
    }

    discos.forEach(disco => {
        disco.addEventListener('click', () => {
            if (currentDisco) {
                resetDisco(currentDisco);
            }
            currentDisco = disco.cloneNode(true);
            currentDisco.classList.add('disco-no-prato');
            prato.appendChild(currentDisco);
            currentDisco.style.transform = 'scale(1.5)';
            currentDisco.style.transition = 'transform 1s ease-in-out';
        });
    });

    function playAudio() {
        let audioStart = new Audio('https://raw.githubusercontent.com/nataliasilvia128-ctrl/colet-neaasmusicasmaisbonitasdomund/main/audio/vinyl_start.mp3');
        audioStart.play();
        setTimeout(() => {
            audioStatic.play();
            audioFaixa.play();
            ondas.style.opacity = 1;
            fraseContainer.style.opacity = 1;
            currentDisco.style.animation = 'rotate 4s linear infinite';
        }, 1000);
        audioFaixa.onended = () => {
            audioStatic.pause();
            setTimeout(() => {
                resetState();
            }, 5000);
        };
    }

    function resetDisco(disco) {
        prato.removeChild(disco);
        disco.style.transform = 'scale(1)';
        document.querySelector('.discos-section').appendChild(disco);
    }

    function resetState() {
        audioStatic.pause();
        ondas.style.opacity = 0;
        fraseContainer.style.opacity = 0;
        currentDisco.style.animation = 'none';
        agulha.style.transform = 'translate(0, 0) rotate(45deg)';
        if (currentDisco) resetDisco(currentDisco);
    }

    repeatButton.addEventListener('click', () => {
        if (audioFaixa.paused && currentDisco) {
            playAudio();
        }
    });
});
