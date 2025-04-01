// Visit tracking with localStorage
document.addEventListener('DOMContentLoaded', function() {
    const visitMessage = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTimestamp = parseInt(lastVisit);
        const timeDiff = now - lastVisitTimestamp;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysDiff === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${daysDiff} ${dayText} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', now.toString());
    
    // Set current year and last modified date
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
});