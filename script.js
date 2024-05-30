document.addEventListener('DOMContentLoaded', function () {
    const isMobile = window.matchMedia("(max-width: 700px)").matches;

    if (isMobile) {
        const photos = document.querySelectorAll('#gallery .photo img');
        const photosContainer = document.getElementById('gallery');

        let currentPhotoIndex = 0;

        // Definir a largura e a altura das imagens para o mesmo valor em dispositivos móveis
        const imageWidth = 200; // Defina a largura desejada das imagens
        const imageHeight = 200; // Defina a altura desejada das imagens

        photos.forEach(photo => {
            // Definir a largura e a altura das imagens
            photo.style.width = imageWidth + 'px';
            photo.style.height = imageHeight + 'px';

            photo.addEventListener('click', function () {
                const fullScreenOverlay = document.createElement('div');
                fullScreenOverlay.classList.add('full-screen-overlay');
                fullScreenOverlay.innerHTML = `
                    <div class="full-screen-content">
                        <img src="${this.src}" alt="${this.alt}">
                        <span class="close-btn">&times;</span>
                    </div>
                `;
                document.body.appendChild(fullScreenOverlay);

                const closeBtn = fullScreenOverlay.querySelector('.close-btn');
                closeBtn.addEventListener('click', function () {
                    document.body.removeChild(fullScreenOverlay);
                });

                fullScreenOverlay.addEventListener('click', function (event) {
                    if (event.target === fullScreenOverlay) {
                        document.body.removeChild(fullScreenOverlay);
                    }
                });
            });
        });

        function showPhoto(index) {
            photos.forEach((photo, idx) => {
                if (idx === index) {
                    photo.parentElement.style.display = 'block';
                } else {
                    photo.parentElement.style.display = 'none';
                }
            });
        }

        function showNextPhoto() {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            showPhoto(currentPhotoIndex);
        }

        function showPreviousPhoto() {
            currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
            showPhoto(currentPhotoIndex);
        }

        // Exibe a primeira foto ao carregar a página
        showPhoto(currentPhotoIndex);

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Próximo';
        nextButton.addEventListener('click', showNextPhoto);

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.addEventListener('click', showPreviousPhoto);

        // Adicionar os botões "Anterior" e "Próximo" lado a lado
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.justifyContent = 'space-between';
        buttonsContainer.appendChild(prevButton);
        buttonsContainer.appendChild(nextButton);

        photosContainer.insertAdjacentElement('afterend', buttonsContainer);
    }

    // Função para alternar entre os modos claro e escuro
    function toggleMode() {
        const body = document.body;
        body.classList.toggle('light');
    }

    const switchButton = document.querySelector('#switch button');
    switchButton.addEventListener('click', toggleMode);
});
