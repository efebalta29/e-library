document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form elemanlarını al
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');
            
            // Basit validasyon
            let isValid = true;
            
            if (!email.value || !email.value.includes('@')) {
                isValid = false;
                alert('Lütfen geçerli bir e-posta adresi girin.');
            }
            
            if (!password.value) {
                isValid = false;
                alert('Lütfen şifrenizi girin.');
            }
            
            if (isValid) {
                // Burada gerçek bir uygulamada API'ye giriş isteği gönderilebilir
                console.log('Giriş bilgileri:', {
                    email: email.value,
                    password: password.value
                });
                
                // Örnek giriş - gerçek uygulamada bu kısım sunucu tarafında yapılır
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email.value);
                
                // Başarılı giriş mesajı
                alert('Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz.');
                
                // Ana sayfaya yönlendirme
                window.location.href = 'index.html';
            }
        });
    }
    
    // Input'lara canlı validasyon ekle
    document.getElementById('loginEmail')?.addEventListener('input', function() {
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value.trim() === '') {
            emailError.textContent = 'Lütfen e-posta adresinizi girin';
            this.classList.add('error');
        } else if (!emailRegex.test(this.value.trim())) {
            emailError.textContent = 'Geçerli bir e-posta adresi girin';
            this.classList.add('error');
        } else {
            emailError.textContent = '';
            this.classList.remove('error');
        }
    });
    
    document.getElementById('loginPassword')?.addEventListener('input', function() {
        const passwordError = document.getElementById('passwordError');
        
        if (this.value === '') {
            passwordError.textContent = 'Lütfen şifrenizi girin';
            this.classList.add('error');
        } else {
            passwordError.textContent = '';
            this.classList.remove('error');
        }
    });
    
    // Test kullanıcı bilgilerini ekleyelim
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+T tuş kombinasyonu ile test bilgilerini doldur
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            const emailInput = document.getElementById('loginEmail');
            const passwordInput = document.getElementById('loginPassword');
            
            if (emailInput && passwordInput) {
                emailInput.value = 'test@example.com';
                passwordInput.value = 'Password123';
            }
        }
    });
}); 
