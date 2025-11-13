// ==================== Mobile Menu ====================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        }
    });
});

// ==================== FAQ Accordion ====================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ==================== Form Handling con Google Sheets ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obtener botón de submit
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Deshabilitar botón y mostrar loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // URL de tu Google Apps Script (CAMBIA ESTA URL)
        const scriptURL = 'PEGA_AQUI_TU_URL_DE_GOOGLE_APPS_SCRIPT';
        
        try {
            // Enviar datos a Google Sheets
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                // Mostrar mensaje de éxito
                submitBtn.textContent = '¡Enviado! ✓';
                submitBtn.style.background = '#10b981';
                
                // Resetear formulario
                contactForm.reset();
                
                // Opcional: Mostrar alerta de éxito
                alert('¡Gracias por tu consulta! Te contactaremos pronto.');
                
                // Restaurar botón después de 3 segundos
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    submitBtn.style.background = '';
                }, 3000);
            } else {
                throw new Error('Error en el servidor');
            }
            
        } catch (error) {
            console.error('Error:', error);
            
            // Mostrar mensaje de error
            submitBtn.textContent = 'Error al enviar';
            submitBtn.style.background = '#ef4444';
            
            alert('Hubo un error al enviar tu consulta. Por favor, intenta nuevamente o contáctanos por WhatsApp.');
            
            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}
// ==================== Navbar Scroll Effect ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
});

