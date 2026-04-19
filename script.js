function toggleMenu() {
    var x = document.getElementById("myNavbar");
    x.className = x.className === "navbar" ? "navbar responsive" : "navbar";
}

window.addEventListener('scroll', function () {
    const navbar = document.getElementById('myNavbar');
    navbar.style.background = window.scrollY > 50
        ? 'rgba(10, 10, 10, 0.98)'
        : 'rgba(10, 10, 10, 0.95)';
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.getElementById('myNavbar').classList.remove('responsive');
    }
});

document.addEventListener('click', function (e) {
    const card = e.target.closest('.card');
    if (card) {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => { card.style.transform = ''; }, 150);
    }
});

function initTypewriter(texts) {
    const typingText = document.getElementById("typing-text");
    if (!typingText) return;
    let textIndex = 0, charIndex = 0, isDeleting = false;

    function typeWriter() {
        const currentText = texts[textIndex];
        typingText.innerHTML = "$> " + currentText.substring(0, isDeleting ? --charIndex : ++charIndex);

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            delay = 500;
        }
        setTimeout(typeWriter, delay);
    }
    setTimeout(typeWriter, 200);
}

function loadContent(id, file) {
    fetch(file)
        .then(r => r.text())
        .then(data => {
            const el = document.getElementById(id);
            el.innerHTML += data;
            el.querySelectorAll('.card').forEach((card, i) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, i * 100);
            });
        })
        .catch(err => console.error('Error loading content:', err));
}

function toggleReadMore(event) {
    event.preventDefault();
    const moreContent = event.target.closest('.card').querySelector('.more-content');
    const isHidden = !moreContent.style.display || moreContent.style.display === "none";
    moreContent.style.display = isHidden ? "block" : "none";
    event.target.innerText = isHidden ? "Show Less ▴" : "Show More ▾";
}
