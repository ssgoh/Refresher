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
    },
    {
        id: 4,
        title: 'Advanced CSS Layouts',
        description: 'Learn about Flexbox and Grid for modern layouts.',
        date: '2024-05-25',
        content: 'Modern CSS layouts using Flexbox and Grid allow for more complex and responsive designs...',
        type: 'tutorial'
    },
    {
        id: 5,
        title: 'Database Design',
        description: 'Fundamentals of relational database design.',
        date: '2024-05-10',
        content: 'Proper database design is crucial for application performance and data integrity...',
        type: 'tutorial'
    },
    {
        id: 6,
        title: 'React Components',
        description: 'Building reusable components in React.',
        date: '2024-04-28',
        content: 'React components are the building blocks of React applications...',
        type: 'tutorial'
    },
    {
        id: 7,
        title: 'Python for Beginners',
        description: 'Introduction to Python programming language.',
        date: '2024-04-15',
        content: 'Python is a high-level, interpreted programming language known for its readability...',
        type: 'tutorial'
    },
    {
        id: 8,
        title: 'Git Version Control',
        description: 'Managing code with Git and GitHub.',
        date: '2023-12-10',
        content: 'Git is a distributed version control system that helps track changes in source code...',
        type: 'tutorial'
    },
    {
        id: 9,
        title: 'Algorithms Fundamentals',
        description: 'Basic algorithms and data structures.',
        date: '2023-12-05',
        content: 'Understanding algorithms and data structures is essential for efficient programming...',
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

// Load all tutorials on the tutorials page organized by year and month
function loadAllTutorials() {
    const tutorialsContainer = document.getElementById('tutorials-container');
    
    if (tutorialsContainer) {
        tutorialsContainer.innerHTML = '';
        
        // Check if a period is selected from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const selectedPeriod = urlParams.get('period');
        
        // Group tutorials by year and month
        const tutorialsByPeriod = {};
        
        sampleTutorials.forEach(tutorial => {
            const date = new Date(tutorial.date);
            const year = date.getFullYear();
            const month = date.toLocaleString('default', { month: 'short' });
            const period = `${year} ${month}`;
            
            if (!tutorialsByPeriod[period]) {
                tutorialsByPeriod[period] = [];
            }
            
            tutorialsByPeriod[period].push(tutorial);
        });
        
        // Sort periods chronologically (newest first)
        const sortedPeriods = Object.keys(tutorialsByPeriod).sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateB - dateA;
        });
        
        // Create a container for all periods
        const periodsContainer = document.createElement('div');
        periodsContainer.className = 'periods-container';
        
        if (selectedPeriod) {
            // Display tutorials for the selected period
            if (tutorialsByPeriod[selectedPeriod]) {
                // Add a back button
                const backButton = document.createElement('a');
                backButton.href = 'tutorials.html';
                backButton.className = 'back-button';
                backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Back to All Periods';
                tutorialsContainer.appendChild(backButton);
                
                // Add period header
                const periodHeader = document.createElement('h3');
                periodHeader.className = 'period-header selected-period';
                periodHeader.textContent = `Tutorials from ${selectedPeriod}`;
                periodsContainer.appendChild(periodHeader);
                
                // Sort tutorials alphabetically by title
                const sortedTutorials = tutorialsByPeriod[selectedPeriod].sort((a, b) => 
                    a.title.localeCompare(b.title)
                );
                
                // Create tutorial list
                const tutorialList = document.createElement('ul');
                tutorialList.className = 'tutorial-list';
                
                // Add tutorials to the list
                sortedTutorials.forEach(tutorial => {
                    const listItem = document.createElement('li');
                    listItem.className = 'tutorial-list-item';
                    
                    listItem.innerHTML = `
                        <div class="list-item-content">
                            <i class="fas fa-book"></i>
                            <div class="list-item-details">
                                <h3><a href="tutorial.html?id=${tutorial.id}">${tutorial.title}</a></h3>
                                <span class="date">${formatDate(tutorial.date)}</span>
                                <p>${tutorial.description}</p>
                            </div>
                        </div>
                    `;
                    
                    tutorialList.appendChild(listItem);
                });
                
                periodsContainer.appendChild(tutorialList);
            } else {
                // Period not found
                const notFoundMessage = document.createElement('p');
                notFoundMessage.textContent = 'No tutorials found for the selected period.';
                periodsContainer.appendChild(notFoundMessage);
            }
        } else {
            // Display only periods
            const periodsHeader = document.createElement('h3');
            periodsHeader.className = 'section-header';
            periodsHeader.textContent = 'Select a Period';
            periodsContainer.appendChild(periodsHeader);
            
            // Create period list
            const periodList = document.createElement('ul');
            periodList.className = 'period-list';
            
            // Add periods to the list
            sortedPeriods.forEach(period => {
                const listItem = document.createElement('li');
                listItem.className = 'period-list-item';
                
                listItem.innerHTML = `
                    <a href="tutorials.html?period=${encodeURIComponent(period)}" class="period-link">
                        <div class="period-item">
                            <i class="fas fa-calendar"></i>
                            <span>${period}</span>
                            <span class="tutorial-count">${tutorialsByPeriod[period].length} tutorials</span>
                        </div>
                    </a>
                `;
                
                periodList.appendChild(listItem);
            });
            
            periodsContainer.appendChild(periodList);
        }
        
        tutorialsContainer.appendChild(periodsContainer);
    }
}

// Load all notes on the notes page
function loadAllNotes() {
    const notesContainer = document.getElementById('notes-container');
    
    if (notesContainer) {
        notesContainer.innerHTML = '';
        const sortedNotes = [...sampleNotes].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Create a list element to hold all notes
        const notesList = document.createElement('ul');
        notesList.className = 'tutorial-list';
        
        sortedNotes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.className = 'tutorial-list-item';
            
            listItem.innerHTML = `
                <div class="list-item-content">
                    <i class="fas fa-sticky-note"></i>
                    <div class="list-item-details">
                        <h3><a href="note.html?id=${note.id}">${note.title}</a></h3>
                        <span class="date">${formatDate(note.date)}</span>
                        <p>${note.description}</p>
                    </div>
                </div>
            `;
            
            notesList.appendChild(listItem);
        });
        
        notesContainer.appendChild(notesList);
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