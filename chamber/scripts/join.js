ocument.addEventListener('DOMContentLoaded', function () {
    const timestampInput = document.getElementById('timestamp');
    const now = new Date();
    timestampInput.value = now.toLocaleString();
});