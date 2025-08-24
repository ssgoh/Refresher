// Sample data - In a real application, this would come from a database or API
const sampleTutorials = [
    {
        id: 1,
        title: 'Introduction to HTML',
        description: 'Learn the basics of HTML structure and common elements.',
        date: '2024-06-20',
        content: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser...',
        type: 'tutorial'
    },
    {
        id: 2,
        title: 'CSS Fundamentals',
        description: 'Master the core concepts of CSS styling.',
        date: '2024-06-18',
        content: 'CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML...',
        type: 'tutorial'
    },
    {
        id: 3,
        title: 'JavaScript Basics',
        description: 'Get started with JavaScript programming.',
        date: '2024-06-15',
        content: 'JavaScript is a programming language that conforms to the ECMAScript specification...',
        type: 'tutorial'
    }
];

const sampleNotes = [
    {
        id: 1,
        title: 'Exam Preparation Tips',
        description: 'Important tips for preparing for your upcoming exams.',
        date: '2024-06-19',
        content: 'Start early, create a study schedule, focus on understanding concepts rather than memorizing...',
        type: 'note'
    },
    {
        id: 2,
        title: 'Project Submission Guidelines',
        description: 'Guidelines for submitting your final project.',
        date: '2024-06-17',
        content: 'All projects must be submitted in PDF format. Include your name and student ID on every page...',
        type: 'note'
    },
    {
        id: 3,
        title: 'Recommended Resources',
        description: 'Additional learning resources for the course.',
        date: '2024-06-14',
        content: 'Here are some recommended books, websites, and videos to supplement your learning...',
        type: 'note'
    }
];

// Function to create content cards
function createContentCard(item) {
    const card = document.createElement('div');
    card.className = 'content-card';
    
    const iconClass = item.type === 'tutorial' ? 'fas fa-book' : 'fas fa-sticky-note';
    
    card.innerHTML = `
        <div class="card-image">
            <i class="${iconClass}"></i>
        </div>
        <div class="card-content">
            <h3>${item.title}</h3>
            <span class="date">${formatDate(item.date)}</span>
            <p>${item.description}</p>
            <a href="${item.type === 'tutorial' ? 'tutorial' : 'note'}.html?id=${item.id}" class="read-more">Read More</a>
        </div>
    `;
    
    return card;
}

// Format date to be more readable
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Load recent content on the homepage
function loadRecentContent() {
    const recentTutorialsContainer = document.getElementById('recent-tutorials');
    const recentNotesContainer = document.getElementById('recent-notes');
    
    if (recentTutorialsContainer) {
        recentTutorialsContainer.innerHTML = '';
        const sortedTutorials = [...sampleTutorials].sort((a, b) => new Date(b.date) - new Date(a.date));
        const recentTutorials = sortedTutorials.slice(0, 3);
        
        recentTutorials.forEach(tutorial => {
            recentTutorialsContainer.appendChild(createContentCard(tutorial));
        });
    }
    
    if (recentNotesContainer) {
        recentNotesContainer.innerHTML = '';
        const sortedNotes = [...sampleNotes].sort((a, b) => new Date(b.date) - new Date(a.date));
        const recentNotes = sortedNotes.slice(0, 3);
        
        recentNotes.forEach(note => {
            recentNotesContainer.appendChild(createContentCard(note));
        });
    }
}

// Load all tutorials on the tutorials page
function loadAllTutorials() {
    const tutorialsContainer = document.getElementById('tutorials-container');
    
    if (tutorialsContainer) {
        tutorialsContainer.innerHTML = '';
        const sortedTutorials = [...sampleTutorials].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedTutorials.forEach(tutorial => {
            tutorialsContainer.appendChild(createContentCard(tutorial));
        });
    }
}

// Load all notes on the notes page
function loadAllNotes() {
    const notesContainer = document.getElementById('notes-container');
    
    if (notesContainer) {
        notesContainer.innerHTML = '';
        const sortedNotes = [...sampleNotes].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedNotes.forEach(note => {
            notesContainer.appendChild(createContentCard(note));
        });
    }
}

// Display single tutorial or note
function displaySingleContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const contentContainer = document.getElementById('content-display');
    
    if (contentContainer && id) {
        let content;
        
        if (window.location.pathname.includes('tutorial')) {
            content = sampleTutorials.find(item => item.id === parseInt(id));
        } else if (window.location.pathname.includes('note')) {
            content = sampleNotes.find(item => item.id === parseInt(id));
        }
        
        if (content) {
            contentContainer.innerHTML = `
                <div class="content-header">
                    <h2>${content.title}</h2>
                    <div class="meta">Published on ${formatDate(content.date)}</div>
                </div>
                <div class="content-body">
                    ${content.content}
                </div>
                <a href="${content.type === 'tutorial' ? 'tutorials' : 'notes'}.html" class="read-more">Back to ${content.type === 'tutorial' ? 'Tutorials' : 'Notes'}</a>
            `;
        } else {
            contentContainer.innerHTML = '<p>Content not found.</p>';
        }
    }
}

// Admin login functionality
function setupAdminLogin() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple authentication - In a real app, this would be server-side
            if (username === 'admin' && password === 'password123') {
                // Store authentication state
                localStorage.setItem('isLoggedIn', 'true');
                
                // Show content management form
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('content-management').style.display = 'block';
            } else {
                document.getElementById('login-error').textContent = 'Invalid username or password';
            }
        });
    }
}

// Check if admin is logged in
function checkAdminLogin() {
    const loginSection = document.getElementById('login-section');
    const contentManagement = document.getElementById('content-management');
    
    if (loginSection && contentManagement) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            loginSection.style.display = 'none';
            contentManagement.style.display = 'block';
        } else {
            loginSection.style.display = 'block';
            contentManagement.style.display = 'none';
        }
    }
}

// Admin logout
function setupAdminLogout() {
    const logoutButton = document.getElementById('logout-button');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            checkAdminLogin();
        });
    }
}

// Content submission form
function setupContentForm() {
    const contentForm = document.getElementById('content-form');
    
    if (contentForm) {
        contentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('content-title').value;
            const type = document.getElementById('content-type').value;
            const description = document.getElementById('content-description').value;
            const content = document.getElementById('content-body').value;
            
            // In a real app, this would be sent to a server
            const newContent = {
                id: type === 'tutorial' ? sampleTutorials.length + 1 : sampleNotes.length + 1,
                title,
                description,
                date: new Date().toISOString().split('T')[0],
                content,
                type
            };
            
            if (type === 'tutorial') {
                sampleTutorials.push(newContent);
            } else {
                sampleNotes.push(newContent);
            }
            
            // Show success message
            document.getElementById('form-success').textContent = 'Content published successfully!';
            contentForm.reset();
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                document.getElementById('form-success').textContent = '';
            }, 3000);
        });
    }
}

// Initialize the application
function initApp() {
    // Check which page we're on and load appropriate content
    const path = window.location.pathname;
    
    if (path.endsWith('index.html') || path.endsWith('/')) {
        loadRecentContent();
    } else if (path.includes('tutorials.html')) {
        loadAllTutorials();
    } else if (path.includes('notes.html')) {
        loadAllNotes();
    } else if (path.includes('tutorial.html') || path.includes('note.html')) {
        displaySingleContent();
    } else if (path.includes('admin.html')) {
        setupAdminLogin();
        checkAdminLogin();
        setupAdminLogout();
        setupContentForm();
    }
}

// Run the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);