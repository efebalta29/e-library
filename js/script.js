// Check if allBooks is defined
console.log("allBooks from books.js:", allBooks);

// Öne Çıkan Kitaplar - Filter from allBooks
const featuredBooks = allBooks.filter(book => [1, 3, 4, 10].includes(book.id));

// Yeni Gelenler - Filter from allBooks
const newArrivals = allBooks.filter(book => [5, 6, 7, 8].includes(book.id));

// Kategoriler
const categories = [
    {
        id: 1,
        name: "Kişisel Gelişim",
        icon: "fas fa-brain",
        count: 48
    },
    {
        id: 2,
        name: "Bilim Kurgu",
        icon: "fas fa-rocket",
        count: 36
    },
    {
        id: 3,
        name: "Romantik",
        icon: "fas fa-heart",
        count: 42
    },
    {
        id: 4,
        name: "Tarih",
        icon: "fas fa-landmark",
        count: 31
    },
    {
        id: 5,
        name: "Bilim",
        icon: "fas fa-atom",
        count: 25
    },
    {
        id: 6,
        name: "Felsefe",
        icon: "fas fa-lightbulb",
        count: 19
    }
];

// DOM Elementleri
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded");
    
    // Get container elements
    const featuredContainer = document.querySelector('#featured .book-container');
    const newArrivalsContainer = document.querySelector('#new-arrivals .book-container');
    const categoriesContainer = document.querySelector('.categories-container');
    
    console.log("Container elements:", {
        featuredContainer,
        newArrivalsContainer,
        categoriesContainer
    });
    
    // Öne Çıkan Kitapları Görüntüle
    displayBooks(featuredBooks, featuredContainer);
    
    // Yeni Gelenleri Görüntüle
    displayBooks(newArrivals, newArrivalsContainer);
    
    // Kategorileri Görüntüle
    displayCategories(categories, categoriesContainer);
    
    // Yer İmi sayısını ayarla
    updateBookmarkCount();
    
    // Modal olaylarını ekle
    setupModals();

    // Giriş ve Kayıt butonları
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeBtns = document.querySelectorAll('.close');

    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
        });
    }
    
    if (signupBtn && signupModal) {
        signupBtn.addEventListener('click', function() {
            signupModal.style.display = 'block';
        });
    }
    
    // Kapatma butonları
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
            document.getElementById('bookDetailModal')?.remove();
        });
    });
    
    // Dışarı tıklama ile kapatma
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
        const bookDetailModal = document.getElementById('bookDetailModal');
        if (event.target === bookDetailModal) {
            bookDetailModal.remove();
        }
    });
});

