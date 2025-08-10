const btn = document.getElementById('showCardBtn');
const map = document.getElementById('openMap');
const overlay = document.getElementById('overlay');
const cardImg1 = document.getElementById('cardImg1');
const cardImg2 = document.getElementById('cardImg2');
const closeBtn = document.getElementById('closeBtn');
const closeMap = document.getElementById('closeMap');

btn.addEventListener('click', () => {
  const cardNumber = Math.floor(Math.random() * 20) + 1;
  const cardCode = cardNumber.toString().padStart(2, '0');

  const filename1 = `c${cardCode}i1.jpg`;
  const filename2 = `c${cardCode}i2.jpg`;

  cardImg1.src = `images/cards/${filename1}`;
  cardImg2.src = `images/cards/${filename2}`;

  overlay.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

map.addEventListener('click', () => {
  window.location.href = '/map.html';
});

/* Way to go back to principal page */
closeMap.addEventListener('click', () => {
  window.location.href = 'index.html';
});

function showPoster() {
  const cardNumber = Math.floor(Math.random() * 20) + 1;
  const cardCode = cardNumber.toString().padStart(2, '0');

  const filename = `c${cardCode}i1.jpg`;

  cardImg1.src = `images/cards/${filename}`;
}
/*
function shareOnFacebook() {
  const url = window.location.href;
  const imageUrl = cardImg1.src; // ou cardImg2.src se preferires
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&picture=${encodeURIComponent(imageUrl)}`;
  window.open(facebookUrl, '_blank');
}
*/

function shareOnFacebook() {
  const imagemURL = document.getElementById("cardImg2").src;

  const texto = encodeURIComponent("Descobre este gesto de bondade! 💙 #SomosFeitosDoMesmoCoração");

  const fbAppUrl = `fb://facewebmodal/f?href=https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imagemURL)}&quote=${texto}`;
  const fbWebUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imagemURL)}&quote=${texto}`;

  // Tenta abrir a app
  window.location.href = fbAppUrl;

  // Fallback: se não abrir, usa o browser
  setTimeout(() => {
    window.open(fbWebUrl, "_blank");
  }, 1000);
}

function openPoster() {
  poster.style.display = 'block';  // mostra o poster
  showPoster();                   // gera a imagem nova
}

function closePoster() {
  document.getElementById('poster').style.display = 'none';
}

async function sendMessage(name) {
  const message = document.querySelector('.poster textarea').value.trim();

  if (!message) {
    alert("Por favor, escreva uma mensagem.");
    return;
  }

  const payload = {
    heartName: name,
    message: message
  };

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbxJoMFcTmYg9zAeSVSfJXGI4UXpx2rlILOQ0chpm8OIk0Z31Qoqkrojstlghb_E6vd86A/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.json();

    if (result.status === 'success') {
      alert("Mensagem enviada com sucesso!");
      document.querySelector('.poster textarea').value = "";
      closePoster();
    } else {
      alert("Erro ao enviar mensagem.");
    }
  } catch (error) {
    alert("Erro na comunicação: " + error.message);
  }
}
