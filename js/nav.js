const hamburger = document.querySelector('.hamburger');
        const dropdown = document.querySelector('.dropdown');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                dropdown.classList.toggle('hidden');
            });
        }