// DOM Elements
const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookContent = document.getElementById('bookContent');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const fontSizeDown = document.getElementById('fontSizeDown');
const fontSizeUp = document.getElementById('fontSizeUp');
const toggleTheme = document.getElementById('toggleTheme');
const addBookmarkBtn = document.getElementById('addBookmark');
const goBackBtn = document.getElementById('goBack');
const bookmarkCount = document.querySelector('.cart-count');

// Kitap verileri (Doğrudan tanımlama)
// Bu, harici dosyaların yüklenmemesi durumunda yedek olarak kullanılır
if (typeof allBooks === 'undefined') {
    allBooks = [
        {
            id: 1,
            title: "Düşüncenin Gücü",
            author: "Ali Yılmaz",
            cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            description: "Düşünce gücü ve zihin kontrolü hakkında kapsamlı bir rehber.",
            rating: 4.5,
            category: "Kişisel Gelişim"
        },
        {
            id: 3,
            title: "Kuantum Fiziği",
            author: "Dr. Mehmet Öz",
            cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            description: "Kuantum fiziğinin temel kavramlarını anlaşılır bir şekilde anlatan bir kitap.",
            rating: 4.3,
            category: "Bilim"
        },
        {
            id: 4,
            title: "Karanlık Orman",
            author: "Cixin Liu",
            cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            description: "Üçlü Beden Problemi serisinin ikinci kitabında insanlık ve uzaylılar arasındaki gerilim devam ediyor.",
            rating: 4.9,
            category: "Bilim Kurgu"
        }
    ];
}

// Kitap içerikleri (Doğrudan tanımlama)
if (typeof bookContents === 'undefined') {
    bookContents = {
        1: [
            "Bölüm 1: Zihnin Gücü\n\nİnsanoğlu, varoluşundan bu yana zihnin sınırlarını ve potansiyelini keşfetmeye çalışmaktadır. Antik çağlardan günümüze kadar filozoflar, bilim insanları ve düşünürler, düşüncenin gücü üzerine kafa yormuşlardır. Bu kitapta, düşüncelerimizin hayatımızı nasıl şekillendirdiğini ve zihin gücümüzü nasıl en iyi şekilde kullanabileceğimizi keşfedeceğiz.",
            "Bölüm 2: Bilinçaltının Gücü\n\nBilinçaltı, zihnimizin görünmeyen, ancak son derece güçlü bir parçasıdır. Bilinçli zihnimiz günlük kararlar alırken, bilinçaltımız daha derin ve köklü inançlarımızı, alışkanlıklarımızı ve davranış kalıplarımızı belirler."
        ],
        4: [
            "Bölüm 1: Evrenin Gizemi\n\nKaranlık Orman, Üçlü Beden Problemi serisinin ikinci kitabıdır. İlk kitapta başlayan insan ve Trisolaran medeniyeti arasındaki çatışma, bu kitapta farklı bir boyuta evrilir. İnsanlık, dört yüz yıl içinde gerçekleşecek olan uzaylı istilasına karşı hazırlıklarını sürdürmektedir.",
            "Bölüm 2: Kozmik Sosyoloji\n\nKitabın ana karakterlerinden Luo Ji, kendisini bir anda 'Duvar Yıkıcı' olarak adlandırılan bir projenin parçası olarak bulur. Görevi, uzaylılarla iletişimi engelleyen 'sofon'ları aşmak için stratejiler geliştirmektir. Ancak Luo Ji'nin yöntemleri alışılmadıktır ve birçok kişi tarafından anlaşılmaz.",
            "Bölüm 3: Karanlık Orman Teorisi\n\nLuo Ji, evrenin işleyişine dair 'Karanlık Orman Teorisi' adını verdiği bir hipotez geliştirir. Bu teoriye göre, evren bir karanlık ormandır ve her medeniyet bir avcıdır. Her medeniyet hayatta kalmak için kendini gizler, çünkü diğer medeniyetlerin varlığı bir tehdittir. İlk fark eden ve ateş eden hayatta kalır."
        ]
    };
}

// State
let currentBook;
let currentPage = 0;
let fontSize = 16; // Default font size in px
let isDarkMode = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // URL'den kitap ID'sini al
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = parseInt(urlParams.get('id'));
    
    if (bookId) {
        loadBook(bookId);
    } else {
        // ID yoksa kullanıcıyı kitaplar sayfasına yönlendir
        window.location.href = 'books.html';
    }
    
    // Event listeners
    prevPageBtn.addEventListener('click', goToPrevPage);
    nextPageBtn.addEventListener('click', goToNextPage);
    fontSizeDown.addEventListener('click', decreaseFontSize);
    fontSizeUp.addEventListener('click', increaseFontSize);
    toggleTheme.addEventListener('click', toggleDarkMode);
    addBookmarkBtn.addEventListener('click', addCurrentBookToBookmarks);
    goBackBtn.addEventListener('click', goBackToBooks);
    
    // Tema ve font boyutunu local storage'dan yükle
    loadUserPrFEBArences();
    
    // Bookmark sayısını güncelle
    updateBookmarkCount();
    
    // Modal event listeners
    setupModals();
});

