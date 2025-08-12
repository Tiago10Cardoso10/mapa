const btn = document.getElementById('showCardBtn');
const mapPageBtn = document.getElementById('showMap');
const overlay = document.getElementById('overlay');
const cardImg1 = document.getElementById('cardImg1');
const cardImg2 = document.getElementById('cardImg2');
const closeBtn = document.getElementById('closeBtn');
let map;
let currentLocation = '';

// Abrir cartao (funcionalidade da página principal)
if (btn) {
  btn.addEventListener('click', () => {
    const cardNumber = Math.floor(Math.random() * 20) + 1;
    const cardCode = cardNumber.toString().padStart(2, '0');

    const filename1 = `c${cardCode}i1.jpg`;
    const filename2 = `c${cardCode}i2.jpg`;

    cardImg1.src = `images/cards/${filename1}`;
    cardImg2.src = `images/cards/${filename2}`;

    overlay.classList.remove('hidden');
  });
}

// Fechar cartao
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
  });
}

// Botão para abrir página do mapa
if (mapPageBtn) {
  mapPageBtn.addEventListener('click', () => {
    window.location.href = 'map.html';
  });
}

function initMap() {
  const amaranteCenter = [41.2728, -8.0821];

  map = L.map('map', {
    center: amaranteCenter,
    zoom: 15,
    minZoom: 14,
    maxZoom: 17
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Função para criar marcador de coração
  function addHeart(lat, lng, popupText, imgName) {
    L.marker([lat, lng], {
      icon: L.divIcon({
        className: '',
        html: '❤️',
        iconSize: [32, 32],
        iconAnchor: [12, 12]
      })
    }).addTo(map)
      .on('click', () => openPoster(imgName, popupText));
  }

  // Aqui cada local já indica a imagem
  addHeart(41.26996, -8.07849, "Jardim público (frente à CMA)", "c01i1.jpg");
  addHeart(41.26865, -8.07640, "Jardim na Rua 31 de Janeiro", "c01i1.jpg");
  addHeart(41.27212, -8.07959, "Campo da Feira", "c01i1.jpg");
  addHeart(41.27168, -8.08246, "Santa Luzia (junto ao Solar de Magalhães)", "c01i1.jpg");
  addHeart(41.26977, -8.08125, "Largo de São Pedro", "c01i1.jpg");
  addHeart(41.26953, -8.07944, "Elevador do Rossio (Largo de Santa Clara)", "c01i1.jpg");
  addHeart(41.26605, -8.07212, "Terminal de Autocarros (Queimado)", "c01i1.jpg");
  addHeart(41.26672, -8.08135, "Piscinas Municipais", "c01i1.jpg");
  addHeart(41.26898, -8.07877, "Largo de São Gonçalo (Praça da República)", "c01i1.jpg");
  addHeart(41.26886, -8.07803, "Início da Ponte Velha (lado Cepelos)", "c01i1.jpg");
  addHeart(41.26841, -8.07464, "Arquinho (estátua de António Cândido)", "c01i1.jpg");
  addHeart(41.26998, -8.07567, "Início Trilho das Azenhas", "c01i1.jpg");
  addHeart(41.27024, -8.07558, "Início Trilho da Sra. do Vau", "c01i1.jpg");
  addHeart(41.26727, -8.07918, "Casa da Juventude", "c01i1.jpg");
  addHeart(41.27253, -8.08945, "Burger King (Pinheiro Manso)", "c01i1.jpg");
}

function openPoster(imgName, popupText) {
  currentLocation = popupText;
  const poster = document.getElementById("poster");
  const cardImg1 = document.getElementById("cardImg1");

  // Define a imagem específica
  if (cardImg1 && imgName) {
    cardImg1.src = `images/cards/${imgName}`;
  }

  if (poster) {
    poster.style.display = "block";
  }
}

function closePoster() {
  const poster = document.getElementById("poster");
  if (poster) {
    poster.style.display = "none";
  }
}

function sendMessage() {
  const textarea = document.querySelector('#poster textarea');
  const message = textarea.value.trim();

  if (!message) {
    alert('Por favor, escreva uma mensagem.');
    return;
  }

  const formURL = "https://docs.google.com/forms/d/e/1FAIpQLScNaYfTIDuHzLwhziM2acDswZhPvoZ4GsI7MC1EkVqoGTdqvg/formResponse";
  const formData = new FormData();

  // Estes entry.xxxxxx são os IDs dos campos do seu form
  formData.append("entry.95954294", currentLocation);
  formData.append("entry.19310802", message);

  fetch(formURL, {
    method: "POST",
    body: formData,
    mode: "no-cors" // evita bloqueio CORS
  }).then(() => {
    alert("Mensagem enviada com sucesso!");
    textarea.value = '';
    closePoster();
  });
}


// Se existir o container do mapa, inicializa o mapa automaticamente
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('map')) {
    initMap();
  }
});

// Função para partilhar no Facebook
function shareOnFacebook() {
  const imagemURL = cardImg2 ? cardImg2.src : '';
  const texto = encodeURIComponent("Descobre este gesto de bondade! 💙 #SomosFeitosDoMesmoCoração");

  const fbAppUrl = `fb://facewebmodal/f?href=https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imagemURL)}&quote=${texto}`;
  const fbWebUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imagemURL)}&quote=${texto}`;

  window.location.href = fbAppUrl;

  setTimeout(() => {
    window.open(fbWebUrl, "_blank");
  }, 1000);
}
