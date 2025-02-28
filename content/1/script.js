function toggleModal() {
    const modal = document.getElementById('myModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

const moreBtn = document.getElementById('moreBtn');
moreBtn.onclick = toggleModal;
