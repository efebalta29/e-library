document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form elemanlarını al
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('registerEmail');
            const password = document.getElementById('registerPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            const termsAgreement = document.getElementById('termsAgreement');
            
            // Hata mesaj alanlarını al
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            const termsError = document.getElementById('termsError');
            
            // Hata mesajlarını temizle
            nameError.textContent = '';
            emailError.textContent = '';
            passwordError.textContent = '';
            confirmPasswordError.textContent = '';
            termsError.textContent = '';
            
            // Hata bayrağı
            let hasError = false;
            
            // Ad Soyad validasyonu
            if (fullName.value.trim() === '') {
                nameError.textContent = 'Lütfen adınızı ve soyadınızı girin';
                fullName.classList.add('error');
                hasError = true;
            } else if (fullName.value.trim().length < 3) {
                nameError.textContent = 'Ad soyad en az 3 karakter olmalıdır';
                fullName.classList.add('error');
                hasError = true;
            } else {
                fullName.classList.remove('error');
            }
            
            // E-posta validasyonu
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                emailError.textContent = 'Lütfen e-posta adresinizi girin';
                email.classList.add('error');
                hasError = true;
            } else if (!emailRegex.test(email.value.trim())) {
                emailError.textContent = 'Geçerli bir e-posta adresi girin';
                email.classList.add('error');
                hasError = true;
            } else {
                email.classList.remove('error');
            }
            
            // Şifre validasyonu
            if (password.value === '') {
                passwordError.textContent = 'Lütfen bir şifre belirleyin';
                password.classList.add('error');
                hasError = true;
            } else if (password.value.length < 6) {
                passwordError.textContent = 'Şifre en az 6 karakter olmalıdır';
                password.classList.add('error');
                hasError = true;
            } else if (!/[A-Z]/.test(password.value)) {
                passwordError.textContent = 'Şifre en az bir büyük harf içermelidir';
                password.classList.add('error');
                hasError = true;
            } else if (!/[0-9]/.test(password.value)) {
                passwordError.textContent = 'Şifre en az bir rakam içermelidir';
                password.classList.add('error');
                hasError = true;
            } else {
                password.classList.remove('error');
            }
            
            // Şifre onaylama validasyonu
            if (confirmPassword.value === '') {
                confirmPasswordError.textContent = 'Lütfen şifrenizi onaylayın';
                confirmPassword.classList.add('error');
                hasError = true;
            } else if (confirmPassword.value !== password.value) {
                confirmPasswordError.textContent = 'Şifreler eşleşmiyor';
                confirmPassword.classList.add('error');
                hasError = true;
            } else {
                confirmPassword.classList.remove('error');
            }
            
            // Şartlar ve koşullar onay kontrolü
            if (!termsAgreement.checked) {
                termsError.textContent = 'Devam etmek için kullanım koşullarını kabul etmelisiniz';
                hasError = true;
            }
            
            // Eğer hata yoksa, formu gönder
            if (!hasError) {
                // Burada gerçek bir uygulamada API'ye kayıt isteği gönderilebilir
                console.log('Kayıt bilgileri:', {
                    fullName: fullName.value,
                    email: email.value,
                    password: password.value
                });
                
                // Başarılı kayıt mesajı
                alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
                
                // Giriş sayfasına yönlendirme
                window.location.href = 'login.html';
            }
        });
    }
    
    // Input'lara canlı validasyon ekle
    document.getElementById('fullName')?.addEventListener('input', function() {
        const nameError = document.getElementById('nameError');
        if (this.value.trim() === '') {
            nameError.textContent = 'Lütfen adınızı ve soyadınızı girin';
            this.classList.add('error');
        } else if (this.value.trim().length < 3) {
            nameError.textContent = 'Ad soyad en az 3 karakter olmalıdır';
            this.classList.add('error');
        } else {
            nameError.textContent = '';
            this.classList.remove('error');
        }
    });
    
    document.getElementById('registerEmail')?.addEventListener('input', function() {
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
    
    document.getElementById('registerPassword')?.addEventListener('input', function() {
        const passwordError = document.getElementById('passwordError');
        
        if (this.value === '') {
            passwordError.textContent = 'Lütfen bir şifre belirleyin';
            this.classList.add('error');
        } else if (this.value.length < 6) {
            passwordError.textContent = 'Şifre en az 6 karakter olmalıdır';
            this.classList.add('error');
        } else if (!/[A-Z]/.test(this.value)) {
            passwordError.textContent = 'Şifre en az bir büyük harf içermelidir';
            this.classList.add('error');
        } else if (!/[0-9]/.test(this.value)) {
            passwordError.textContent = 'Şifre en az bir rakam içermelidir';
            this.classList.add('error');
        } else {
            passwordError.textContent = '';
            this.classList.remove('error');
        }
        
        // Şifre onay alanını güncelle
        const confirmPassword = document.getElementById('confirmPassword');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        
        if (confirmPassword.value !== '') {
            if (confirmPassword.value !== this.value) {
                confirmPasswordError.textContent = 'Şifreler eşleşmiyor';
                confirmPassword.classList.add('error');
            } else {
                confirmPasswordError.textContent = '';
                confirmPassword.classList.remove('error');
            }
        }
    });
    
    document.getElementById('confirmPassword')?.addEventListener('input', function() {
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const password = document.getElementById('registerPassword');
        
        if (this.value === '') {
            confirmPasswordError.textContent = 'Lütfen şifrenizi onaylayın';
            this.classList.add('error');
        } else if (this.value !== password.value) {
            confirmPasswordError.textContent = 'Şifreler eşleşmiyor';
            this.classList.add('error');
        } else {
            confirmPasswordError.textContent = '';
            this.classList.remove('error');
        }
    });
    
    document.getElementById('termsAgreement')?.addEventListener('change', function() {
        const termsError = document.getElementById('termsError');
        
        if (!this.checked) {
            termsError.textContent = 'Devam etmek için kullanım koşullarını kabul etmelisiniz';
        } else {
            termsError.textContent = '';
        }
    });
}); 
