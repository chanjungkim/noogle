document.addEventListener('DOMContentLoaded', () => {
    let youtubeLink = document.querySelector('#youtube');

    if (youtubeLink) {
        youtubeLink.addEventListener('click', (event) => {
            event.preventDefault();
            chrome.tabs.create({ url: event.target.getAttribute('href') });
        });
    }
});