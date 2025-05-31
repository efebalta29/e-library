// DOM Elements
const logoutBtn = document.getElementById('logoutBtn');
const accountTabs = document.querySelectorAll('.account-tab');
const accountNavLinks = document.querySelectorAll('.account-nav a');
const bookmarksContainer = document.querySelector('.bookmarks-container');
const noBookmarksMessage = document.querySelector('.no-bookmarks-message');
const profileForm = document.getElementById('profileForm');
const settingsForm = document.getElementById('settingsForm');
const cartCount = document.querySelector('.cart-count');

// Verify allBooks is loaded from the books.js file
console.log("Checking allBooks in account.js:", allBooks ? `${allBooks.length} books loaded` : "allBooks not loaded");

// User data
let userBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
    name: 'Ahmet Yılmaz',
    email: 'ahmet@ornek.com',
    bio: 'Kitap meraklısı ve tutkulu bir okuyucuyum. Bilim kurgu ve fantastik romanları seviyorum.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
};

// Display bookmarked books
function displayBookmarks() {
    console.log("Display bookmarks called, current bookmarks:", userBookmarks);
    
    if (userBookmarks.length === 0) {
        if (noBookmarksMessage) {
            noBookmarksMessage.style.display = 'block';
        }
        if (bookmarksContainer) {
            bookmarksContainer.innerHTML = '';
        }
        return;
    }
    
    if (noBookmarksMessage) {
        noBookmarksMessage.style.display = 'none';
    }
    
    // Get the bookmarked books from the all books array
    // Use loose comparison to handle both string and number IDs
    const bookmarkedBooks = allBooks.filter(book => 
        userBookmarks.some(id => id.toString() === book.id.toString())
    );
    
    console.log("Found bookmarked books:", bookmarkedBooks);
    
    if (bookmarksContainer) {
        if (bookmarkedBooks.length > 0) {
            bookmarksContainer.innerHTML = bookmarkedBooks.map(book => createBookmarkCard(book)).join('');
            
            // Add event listeners to remove buttons
            const removeButtons = document.querySelectorAll('.remove-bookmark');
            removeButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const bookId = this.getAttribute('data-id');
                    removeBookmark(bookId);
                });
            });
            
            // Add event listeners to read buttons
            const readButtons = document.querySelectorAll('.read-book');
            readButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const bookId = this.closest('.bookmark-card').getAttribute('data-id');
                    window.location.href = `read.html?id=${bookId}`;
                });
            });
        } else {
            // If we have bookmarks but couldn't find any matching books
            console.log("No matching books found for the bookmarks");
            if (noBookmarksMessage) {
                noBookmarksMessage.style.display = 'block';
            }
            bookmarksContainer.innerHTML = '';
        }
    }
}

