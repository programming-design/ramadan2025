        // Optional JavaScript to hide/show scrollbar dynamically
        const body = document.body;

        body.addEventListener('mousemove', () => {
            body.style.scrollbarWidth = 'thin';
        });

        body.addEventListener('mouseleave', () => {
            body.style.scrollbarWidth = 'none';
        });