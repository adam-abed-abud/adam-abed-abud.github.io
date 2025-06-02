document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.figure-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const imgPath = this.getAttribute('data-zoomable-image');
            
            // Create modal container
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(255,255,255,1)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';
            
            // Create image element
            const img = document.createElement('img');
            img.src = imgPath;
            img.style.maxWidth = '70%';
            img.style.maxHeight = '70%';
            img.style.objectFit = 'contain';
            
            // Add click handler to close modal
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            modal.appendChild(img);
            document.body.appendChild(modal);
        });
    });
}); 