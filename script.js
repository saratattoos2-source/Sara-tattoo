// Modal da galeria
function openModal(img) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    modal.style.display = 'flex';
    modalImg.src = img.src;
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Carregar imagens do feed
window.onload = function() {
    const savedImages = JSON.parse(localStorage.getItem('gallery')) || [];
    savedImages.forEach(src => addImageToGallery(src));

    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(review => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `<strong>${review.name} (${review.rating} estrelas):</strong><br>${review.comment}`;
        document.getElementById('comments-list').appendChild(commentDiv);
    });
};

// Adicionar imagem ao feed
document.getElementById('upload-btn').onclick = function () {
    const input = document.getElementById('image-upload');
    const file = input.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;

        addImageToGallery(base64);

        const savedImages = JSON.parse(localStorage.getItem('gallery')) || [];
        savedImages.push(base64);
        localStorage.setItem('gallery', JSON.stringify(savedImages));
    };

    reader.readAsDataURL(file);
};

function addImageToGallery(src) {
    const gallery = document.getElementById('gallery');
    const img = document.createElement('img');
    img.src = src;
    img.onclick = function(){ openModal(img); };
    gallery.prepend(img);
}

// Form de comentários
document.getElementById('review-form').addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `<strong>${name} (${rating} estrelas):</strong><br>${comment}`;
    document.getElementById('comments-list').appendChild(commentDiv);

    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push({name, rating, comment});
    localStorage.setItem('reviews', JSON.stringify(reviews));

    this.reset();
});

// Agendamentos
document.getElementById('booking-form').addEventListener('submit', function(e){
    e.preventDefault();

    document.getElementById('booking-result').innerText =
        "O seu pedido foi enviado! Irei responder em breve ❤️";

    this.reset();
});
