const URL_API = "https://script.google.com/macros/s/AKfycbxuXsguovjfys72AmnncnvFGyr_Kj0oHArPwpMQKsd-2Ej_LnEniQfKp7z-NRr9c6P2pA/exec";
let todosParticipantes = [];

document.addEventListener("DOMContentLoaded", () => {
    const galeria = document.getElementById("galeria");
    const inputBusca = document.querySelector(".search-box input");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    fetch(URL_API)
        .then(response => response.json())
        .then(participantes => {
            todosParticipantes = participantes;
            renderizarCards(todosParticipantes);
        })
        .catch(erro => {
            console.error("Erro ao carregar participantes:", erro);
            galeria.innerHTML = `<p style="text-align:center; color:rgba(255,255,255,0.5);">Não foi possível carregar a galeria.</p>`;
        });

    function renderizarCards(lista) {
        if (lista.length === 0) {
            galeria.innerHTML = `<p style="text-align:center; grid-column: 1/-1; color:rgba(255,255,255,0.4); padding: 40px 0;">Nenhum participante encontrado.</p>`;
            return;
        }

        const cardsHTML = lista.map(pessoa => `
            <div class="card">
                <img src="${pessoa.foto}" alt="Look de ${pessoa.nome}">
                <div class="card-info">
                    <span class="card-author">${pessoa.nome}</span>
                </div>
            </div>
        `).join('');

        galeria.innerHTML = cardsHTML;
    }

    inputBusca.addEventListener("input", () => {
        const termoPesquisa = inputBusca.value.toLowerCase().trim();
        
        const participantesFiltrados = todosParticipantes.filter(pessoa => {
            return pessoa.nome && pessoa.nome.toLowerCase().includes(termoPesquisa);
        });

        renderizarCards(participantesFiltrados);
    });

    galeria.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
            lightbox.classList.add("active");
            lightboxImg.src = e.target.src;
        }
    });

    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
        setTimeout(() => { lightboxImg.src = ""; }, 300);
    });
});