// Kitapları Görüntüle
function displayBooks(books, container) {
    console.log("Displaying books:", books);
    if (!books || books.length === 0) {
        console.error("No books to display!");
        return;
    }
    if (!container) {
        console.error("No container element found!");
        return;
    }
    
    let html = '';
    
    books.forEach(book => {
        html += `
        <div class="book-card" data-id="${book.id}">
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}">
                <div class="book-actions">
                    <button class="add-bookmark" data-id="${book.id}"><i class="fas fa-bookmark"></i></button>
                    <button class="view-details" data-id="${book.id}"><i class="fas fa-info-circle"></i></button>
                </div>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-rating">
                    ${generateRatingStars(book.rating)}
                    <span>${book.rating.toFixed(1)}</span>
                </div>
                <p class="book-category">${book.category}</p>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Yer İmi Ekle Butonlarına Olay Dinleyicileri Ekle
    container.querySelectorAll('.add-bookmark').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const bookId = parseInt(this.getAttribute('data-id'));
            addBookmark(bookId);
        });
    });
    
    // Detay Butonlarına Olay Dinleyicileri Ekle
    container.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const bookId = parseInt(this.getAttribute('data-id'));
            viewBookDetails(bookId);
        });
    });
    
    // Kitap Kartlarına Tıklama Olayını Ekle
    container.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-id'));
            viewBookDetails(bookId);
        });
    });
}

// Kategorileri Görüntüle
function displayCategories(categories, container) {
    let html = '';
    
    categories.forEach(category => {
        html += `
        <div class="category-card" data-category="${category.name}">
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <h3>${category.name}</h3>
            <p>${category.count} kitap</p>
        </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Kategori kartlarına tıklama olayını kaldırdık
    // Artık kategori kartlarına tıklanınca hiçbir şey olmayacak
}

// Kategori kitaplarını göster
function showCategoryBooks(categoryName) {
    // Filtrele
    const categoryBooks = allBooks.filter(book => book.category === categoryName || 
                                               book.category.includes(categoryName));
    
    // Eğer kategori seçimi bölümü varsa, onu göster ve diğer bölümleri gizle
    const main = document.querySelector('main');
    
    // Daha önce oluşturulmuş bir kategori bölümü varsa kaldır
    const existingCategorySection = document.getElementById('category-results');
    if (existingCategorySection) {
        existingCategorySection.remove();
    }
    
    // Yeni kategori bölümü oluştur
    const categorySection = document.createElement('section');
    categorySection.id = 'category-results';
    categorySection.className = 'book-section';
    categorySection.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">${categoryName} Kategorisi</h2>
            <button id="closeCategory" class="close-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="book-container category-books"></div>
    `;
    
    // Ana içeriğin başına ekle
    main.prepend(categorySection);
    
    // Kitapları göster
    displayBooks(categoryBooks, document.querySelector('.category-books'));
    
    // Kapatma butonuna tıklama olayı ekle
    document.getElementById('closeCategory').addEventListener('click', function() {
        categorySection.remove();
    });
    
    // Sayfayı en üste kaydır
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Puanı Yıldızlara Dönüştür
function generateRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i <= rating + 0.5) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Yer İmi Ekle
function addBookmark(bookId) {
    // Yer imi verisini local storage'da saklama
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    if (!bookmarks.includes(bookId)) {
        bookmarks.push(bookId);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        alert('Kitap yer imlerine eklendi!');
        updateBookmarkCount();
    } else {
        alert('Bu kitap zaten yer imlerinizde bulunuyor!');
    }
}

// Yer İmi Sayısını Güncelle
function updateBookmarkCount() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const count = bookmarks.length;
    
    const bookmarkCountEls = document.querySelectorAll('.cart-count');
    bookmarkCountEls.forEach(el => {
        el.textContent = count;
    });
}

// Kitap Detaylarını Görüntüle
function viewBookDetails(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    
    if (!book) return;
    
    // Daha önce oluşturulmuş bir overlay varsa kaldır
    let overlay = document.querySelector('.book-detail-overlay');
    if (overlay) {
        overlay.remove();
    }
    
    // Overlay HTML oluştur
    overlay = document.createElement('div');
    overlay.className = 'book-detail-overlay';
    
    const isBookmarked = JSON.parse(localStorage.getItem('bookmarks') || '[]').includes(book.id);
    const bookmarkIcon = isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
    
    overlay.innerHTML = `
        <div class="book-detail-container">
            <span class="close-detail">&times;</span>
            <div class="book-detail-content">
                <div class="book-detail-image">
                    <img src="${book.cover}" alt="${book.title}">
                </div>
                <div class="book-detail-info">
                    <h2 class="book-detail-title">${book.title}</h2>
                    <p class="book-detail-author">Yazar: ${book.author}</p>
                    <div class="book-detail-rating">
                        ${generateRatingStars(book.rating)}
                    </div>
                    <div class="book-detail-category">${book.category}</div>
                    <p class="book-detail-description">${book.description}</p>
                    <div class="book-detail-actions">
                        <button class="read-button">Şimdi Oku</button>
                        <button class="bookmark-detail-btn" data-id="${book.id}">
                            <i class="${bookmarkIcon}"></i> ${isBookmarked ? 'Yer İmlerinden Kaldır' : 'Yer İmlerine Ekle'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Overlay'i DOM'a ekle
    document.body.appendChild(overlay);
    overlay.style.display = 'flex';
    
    // Kapatma butonuna tıklama olayı
    const closeButton = overlay.querySelector('.close-detail');
    closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
        overlay.remove();
    });
    
    // Dışarı tıklama ile kapatma
    overlay.addEventListener('click', function(event) {
        if (event.target === this) {
            overlay.style.display = 'none';
            overlay.remove();
        }
    });
    
    // Şimdi Oku butonuna tıklama olayı
    const readButton = overlay.querySelector('.read-button');
    readButton.addEventListener('click', function() {
        window.location.href = `read.html?id=${book.id}`;
    });
    
    // Yer İmlerine Ekle butonuna tıklama olayı
    const bookmarkButton = overlay.querySelector('.bookmark-detail-btn');
    bookmarkButton.addEventListener('click', function() {
        const bookId = parseInt(this.getAttribute('data-id'));
        const icon = this.querySelector('i');
        
        // Toggle bookmark
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        
        if (bookmarks.includes(bookId)) {
            // Remove bookmark
            bookmarks = bookmarks.filter(id => id !== bookId);
            icon.className = 'far fa-bookmark';
            this.innerHTML = `<i class="far fa-bookmark"></i> Yer İmlerine Ekle`;
        } else {
            // Add bookmark
            bookmarks.push(bookId);
            icon.className = 'fas fa-bookmark';
            this.innerHTML = `<i class="fas fa-bookmark"></i> Yer İmlerinden Kaldır`;
        }
        
        // Update bookmark count
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        updateBookmarkCount();
    });
}

// Modal kurulumları
function setupModals() {
    // ESC tuşu ile modalları kapatma
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.id === 'bookDetailModal') {
                    modal.remove();
                } else {
                    modal.style.display = 'none';
                }
            });
        }
    });
    
    // Login form submit
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Basic validation
            if (!email || !password) {
                alert('Lütfen tüm alanları doldurun!');
                return;
            }
            
            // For demonstration, we'll just show a success message
            alert('Giriş başarılı!');
            document.getElementById('loginModal').style.display = 'none';
        });
    }
    
    // Signup form submit
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Basic validation
            if (!name || !email || !password || !confirmPassword) {
                alert('Lütfen tüm alanları doldurun!');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Şifreler eşleşmiyor!');
                return;
            }
            
            // For demonstration, we'll just show a success message
            alert('Kayıt başarılı!');
            document.getElementById('signupModal').style.display = 'none';
        });
    }
}

// Arama Çubuğu İşlevi
const searchBar = document.querySelector('.search-bar input');
if (searchBar) {
    searchBar.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim().toLowerCase();
            if (searchTerm) {
                // Burada normalde arama sonuçları sayfasına yönlendirme yapılır
                // Basitlik için şimdilik sadece konsola yazdırıyoruz
                console.log('Arama Terimi:', searchTerm);
                alert(`"${searchTerm}" için arama yapılıyor...`);
            }
        }
    });
}

// Arama Butonu İşlevi
const searchButton = document.querySelector('.search-bar button');
if (searchButton) {
    searchButton.addEventListener('click', function() {
        const searchTerm = document.querySelector('.search-bar input').value.trim().toLowerCase();
        if (searchTerm) {
            console.log('Arama Terimi:', searchTerm);
            alert(`"${searchTerm}" için arama yapılıyor...`);
        }
    });
}
