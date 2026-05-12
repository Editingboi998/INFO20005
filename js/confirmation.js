document.addEventListener('DOMContentLoaded', () => {
    
    const brandColors = ['#ff6a00', '#78a8a9', '#ffffff']; 
    

    for (let i = 0; i < 50; i++) {

        const randomColor = brandColors[Math.floor(Math.random() * brandColors.length)];
        createConfetti(randomColor);
    }
});

function createConfetti(color) {

    const confetti = document.createElement('div');
    

    confetti.style.position = 'fixed';
    confetti.style.top = '-10px'; 
    confetti.style.left = Math.random() * 100 + 'vw'; 
    confetti.style.width = '8px';
    confetti.style.height = (Math.random() * 10 + 5) + 'px'; 
    confetti.style.backgroundColor = color;
    confetti.style.opacity = Math.random() + 0.5; 
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none'; 
    

    document.body.appendChild(confetti);

  
    const fallDuration = Math.random() * 3000 + 2000; 
    
    confetti.animate([
        { transform: `translate3d(0, 0, 0) rotate(0deg)` },
        { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0) rotate(${Math.random() * 720}deg)` }
    ], {
        duration: fallDuration,
        easing: 'cubic-bezier(.37,0,.63,1)',
        fill: 'forwards'
    });

    setTimeout(() => {
        confetti.remove();
    }, fallDuration);
}