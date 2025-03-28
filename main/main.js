// Global variables
let isLoggedIn = false;
let userDetails = null;

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in from localStorage
    checkLoginStatus();
    
    // Initialize FAQ accordions if present on page
    initFAQAccordion();
    
    // Initialize QR code generation if on verification page
    if (document.querySelector('.qr-generator')) {
        initQRGenerator();
    }
    
    // Initialize QR code scanner if on verification page
    if (document.querySelector('.qr-scanner')) {
        initQRScanner();
    }
    
    // Initialize booth locator map if on booth locator page
    if (document.querySelector('.map-container')) {
        initBoothMap();
    }

    // Initialize login form if on login page
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Initialize registration form if on registration page
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }
});

// Check if user is logged in
function checkLoginStatus() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        userDetails = JSON.parse(storedUser);
        isLoggedIn = true;
        updateUIForLoggedInUser();
    }
}

// Update UI elements for logged in users
function updateUIForLoggedInUser() {
    const authContainer = document.querySelector('.auth-container');
    if (authContainer) {
        authContainer.innerHTML = `
            <span class="user-greeting">Welcome, ${userDetails.name}</span>
            <a href="voter-qr.html" class="btn-primary">My QR Code</a>
            <a href="#" class="btn-secondary" id="logoutBtn">Logout</a>
        `;
        
        // Add event listener to logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
    }
}

// Handle logout action
function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('user');
    isLoggedIn = false;
    userDetails = null;
    window.location.href = 'index.html';
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    const voterID = document.getElementById('voterID').value;
    const password = document.getElementById('password').value;
    
    // In a real application, this would be an API call
    // For demo purposes, we'll just simulate a successful login
    if (voterID && password) {
        // Simulate user data retrieval
        userDetails = {
            id: voterID,
            name: "Sample User",
            constituency: "Sample Constituency",
            boothNumber: "B12345"
        };
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userDetails));
        isLoggedIn = true;
        
        // Redirect to voter QR page
        window.location.href = 'voter-qr.html';
    } else {
        showAlert('Please enter both Voter ID and Password');
    }
}

// Handle registration form submission
function handleRegistration(e) {
    e.preventDefault();
    const name = document.getElementById('fullName').value;
    const mobile = document.getElementById('mobile').value;
    const aadhaar = document.getElementById('aadhaar').value;
    const address = document.getElementById('address').value;
    
    // Validate form
    if (!name || !mobile || !aadhaar || !address) {
        showAlert('Please fill all required fields');
        return;
    }
    
    // Validate Aadhaar (12 digits)
    if (!/^\d{12}$/.test(aadhaar)) {
        showAlert('Aadhaar number must be 12 digits');
        return;
    }
    
    // Validate mobile (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
        showAlert('Mobile number must be 10 digits');
        return;
    }
    
    // In a real application, this would be an API call
    // For demo purposes, we'll just simulate a successful registration
    
    // Generate a random voter ID
    const voterId = 'IND' + Math.floor(100000000 + Math.random() * 900000000);
    
    // Show success message
    const formContainer = document.querySelector('.form-container');
    formContainer.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h2>Registration Successful!</h2>
            <p>Your Voter ID: <strong>${voterId}</strong></p>
            <p>A temporary password has been sent to your registered mobile number.</p>
            <p>Please login to generate your QR code.</p>
            <div class="form-actions">
               <a href="login.html" class="btn-primary">Proceed to Login</a>
            </div>
        </div>
    `;
}

// Initialize FAQ accordion functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
}

// Initialize QR code generator
function initQRGenerator() {
    if (!isLoggedIn) {
        return;
    }
    
    const qrDisplay = document.querySelector('.qr-display');
    if (qrDisplay) {
        // In a real application, this would generate an actual QR code
        // For demo purposes, we'll just show an image
        qrDisplay.innerHTML = `
            <img src="/api/placeholder/250/250" alt="QR Code" />
            <div class="qr-info">
                <p>Voter ID: ${userDetails.id}</p>
                <p>Name: ${userDetails.name}</p>
                <p>Booth: ${userDetails.boothNumber}</p>
            </div>
        `;
    }
}

// Initialize QR code scanner
function initQRScanner() {
    const scannerElement = document.querySelector('.qr-scanner');
    const verificationResult = document.querySelector('.verification-result');
    
    if (scannerElement && verificationResult) {
        // Add scan button for demo
        scannerElement.innerHTML += `
            <button id="scan-btn" class="btn-primary">Scan QR Code</button>
        `;
        
        // Add event listener to scan button
        document.getElementById('scan-btn').addEventListener('click', () => {
            // Simulate scanning process
            scannerElement.innerHTML = `
                <div class="scanning-animation">
                    <img src="/api/placeholder/250/250" alt="Scanning" />
                    <div class="scan-line"></div>
                </div>
                <p>Scanning...</p>
            `;
            
            // Simulate verification delay
            setTimeout(() => {
                // Show successful verification
                verificationResult.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h2>Verification Successful</h2>
                        <div class="voter-details">
                            <p><strong>Voter ID:</strong> IND123456789</p>
                            <p><strong>Name:</strong> Rajesh Kumar</p>
                            <p><strong>Age:</strong> 32</p>
                            <p><strong>Constituency:</strong> New Delhi Central</p>
                            <p><strong>Booth:</strong> B12345</p>
                        </div>
                        <button id="verify-btn" class="btn-primary">Complete Verification</button>
                    </div>
                `;
                
                // Add event listener to verification button
                document.getElementById('verify-btn').addEventListener('click', () => {
                    verificationResult.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h2>Ready to Vote</h2>
                            <p>Please proceed to booth #3</p>
                            <p>Current estimated wait time: <strong>5 minutes</strong></p>
                        </div>
                    `;
                });
            }, 2000);
        });
    }
}

// Initialize booth locator map
function initBoothMap() {
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        // In a real application, this would initialize a map like Google Maps
        // For demo purposes, we'll just show a placeholder
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <img src="/api/placeholder/1000/500" alt="Map" style="width: 100%; height: 100%; object-fit: cover;" />
                <div class="map-overlay">Interactive Map</div>
            </div>
        `;
    }
    
    // Handle filter form
    const filterForm = document.getElementById('booth-filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get filter values
            const district = document.getElementById('district').value;
            const constituency = document.getElementById('constituency').value;
            
            // Simulate filtering booths
            updateBoothList(district, constituency);
        });
    }
}

