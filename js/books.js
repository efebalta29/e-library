// DOM Elements
const booksGrid = document.querySelector('.books-grid');
const searchInput = document.getElementById('bookSearch');
const categorySelect = document.getElementById('categorySelect');
const sortSelect = document.getElementById('sortSelect');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const cartCount = document.querySelector('.cart-count');

// Mock verileri yükle - import yerine script etiketleri ile yüklenir
// allBooks değişkeni global olarak erişilebilir olacak

// User cart/bookmarks data
let userBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

// Pagination state
let currentPage = 1;
const booksPerPage = 6;
let filteredBooks = [...allBooks];

// Display books with pagination
function displayBooks(books, page = 1) {
    const startIndex = (page - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const paginatedBooks = books.slice(startIndex, endIndex);
    
    if (paginatedBooks.length === 0) {
        booksGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Kitap bulunamadı</h3>
                <p>Arama veya filtre kriterlerinizi ayarlamayı deneyin</p>
            </div>
        `;
        
        // Disable pagination
        updatePaginationControls(page, 1);
        return;
    }
    
    booksGrid.innerHTML = paginatedBooks.map(book => createBookCard(book)).join('');
    
    // Add event listeners to the bookmark buttons
    addBookmarkEventListeners();
    
    // Add event listeners to book cards for detail view
    addBookCardEventListeners();
    
    // Update pagination controls
    const totalPages = Math.ceil(books.length / booksPerPage);
    updatePaginationControls(page, totalPages);
}

// Create a book card HTML
function createBookCard(book) {
    const isBookmarked = userBookmarks.includes(book.id);
    const bookmarkIcon = isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
    
    return `
        <div class="book-card" data-id="${book.id}">
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}">
                <div class="book-actions">
                    <button class="add-bookmark" data-id="${book.id}"><i class="${bookmarkIcon}"></i></button>
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
}

// Truncate text with ellipsis
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

// Create star rating HTML
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

// Add event listeners to bookmark buttons
function addBookmarkEventListeners() {
    const bookmarkBtns = document.querySelectorAll('.add-bookmark');
    
    bookmarkBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the book card click event
            const bookId = parseInt(this.getAttribute('data-id'));
            toggleBookmark(bookId, this);
        });
    });
}

// Add event listeners to book cards
function addBookCardEventListeners() {
    const bookCards = document.querySelectorAll('.book-card');
    const detailBtns = document.querySelectorAll('.view-details');
    
    // Book cards click event
    bookCards.forEach(card => {
        card.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-id'));
            showBookDetail(bookId);
        });
    });
    
    // Detail buttons click event
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the book card click event
            const bookId = parseInt(this.getAttribute('data-id'));
            showBookDetail(bookId);
        });
    });
}

// Toggle bookmark status
function toggleBookmark(bookId, button) {
    const index = userBookmarks.indexOf(bookId);
    const icon = button.querySelector('i');
    
    if (index === -1) {
        // Add bookmark
        userBookmarks.push(bookId);
        icon.className = 'fas fa-bookmark';
    } else {
        // Remove bookmark
        userBookmarks.splice(index, 1);
        icon.className = 'far fa-bookmark';
    }
    
    // Update bookmark count
    updateBookmarkCount();
    
    // Save to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(userBookmarks));
}

// Update the bookmark count in the header
function updateBookmarkCount() {
    cartCount.textContent = userBookmarks.length;
}

// Update pagination controls
function updatePaginationControls(currentPage, totalPages) {
    pageInfo.textContent = `Sayfa ${currentPage} / ${totalPages}`;
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Filter books based on search and category
function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    
    filteredBooks = allBooks.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                            book.author.toLowerCase().includes(searchTerm) ||
                            book.description.toLowerCase().includes(searchTerm);
                            
        const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    // Apply sorting
    sortBooks();
    
    // Reset to first page when filter changes
    currentPage = 1;
    
    // Display filtered books
    displayBooks(filteredBooks, currentPage);
}

// Sort books based on selected option
function sortBooks() {
    const sortOption = sortSelect.value;
    
    switch (sortOption) {
        case 'title-asc':
            filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'rating-desc':
            filteredBooks.sort((a, b) => b.rating - a.rating);
            break;
        case 'rating-asc':
            filteredBooks.sort((a, b) => a.rating - b.rating);
            break;
    }
}

// Show book detail view
function showBookDetail(bookId) {
    const book = allBooks.find(book => book.id === bookId);
    
    if (!book) return;
    
    // Check if overlay already exists
    let overlay = document.querySelector('.book-detail-overlay');
    
    if (!overlay) {
        // Create overlay if it doesn't exist
        overlay = document.createElement('div');
        overlay.className = 'book-detail-overlay';
        document.body.appendChild(overlay);
    }
    
    const isBookmarked = userBookmarks.includes(book.id);
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
    
    overlay.style.display = 'flex';
    
    // Add event listener to close button
    const closeButton = overlay.querySelector('.close-detail');
    closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
    
    // Add event listener to read button
    const readButton = overlay.querySelector('.read-button');
    readButton.addEventListener('click', () => {
        window.location.href = `read.html?id=${book.id}`;
    });
    
    // Add event listener to bookmark button
    const bookmarkButton = overlay.querySelector('.bookmark-detail-btn');
    bookmarkButton.addEventListener('click', function() {
        const bookId = parseInt(this.getAttribute('data-id'));
        const icon = this.querySelector('i');
        
        // Toggle bookmark
        if (userBookmarks.includes(bookId)) {
            // Remove bookmark
            userBookmarks = userBookmarks.filter(id => id !== bookId);
            icon.className = 'far fa-bookmark';
            this.innerHTML = `<i class="far fa-bookmark"></i> Yer İmlerine Ekle`;
        } else {
            // Add bookmark
            userBookmarks.push(bookId);
            icon.className = 'fas fa-bookmark';
            this.innerHTML = `<i class="fas fa-bookmark"></i> Yer İmlerinden Kaldır`;
        }
        
        // Update bookmark count
        updateBookmarkCount();
        
        // Save to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(userBookmarks));
        
        // Also update the main page
        const mainPageButton = document.querySelector(`.add-bookmark[data-id="${bookId}"] i`);
        if (mainPageButton) {
            mainPageButton.className = userBookmarks.includes(bookId) ? 'fas fa-bookmark' : 'far fa-bookmark';
        }
    });
    
    // Close when clicking outside the detail container
    overlay.addEventListener('click', function(event) {
        if (event.target === this) {
            this.style.display = 'none';
        }
    });
}

// Event Listeners
// Search input
searchInput.addEventListener('input', filterBooks);

// Category select
categorySelect.addEventListener('change', filterBooks);

// Sort select
sortSelect.addEventListener('change', function() {
    sortBooks();
    displayBooks(filteredBooks, currentPage);
});

// Pagination
prevPageBtn.addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        displayBooks(filteredBooks, currentPage);
    }
});

nextPageBtn.addEventListener('click', function() {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayBooks(filteredBooks, currentPage);
    }
});

// Initialize the application
function init() {
    displayBooks(allBooks, 1);
    updateBookmarkCount();
}

// Call init when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 
