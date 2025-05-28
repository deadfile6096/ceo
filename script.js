// Game Data
const startupIdeas = [
    "Subscription bread with blockchain integration",
    "Tinder for introverted dogs",
    "AI that creates other AIs",
    "Avatar-as-a-Service, $99/month",
    "Digital garden for imaginary friends",
    "Uber for pets with anxiety",
    "Decentralized dream journal sharing app",
    "NFT-based plant watering tracker",
    "Virtual coworking space inside a coffee machine",
    "SaaS for organizing your other SaaS tools",
    "Mobile app that sends compliments to your fridge",
    "Crypto-powered loyalty program for barbershops",
    "Generative AI for writing breakup texts",
    "On-chain subscription to invisible podcasts",
    "E-scooters that judge your outfit in real time",
    "Toilet paper with embedded crypto mining chips",
    "AI-powered sock matching algorithm as a service",
    "Blockchain-verified certification for imaginary friends",
    "Metaverse haircuts for your digital avatar's pet",
    "Smart contract divorce papers that execute automatically",
    "Subscription service for pre-chewed gum",
    "Quantum-encrypted messages to your past self",
    "Marketplace for trading unused meeting minutes",
    "AR glasses that make everyone look like Nicolas Cage",
    "Cloud-based storage for your dreams and nightmares"
];

const buzzwords = [
    "AI-powered",
    "Web3-native",
    "Decentralized",
    "Quantum-enhanced",
    "Built on the blockchain",
    "Emotionally intelligent",
    "Scalable-as-a-Service",
    "ML-optimized",
    "Next-gen synergy-driven",
    "Cloud-native with edge inference",
    "IoT-friendly",
    "B2B2C-enabled",
    "Crypto-reward model",
    "SaaS-as-a-Service",
    "Web4-ready",
    "Ultra-scalable",
    "Metaverse-compatible",
    "Zero-UI architecture",
    "API-first mindset",
    "Neurodiverse-ready"
];

// Real pixel art logos from mlogo directory
const logos = [
    "images/mlogo/IMG_20250527_164332.png",
    "images/mlogo/IMG_20250527_164354.png",
    "images/mlogo/IMG_20250527_164408.png",
    "images/mlogo/IMG_20250527_164426.png",
    "images/mlogo/IMG_20250527_164441.png",
    "images/mlogo/IMG_20250527_164455.png",
    "images/mlogo/IMG_20250527_164522.png",
    "images/mlogo/IMG_20250527_164534.png",
    "images/mlogo/IMG_20250527_164604.png",
    "images/mlogo/IMG_20250527_164737.png",
    "images/mlogo/IMG_20250527_164751.png",
    "images/mlogo/IMG_20250527_164811.png",
    "images/mlogo/IMG_20250527_164825.png",
    "images/mlogo/IMG_20250527_164838.png",
    "images/mlogo/IMG_20250527_164900.png",
    "images/mlogo/IMG_20250527_164914.png",
    "images/mlogo/IMG_20250527_164928.png",
    "images/mlogo/IMG_20250527_164941.png",
    "images/mlogo/IMG_20250527_164958.png",
    "images/mlogo/IMG_20250527_165022.png",
    "images/mlogo/IMG_20250527_165041.png",
    "images/mlogo/IMG_20250527_165141.png",
    "images/mlogo/IMG_20250527_165156.png",
    "images/mlogo/IMG_20250527_165211.png",
    "images/mlogo/IMG_20250527_165228.png",
    "images/mlogo/IMG_20250527_165242.png",
    "images/mlogo/IMG_20250527_165259.png",
    "images/mlogo/IMG_20250527_165322.png",
    "images/mlogo/IMG_20250527_165349.png",
    "images/mlogo/IMG_20250527_165457.png",
    "images/mlogo/IMG_20250527_165526.png",
    "images/mlogo/IMG_20250527_165541.png",
    "images/mlogo/IMG_20250527_165606.png",
    "images/mlogo/IMG_20250527_165624.png"
];

const pitchResults = [
    "Investor ghosted you instantly.",
    "You raised $7 from your grandpa!",
    "They liked your logo but not your face.",
    "You're invited to a fake Silicon Valley show!",
    "One guy clapped. That's it.",
    "Investor said: 'I'll think about it' (he won't).",
    "VC replied with a meme only.",
    "You got funded in exposure!",
    "App featured on an imaginary TechCrunch clone.",
    "Investor fell asleep mid-pitch.",
    "You got $1.50 and a pizza coupon!",
    "Received 'spiritual support' from a life coach.",
    "Fake accelerator added you to a waitlist."
];

