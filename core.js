window.onload = function() {
    console.log('Hello World!!');

    var elementsToRemove = document.querySelectorAll('[id*="banner"], [class*="banner"]');
    elementsToRemove.forEach(function(element) {
        element.remove();
    });
};