// Create a bookmark card HTML
function createBookmarkCard(book) {
    return `
        <div class="bookmark-card" data-id="${book.id}">
            <div class="bookmark-cover">
                <img src="${book.cover}" alt="${book.title}">
            </div>
            <div class="bookmark-info">
                <h3 class="bookmark-title">${book.title}</h3>
                <p class="bookmark-author">${book.author}</p>
                <div class="bookmark-rating">
                    ${generateRatingStars(book.rating)}
                    <span>${book.rating.toFixed(1)}</span>
                </div>
                <div class="bookmark-actions">
                    <button class="remove-bookmark" data-id="${book.id}">Kaldır</button>
                    <button class="read-book">Oku</button>
                </div>
            </div>
        </div>
    `;
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

// Remove a bookmark
function removeBookmark(bookId) {
    // Convert bookId to integer to ensure consistent comparison
    const bookIdInt = parseInt(bookId);
    
    // Filter out the bookmark with the matching ID
    userBookmarks = userBookmarks.filter(id => parseInt(id) !== bookIdInt);
    
    // Save to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(userBookmarks));
    
    // Update the display
    displayBookmarks();
    
    // Update bookmark count
    updateBookmarkCount();
}

// Clear all bookmarks
function clearAllBookmarks() {
    if (confirm('Tüm yer imlerini silmek istediğinizden emin misiniz?')) {
        userBookmarks = [];
        localStorage.setItem('bookmarks', JSON.stringify(userBookmarks));
        displayBookmarks();
        updateBookmarkCount();
        alert('Tüm yer imleri silindi.');
    }
}

// Update the bookmark count in the header
function updateBookmarkCount() {
    const bookmarkCountEls = document.querySelectorAll('.cart-count');
    bookmarkCountEls.forEach(el => {
        el.textContent = userBookmarks.length;
    });
}

// Update profile info
function updateProfileInfo() {
    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');
    const profileNameElement = document.getElementById('profileName');
    const profileEmailElement = document.getElementById('profileEmail');
    const profileBioElement = document.getElementById('profileBio');
    
    if (userNameElement) userNameElement.textContent = userProfile.name;
    if (userEmailElement) userEmailElement.textContent = userProfile.email;
    
    // Update form values
    if (profileNameElement) profileNameElement.value = userProfile.name;
    if (profileEmailElement) profileEmailElement.value = userProfile.email;
    if (profileBioElement) profileBioElement.value = userProfile.bio;
    
    // Update avatar
    const avatars = document.querySelectorAll('.avatar img, .profile-picture-upload img');
    avatars.forEach(avatar => {
        avatar.src = userProfile.avatar;
    });
}

// Switch between tabs
function switchTab(tabId) {
    // Hide all tabs
    accountTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show the selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Update navigation
    accountNavLinks.forEach(link => {
        const linkTabId = link.getAttribute('href').substring(1);
        const listItem = link.parentElement;
        
        if (linkTabId === tabId) {
            listItem.classList.add('active');
        } else {
            listItem.classList.remove('active');
        }
    });
}

// Event Listeners
// Tab navigation
accountNavLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const tabId = this.getAttribute('href').substring(1);
        
        if (tabId === 'logout') {
            // Handle logout
            if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
                // In a real app, this would involve server-side logout
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                alert('Çıkış yaptınız.');
                window.location.href = 'index.html';
            }
        } else {
            switchTab(tabId);
        }
    });
});

// Profile form submission
if (profileForm) {
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        userProfile.name = document.getElementById('profileName').value;
        userProfile.email = document.getElementById('profileEmail').value;
        userProfile.bio = document.getElementById('profileBio').value;
        
        // Save to localStorage
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        
        // Update display
        updateProfileInfo();
        
        alert('Profil bilgileriniz güncellendi!');
    });
}

// Settings form submission
if (settingsForm) {
    settingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // In a real app, this would save the settings to a server
        
        alert('Ayarlarınız kaydedildi!');
    });
}

// Change profile picture button
document.querySelector('.change-picture-btn').addEventListener('click', function() {
    // In a real app, this would open a file picker or similar
    
    // For demo, we'll just rotate through some sample avatars
    const avatars = [
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    ];
    
    const currentIndex = avatars.indexOf(userProfile.avatar);
    const nextIndex = (currentIndex + 1) % avatars.length;
    
    userProfile.avatar = avatars[nextIndex];
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // Update display
    updateProfileInfo();
});

// Initialize the application
function init() {
    console.log("Initializing account.js...");
    
    // Check if we have data in both storage keys
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const userBookmarksStorage = JSON.parse(localStorage.getItem('userBookmarks')) || [];
    
    console.log("Found bookmarks:", bookmarks);
    console.log("Found userBookmarks:", userBookmarksStorage);
    
    // If we have data in userBookmarks but not in bookmarks, copy it
    if (userBookmarksStorage.length > 0 && bookmarks.length === 0) {
        console.log("Copying userBookmarks to bookmarks");
        localStorage.setItem('bookmarks', JSON.stringify(userBookmarksStorage));
        userBookmarks = userBookmarksStorage;
    }
    // If we have data in both, merge them
    else if (userBookmarksStorage.length > 0 && bookmarks.length > 0) {
        console.log("Merging bookmarks");
        // Combine both arrays and remove duplicates
        const mergedBookmarks = [...new Set([...bookmarks, ...userBookmarksStorage])];
        localStorage.setItem('bookmarks', JSON.stringify(mergedBookmarks));
        userBookmarks = mergedBookmarks;
    }
    
    // Now validate the bookmarks against allBooks
    const validBookmarks = userBookmarks.filter(id => 
        allBooks.some(book => book.id.toString() === id.toString())
    );
    
    // If there's a difference, update localStorage with only valid bookmarks
    if (validBookmarks.length !== userBookmarks.length) {
        console.log("Updating with valid bookmarks only");
        localStorage.setItem('bookmarks', JSON.stringify(validBookmarks));
        userBookmarks = validBookmarks;
    }
    
    updateProfileInfo();
    displayBookmarks();
    updateBookmarkCount();
}

// Call init when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 