// Game state
let gameState = {
    currentIdea: "",
    hasLogo: false,
    logoIndex: -1,
    enhanceCount: 0,
    isInFeed: false,
    currency: 0,
    pitchCount: 0,
    successCount: 0
};

// DOM Elements
const generateButton = document.getElementById("generate-idea");
const enhanceButton = document.getElementById("enhance-idea");
const addLogoButton = document.getElementById("add-logo");
const pitchButton = document.getElementById("pitch-idea");
const sendToFeedButton = document.getElementById("send-to-feed");
const currentIdeaElement = document.getElementById("current-idea");
const logoContainer = document.getElementById("logo-container");
const logoDisplay = document.getElementById("logo-display");
const communityFeed = document.getElementById("community-feed");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeButton = document.querySelector(".close-button");
const currencyDisplay = document.getElementById("currency-amount");
const pitchCountDisplay = document.getElementById("pitch-count");
const successRateDisplay = document.getElementById("success-rate");

// Sound elements
const clickSound = document.getElementById("click-sound");
const successSound = document.getElementById("success-sound");
const failSound = document.getElementById("fail-sound");

// Community feed data (simulated)
let feedItems = [];

// Event Listeners
generateButton.addEventListener("click", generateIdea);
enhanceButton.addEventListener("click", enhanceIdea);
addLogoButton.addEventListener("click", addLogo);
pitchButton.addEventListener("click", pitchIdea);
sendToFeedButton.addEventListener("click", sendToFeed);
closeButton.addEventListener("click", closeModal);

// Initialize with some fake feed items
initializeFeed();

// Initialize with starting currency
gameState.currency = 50; // Starting money
updateCurrencyDisplay();

// Set up automatic idea generation every 20 seconds
setInterval(generateRandomFeedIdea, 20000);

// Game Functions
function generateIdea() {
    playSound(clickSound);
    
    // Generate idea cost
    const generateCost = 5;
    
    // Check if player has enough currency
    if (gameState.currency < generateCost) {
        showModal("Not Enough Funds!", `You need $${generateCost} to generate a new idea. Try pitching your current idea first!`);
        playSound(failSound);
        return;
    }
    
    // Deduct cost
    gameState.currency -= generateCost;
    updateCurrencyDisplay();
    
    // Reset game state but keep currency and stats
    const currentCurrency = gameState.currency;
    const currentPitchCount = gameState.pitchCount;
    const currentSuccessCount = gameState.successCount;
    
    gameState = {
        currentIdea: getRandomItem(startupIdeas),
        hasLogo: false,
        logoIndex: -1,
        enhanceCount: 0,
        isInFeed: false,
        currency: currentCurrency,
        pitchCount: currentPitchCount,
        successCount: currentSuccessCount
    };
    
    // Update UI
    currentIdeaElement.textContent = gameState.currentIdea;
    logoContainer.classList.add("hidden");
    
    // Enable/disable buttons
    enhanceButton.disabled = false;
    addLogoButton.disabled = false;
    pitchButton.disabled = false;
    sendToFeedButton.disabled = false;
    
    // Add blinking cursor effect
    addCursorEffect();
}

function enhanceIdea() {
    if (gameState.enhanceCount >= 3) {
        showModal("Buzzword Overload!", "Your idea is already too buzzwordy. Even Silicon Valley has limits.");
        playSound(failSound);
        return;
    }
    
    // Enhance cost
    const enhanceCost = 10;
    
    // Check if player has enough currency
    if (gameState.currency < enhanceCost) {
        showModal("Not Enough Funds!", `You need $${enhanceCost} to enhance your idea with buzzwords. Try pitching your current idea first!`);
        playSound(failSound);
        return;
    }
    
    // Deduct cost
    gameState.currency -= enhanceCost;
    updateCurrencyDisplay();
    
    playSound(clickSound);
    
    // Add a random buzzword
    const buzzword = getRandomItem(buzzwords);
    gameState.currentIdea = `${buzzword} ${gameState.currentIdea}`;
    gameState.enhanceCount++;
    
    // Update UI
    currentIdeaElement.textContent = gameState.currentIdea;
    
    // Add typing animation effect
    addTypingEffect(currentIdeaElement);
}