// Kitabı yükle
function loadBook(bookId) {
    // Kitap bilgilerini al
    currentBook = allBooks.find(b => b.id === bookId);
    
    if (!currentBook) {
        // Kitap bulunamadıysa kullanıcıyı kitaplar sayfasına yönlendir
        window.location.href = 'books.html';
        return;
    }
    
    // Kitap içeriğini al
    const content = bookContents[bookId];
    
    if (!content) {
        // İçerik bulunamadıysa hata mesajı göster
        bookContent.innerHTML = `<div class="error-message">Kitap içeriği bulunamadı.</div>`;
        return;
    }
    
    // Kitap nesnesine içeriği ekle
    currentBook.content = content;
    
    // Kitap başlığını ve yazarını güncelle
    bookTitle.textContent = currentBook.title;
    bookAuthor.textContent = 'Yazar: ' + currentBook.author;
    
    // İlk sayfayı göster
    showPage(0);
}

// Sayfayı göster
function showPage(pageIndex) {
    if (!currentBook || !currentBook.content || pageIndex < 0 || pageIndex >= currentBook.content.length) {
        return;
    }
    
    currentPage = pageIndex;
    
    // Sayfayı görüntüle
    bookContent.innerHTML = `<div class="page-content">${formatContent(currentBook.content[pageIndex])}</div>`;
    
    // Sayfa bilgisini güncelle
    pageInfo.textContent = `Sayfa ${pageIndex + 1} / ${currentBook.content.length}`;
    
    // Önceki ve sonraki butonlarını güncelle
    prevPageBtn.disabled = pageIndex === 0;
    nextPageBtn.disabled = pageIndex === currentBook.content.length - 1;
}

// İçeriği formatla (paragrafları ayır)
function formatContent(content) {
    // Bölüm başlıklarını kalın yap
    content = content.replace(/Bölüm \d+:.*?\n/g, match => `<strong>${match.trim()}</strong>\n`);
    // Paragrafları ayır
    return content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
}

// Önceki sayfaya git
function goToPrevPage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
        // Sayfanın en üstüne kaydır
        window.scrollTo(0, 0);
    }
}

// Sonraki sayfaya git
function goToNextPage() {
    if (currentBook && currentPage < currentBook.content.length - 1) {
        showPage(currentPage + 1);
        // Sayfanın en üstüne kaydır
        window.scrollTo(0, 0);
    }
}

// Font boyutunu azalt
function decreaseFontSize() {
    if (fontSize > 12) {
        fontSize -= 2;
        updateFontSize();
    }
}

// Font boyutunu artır
function increaseFontSize() {
    if (fontSize < 24) {
        fontSize += 2;
        updateFontSize();
    }
}

// Font boyutunu güncelle
function updateFontSize() {
    document.documentElement.style.setProperty('--reading-font-size', `${fontSize}px`);
    // Kullanıcı tercihini kaydet
    localStorage.setItem('readingFontSize', fontSize);
}

// Karanlık modu aç/kapat
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        toggleTheme.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        toggleTheme.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Kullanıcı tercihini kaydet
    localStorage.setItem('darkMode', isDarkMode);
}

// Mevcut kitabı yer imlerine ekle
function addCurrentBookToBookmarks() {
    if (!currentBook) return;
    
    // Yer imi verisini local storage'da saklama
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    if (!bookmarks.includes(currentBook.id)) {
        bookmarks.push(currentBook.id);
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
    
    if (bookmarkCount) {
        bookmarkCount.textContent = count;
    }
}

// Kitap sayfasına geri dön
function goBackToBooks() {
    window.history.back();
}

// Kullanıcı tercihlerini yükle
function loadUserPrFEBArences() {
    // Font boyutu
    const savedFontSize = localStorage.getItem('readingFontSize');
    if (savedFontSize) {
        fontSize = parseInt(savedFontSize);
        updateFontSize();
    } else {
        updateFontSize(); // Default değeri ayarla
    }
    
    // Karanlık mod
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        toggleTheme.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Modal kurulumları
function setupModals() {
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
            if (loginModal) loginModal.style.display = 'none';
            if (signupModal) signupModal.style.display = 'none';
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
    });
    
    // ESC tuşu ile modalları kapatma
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (loginModal) loginModal.style.display = 'none';
            if (signupModal) signupModal.style.display = 'none';
        }
    });
} 
