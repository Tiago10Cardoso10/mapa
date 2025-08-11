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
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    }).addTo(map)
      .on('click', () => openPoster(imgName, popupText));
  }

  // Aqui cada local já indica a imagem
  addHeart(41.27346, -8.08125, "Largo de São Pedro", "c01i1.jpg");
  addHeart(41.2715, -8.0840, "Zona Ribeirinha", "c02i1.jpg");
  addHeart(41.2728, -8.0860, "Jardim Público em frente à CMA", "c03i1.jpg");
  addHeart(41.2741, -8.0845, "Jardim na Rua 31 de Janeiro", "c04i1.jpg");
  addHeart(41.2730, -8.0875, "Campo da Feira", "c05i1.jpg");
  addHeart(41.2762, -8.0817, "Santa Luzia (junto ao Solar de Magalhães)", "c06i1.jpg");
  addHeart(41.2705, -8.0902, "Largo de São Pedro", "c07i1.jpg");
  addHeart(41.2690, -8.0865, "Zona junto ao elevador do Rossio (parte de cima)", "c08i1.jpg");
  addHeart(41.2757, -8.0841, "Terminal de Autocarros", "c09i1.jpg");
  addHeart(41.2723, -8.0833, "Piscinas Municipais", "c10i1.jpg");
  addHeart(41.2718, -8.0820, "Largo de São Gonçalo", "c11i1.jpg");
  addHeart(41.2684, -8.0908, "Início da Ponte Velha, do lado de Cepelos", "c12i1.jpg");
  addHeart(41.2749, -8.0857, "Arquinho (junto à estátua de António Cândido)", "c13i1.jpg");
  addHeart(41.2780, -8.0892, "Início trilho das Azenhas e trilho da Sra do Vau", "c14i1.jpg");
  addHeart(41.2710, -8.0885, "Casa da Juventude e Burger King", "c15i1.jpg");
  addHeart(41.2739, -8.0824, "Lar Conselheiro", "c16i1.jpg");
  addHeart(41.2775, -8.0803, "UCCI", "c17i1.jpg");
  addHeart(41.2707, -8.0848, "Estância e SIP", "c18i1.jpg");

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

  // Exemplo simples: mostra os dados
  alert(`Mensagem para o local "${currentLocation}":\n\n${message}`);

  // Aqui podes fazer envio real, ex. fetch POST para API:
  /*
  fetch('/api/send-message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: currentLocation,
      message: message
    })
  }).then(res => {
    if(res.ok) {
      alert('Mensagem enviada com sucesso!');
      textarea.value = ''; // limpa textarea
      closePoster();
    } else {
      alert('Erro ao enviar mensagem.');
    }
  });
  */

  // Fecha o modal e limpa a textarea
  closePoster();
  textarea.value = '';
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