function addLogo() {
    // Logo cost
    const logoCost = 15;
    
    // Check if player has enough currency
    if (gameState.currency < logoCost) {
        showModal("Not Enough Funds!", `You need $${logoCost} to add a logo. Try pitching your current idea first!`);
        playSound(failSound);
        return;
    }
    
    // Deduct cost
    gameState.currency -= logoCost;
    updateCurrencyDisplay();
    
    playSound(clickSound);
    
    // Select a random logo
    gameState.logoIndex = Math.floor(Math.random() * logos.length);
    gameState.hasLogo = true;
    
    // Update UI
    logoDisplay.innerHTML = ''; // Clear previous content
    const logoImg = document.createElement('img');
    logoImg.src = logos[gameState.logoIndex];
    logoImg.alt = 'Startup Logo';
    logoImg.classList.add('logo-image');
    logoDisplay.appendChild(logoImg);
    logoContainer.classList.remove("hidden");
}

function pitchIdea() {
    playSound(clickSound);
    
    // Increment pitch count
    gameState.pitchCount++;
    updateStatsDisplay();
    
    // Calculate success chance based on idea quality
    let successChance = 0.3; // Base chance
    
    // Enhance chance based on buzzwords
    successChance += gameState.enhanceCount * 0.1;
    
    // Enhance chance if has logo
    if (gameState.hasLogo) {
        successChance += 0.2;
    }
    
    // Cap at 80%
    successChance = Math.min(successChance, 0.8);
    
    // Determine if pitch is successful
    const isSuccess = Math.random() < successChance;
    
    // Get appropriate result
    let result;
    let reward = 0;
    
    if (isSuccess) {
        // Filter successful results
        const successResults = pitchResults.filter(r => 
            r.includes("raised") || r.includes("featured") || 
            r.includes("invited") || r.includes("got $") ||
            r.includes("pizza"));
        
        result = getRandomItem(successResults);
        
        // Calculate reward based on idea quality
        reward = 20 + (gameState.enhanceCount * 15) + (gameState.hasLogo ? 25 : 0);
        
        // Add currency
        gameState.currency += reward;
        gameState.successCount++;
        
        // Update display
        updateCurrencyDisplay();
        updateStatsDisplay();
        
        // Play success sound
        playSound(successSound);
        
        // Show modal with result and reward
        showModal("Pitch Success!", `${result}<br><br>You earned $${reward}!`);
    } else {
        // Filter failure results
        const failureResults = pitchResults.filter(r => 
            !(r.includes("raised") || r.includes("featured") || 
            r.includes("invited") || r.includes("got $") ||
            r.includes("pizza")));
        
        result = getRandomItem(failureResults);
        
        // Play failure sound
        playSound(failSound);
        
        // Show modal with result
        showModal("Pitch Failed!", result);
    }
}

function sendToFeed() {
    if (gameState.isInFeed) {
        showModal("Already Shared", "You've already shared this groundbreaking idea with the world!");
        return;
    }
    
    // Feed cost
    const feedCost = 5;
    
    // Check if player has enough currency
    if (gameState.currency < feedCost) {
        showModal("Not Enough Funds!", `You need $${feedCost} to share your idea. Try pitching your current idea first!`);
        playSound(failSound);
        return;
    }
    
    // Deduct cost
    gameState.currency -= feedCost;
    updateCurrencyDisplay();
    
    playSound(successSound);
    
    // Mark as in feed
    gameState.isInFeed = true;
    
    // Create feed item
    const feedItem = {
        idea: gameState.currentIdea,
        hasLogo: gameState.hasLogo,
        logoIndex: gameState.logoIndex,
        likes: Math.floor(Math.random() * 10),
        founder: getRandomFounderName()
    };
    
    // Add to feed
    feedItems.unshift(feedItem);
    
    // Update UI
    updateFeed();
    
    // Show confirmation
    showModal("Idea Shared!", "Your idea is now in the startup ecosystem. Watch it get ignored in real-time!");
    
    // Chance to get some likes and earn money
    setTimeout(() => {
        const likesEarned = Math.floor(Math.random() * 5) + 1;
        const moneyPerLike = 2;
        const moneyEarned = likesEarned * moneyPerLike;
        
        // Add currency
        gameState.currency += moneyEarned;
        updateCurrencyDisplay();
        
        // Update likes in feed
        feedItem.likes += likesEarned;
        updateFeed();
        
        // Show notification
        showModal("Feed Update!", `Your idea got ${likesEarned} new likes! You earned $${moneyEarned}!`);
    }, 5000);
}

