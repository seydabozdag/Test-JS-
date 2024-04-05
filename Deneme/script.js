window.onload = function() {
    var button = document.getElementById('yesButton');
    var body = document.body;
    var bodyRect = body.getBoundingClientRect();
    var buttonRect = button.getBoundingClientRect();

    function moveButton() {
        if (!button.classList.contains('hovered')) {
            var newX = Math.random() * (bodyRect.width - buttonRect.width);
            var newY = Math.random() * (bodyRect.height - buttonRect.height);
            button.style.left = newX + 'px';
            button.style.top = newY + 'px';
        }
    }

    button.addEventListener('mouseenter', function() {
        button.classList.add('hovered');
    });

    button.addEventListener('mouseleave', function() {
        button.classList.remove('hovered');
    });

    setInterval(moveButton, 700); 
};
