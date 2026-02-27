window.addEventListener('load', () => {
    const overlay = document.getElementById('transition-overlay');
    
    // Tahan layar hitam sejenak sebelum memudar
    setTimeout(() => {
        overlay.style.opacity = '0';
        
        // Hilangkan elemen dari DOM setelah transisi selesai
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 2500); 
    }, 800); 
});