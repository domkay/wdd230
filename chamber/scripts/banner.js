document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('meet-banner');
    const closeBtn = document.getElementById('close-banner');
    const today = new Date().getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    if (today >= 1 && today <= 3) {
        banner.classList.remove('hidden');
    }

    closeBtn.addEventListener('click', () => {
        banner.style.display = 'none';
    });
});