// Helper Functions
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomFounderName() {
    const firstNames = ["Crypto", "Blockchain", "Neural", "Quantum", "Digital", "Virtual", "Meta", "Techno", "Cyber", "Data"];
    const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];
    
    return `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`;
}

function showModal(title, message) {
    document.getElementById("modal-title").textContent = title;
    modalMessage.innerHTML = message; // Changed to innerHTML to support HTML content
    modal.style.display = "block";
}

function showInvestmentModal(item) {
    // Create investment modal content
    const modalTitle = "Invest in " + item.founder + "'s Idea";
    
    // Determine max investment (either player's currency or $50, whichever is lower)
    const maxInvestment = Math.min(gameState.currency, 50);
    
    // If player doesn't have enough money
    if (maxInvestment < 5) {
        showModal("Not Enough Funds!", "You need at least $5 to invest. Try pitching your ideas to earn more money!");
        playSound(failSound);
        return;
    }
    
    // Create modal content with slider
    let modalContent = `
        <p>How much would you like to invest in "${item.idea}"?</p>
        <div class="investment-slider-container">
            <input type="range" min="5" max="${maxInvestment}" value="${Math.min(10, maxInvestment)}" class="investment-slider" id="investment-slider">
            <div class="investment-value-display">
                <span id="investment-value">$${Math.min(10, maxInvestment)}</span>
            </div>
        </div>
        <button id="confirm-investment" class="confirm-investment-btn">Confirm Investment</button>
        <p class="investment-note">50% chance to win or lose.<br>If you win, you'll get 10%-100% extra!</p>
    `;
    
    // Show the modal
    showModal(modalTitle, modalContent);
    
    // Add event listeners to slider and button
    setTimeout(() => {
        const slider = document.getElementById('investment-slider');
        const valueDisplay = document.getElementById('investment-value');
        const confirmButton = document.getElementById('confirm-investment');
        
        // Update value display when slider changes
        slider.addEventListener('input', function() {
            valueDisplay.textContent = '$' + this.value;
        });
        
        // Handle investment when button is clicked
        confirmButton.addEventListener('click', function() {
            const amount = parseInt(slider.value);
            makeInvestment(item, amount);
        });
    }, 100);
}

function makeInvestment(item, amount) {
    // Check if player has enough money
    if (gameState.currency < amount) {
        showModal("Not Enough Funds!", `You need $${amount} to make this investment.`);
        playSound(failSound);
        return;
    }
    
    // Deduct investment amount
    gameState.currency -= amount;
    updateCurrencyDisplay();
    
    // 50/50 chance to win or lose
    const isSuccess = Math.random() >= 0.5;
    
    if (isSuccess) {
        // Calculate bonus (10% to 100% of investment)
        const bonusPercent = Math.floor(Math.random() * 91) + 10; // 10 to 100
        const bonus = Math.floor(amount * bonusPercent / 100);
        const totalReturn = amount + bonus;
        
        // Add return to currency
        gameState.currency += totalReturn;
        updateCurrencyDisplay();
        
        // Play success sound
        playSound(successSound);
        
        // Show success message
        showModal("Investment Success!", 
            `Your $${amount} investment in ${item.founder}'s idea paid off!<br><br>` +
            `You got a ${bonusPercent}% bonus, earning $${bonus} extra.<br>` +
            `Total return: $${totalReturn}`
        );
    } else {
        // Play failure sound
        playSound(failSound);
        
        // Show failure message
        showModal("Investment Failed!", 
            `Your $${amount} investment in ${item.founder}'s idea was a complete disaster!<br><br>` +
            `You lost your entire investment. Better luck next time!`
        );
    }
    
    // Generate a new idea after investment
    setTimeout(() => {
        generateRandomFeedIdea();
    }, 1000);
}

function closeModal() {
    modal.style.display = "none";
}

function playSound(soundElement) {
    // Reset sound to beginning and play
    soundElement.currentTime = 0;
    soundElement.play().catch(e => console.log("Sound play error:", e));
}

function addCursorEffect() {
    // Remove any existing cursor
    const existingCursor = currentIdeaElement.querySelector(".cursor");
    if (existingCursor) {
        existingCursor.remove();
    }
    
    // Add blinking cursor
    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    currentIdeaElement.appendChild(cursor);
}