// Update booth list based on filters
function updateBoothList(district, constituency) {
    const boothList = document.querySelector('.booth-list');
    if (boothList) {
        // In a real application, this would fetch data from an API
        // For demo purposes, we'll just update the list with static data
        boothList.innerHTML = `
            <div class="booth-item">
                <div class="booth-name">Booth #B12345 - ${district} Community Center</div>
                <div class="booth-address">123 Main Road, ${constituency}, ${district}</div>
                <div class="booth-meta">
                    <span><i class="fas fa-users"></i> Current Wait: 15 mins</span>
                    <span><i class="fas fa-map-marker-alt"></i> 2.5 km away</span>
                </div>
                <a href="verification.html" class="btn-secondary">Select This Booth</a>
            </div>
            <div class="booth-item">
                <div class="booth-name">Booth #B12346 - ${district} Public School</div>
                <div class="booth-address">456 Park Street, ${constituency}, ${district}</div>
                <div class="booth-meta">
                    <span><i class="fas fa-users"></i> Current Wait: 5 mins</span>
                    <span><i class="fas fa-map-marker-alt"></i> 3.2 km away</span>
                </div>
                <a href="verification.html" class="btn-secondary">Select This Booth</a>
            </div>
            <div class="booth-item">
                <div class="booth-name">Booth #B12347 - ${district} Municipal Office</div>
                <div class="booth-address">789 Lake Road, ${constituency}, ${district}</div>
                <div class="booth-meta">
                    <span><i class="fas fa-users"></i> Current Wait: 30 mins</span>
                    <span><i class="fas fa-map-marker-alt"></i> 1.8 km away</span>
                </div>
                <a href="verification.html" class="btn-secondary">Select This Booth</a>
            </div>
        `;
    }
}

// Show alert message
function showAlert(message) {
    // Create alert element
    const alertElement = document.createElement('div');
    alertElement.className = 'alert-message';
    alertElement.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(alertElement);
    
    // Add visible class after a small delay (for animation)
    setTimeout(() => {
        alertElement.classList.add('visible');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alertElement.classList.remove('visible');
        setTimeout(() => {
            alertElement.remove();
        }, 300);
    }, 3000);
}

// Generate a sample QR code data
function generateQRData(voterDetails) {
    // In a real application, this would generate encrypted data
    // For demo purposes, we'll just return a JSON string
    return JSON.stringify({
        id: voterDetails.id,
        name: voterDetails.name,
        constituency: voterDetails.constituency,
        boothNumber: voterDetails.boothNumber,
        timestamp: new Date().toISOString(),
        signature: "ENCRYPTED_SIGNATURE_HERE"
    });
}

// Add CSS styles for alerts
document.head.insertAdjacentHTML('beforeend', `
<style>
.alert-message {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #ff3b30;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.alert-message.visible {
    opacity: 1;
    transform: translateY(0);
}

.alert-content {
    display: flex;
    align-items: center;
}

.alert-content i {
    margin-right: 10px;
    font-size: 1.2rem;
}

.scanning-animation {
    position: relative;
    width: 250px;
    height: 250px;
    margin: 0 auto;
    overflow: hidden;
}

.scan-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #FF9933;
    box-shadow: 0 0 5px #FF9933;
    animation: scan 2s linear infinite;
}

@keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
}

.success-message {
    text-align: center;
    padding: 20px;
}

.success-message i {
    font-size: 4rem;
    color: #138808;
    margin-bottom: 20px;
}

.voter-details {
    text-align: left;
    margin: 20px 0;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
}

.voter-details p {
    margin-bottom: 8px;
}

.map-placeholder {
    position: relative;
    width: 100%;
    height: 100%;
}

.map-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(22, 50, 92, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: bold;
}
</style>
`);