function addTypingEffect(element) {
    // Simple typing effect simulation
    const text = element.textContent;
    element.textContent = "";
    
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            addCursorEffect();
        }
    }, 30);
}

function updateFeed() {
    // Clear current feed
    communityFeed.innerHTML = "";
    
    // Add feed items (limit to 10)
    const itemsToShow = feedItems.slice(0, 10);
    
    itemsToShow.forEach(item => {
        const feedItemElement = document.createElement("div");
        feedItemElement.classList.add("feed-item");
        
        const founderElement = document.createElement("h3");
        founderElement.textContent = item.founder;
        
        const ideaElement = document.createElement("p");
        ideaElement.textContent = item.idea;
        
        const actionsElement = document.createElement("div");
        actionsElement.classList.add("feed-item-actions");
        
        const likeButton = document.createElement("button");
        likeButton.classList.add("like-button");
        likeButton.innerHTML = `💡 <span>${item.likes}</span>`;
        likeButton.addEventListener("click", () => {
            item.likes++;
            likeButton.querySelector("span").textContent = item.likes;
            playSound(clickSound);
        });
        
        const investButton = document.createElement("button");
        investButton.classList.add("invest-button");
        investButton.textContent = "Invest";
        investButton.addEventListener("click", () => {
            showInvestmentModal(item);
        });
        
        actionsElement.appendChild(likeButton);
        actionsElement.appendChild(investButton);
        
        feedItemElement.appendChild(founderElement);
        
        if (item.hasLogo) {
            const logoElement = document.createElement("div");
            logoElement.classList.add("feed-item-logo");
            
            // Create image element for logo
            const logoImg = document.createElement('img');
            logoImg.src = logos[item.logoIndex];
            logoImg.alt = 'Startup Logo';
            logoImg.classList.add('feed-logo-image');
            logoElement.appendChild(logoImg);
            
            feedItemElement.appendChild(logoElement);
        }
        
        feedItemElement.appendChild(ideaElement);
        feedItemElement.appendChild(actionsElement);
        
        communityFeed.appendChild(feedItemElement);
    });
}

function initializeFeed() {
    // Generate some initial feed items
    for (let i = 0; i < 5; i++) {
        const hasLogo = Math.random() > 0.5;
        
        feedItems.push({
            idea: getRandomItem(startupIdeas),
            hasLogo: hasLogo,
            logoIndex: hasLogo ? Math.floor(Math.random() * logos.length) : -1,
            likes: Math.floor(Math.random() * 20),
            founder: getRandomFounderName()
        });
    }
    
    // Update UI
    updateFeed();
}

// Function to generate a random feed idea
function generateRandomFeedIdea() {
    // Create a new random idea
    const hasLogo = Math.random() > 0.3; // 70% chance to have a logo
    
    const newIdea = {
        idea: getRandomItem(startupIdeas),
        hasLogo: hasLogo,
        logoIndex: hasLogo ? Math.floor(Math.random() * logos.length) : -1,
        likes: Math.floor(Math.random() * 5), // Start with fewer likes
        founder: getRandomFounderName()
    };
    
    // Add to the beginning of the feed
    feedItems.unshift(newIdea);
    
    // Keep only the latest 20 ideas
    if (feedItems.length > 20) {
        feedItems = feedItems.slice(0, 20);
    }
    
    // Update the UI
    updateFeed();
    
    // Play a subtle notification sound
    playSound(clickSound);
    
    // Add a highlight effect to the new idea
    setTimeout(() => {
        const firstItem = document.querySelector('.feed-item');
        if (firstItem) {
            firstItem.classList.add('new-idea');
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                firstItem.classList.remove('new-idea');
            }, 3000);
        }
    }, 100);
}

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Helper function to update currency display
function updateCurrencyDisplay() {
    currencyDisplay.textContent = gameState.currency;
}

// Helper function to update stats display
function updateStatsDisplay() {
    pitchCountDisplay.textContent = gameState.pitchCount;
    
    // Calculate success rate
    const successRate = gameState.pitchCount > 0 
        ? Math.round((gameState.successCount / gameState.pitchCount) * 100) 
        : 0;
    
    successRateDisplay.textContent = `${successRate}%`;
}

// Add cursor effect on page load
document.addEventListener("DOMContentLoaded", () => {
    addCursorEffect();
    updateCurrencyDisplay();
    updateStatsDisplay();
});
