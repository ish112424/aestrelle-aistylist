/* ============================
   DATA & CONFIG
   ============================ */
const wardrobeByEvent = {
  casual: {
    tops: {
      womenswear: ["plain cotton t-shirt", "simple kurti", "basic crop top"],
      menswear: ["plain t-shirt", "simple cotton shirt", "polo t-shirt"],
    },
    bottoms: {
      womenswear: ["regular jeans", "cotton leggings", "simple skirt"],
      menswear: ["regular jeans", "cotton track pants", "simple chinos"],
    },
    outerwear: ["light jacket", "simple cardigan", "denim jacket"],
    footwear: ["white sneakers", "simple slippers", "flat sandals"]
  },
  formal: {
    tops: {
      womenswear: ["plain formal shirt", "simple salwar kurta", "neat blouse"],
      menswear: ["white formal shirt", "plain button-up shirt", "simple striped shirt"],
    },
    bottoms: {
      womenswear: ["straight fit trousers", "plain salwar", "simple churidar"],
      menswear: ["black formal trousers", "plain dark trousers", "simple dress pants"],
    },
    outerwear: ["plain blazer", "simple suit jacket", "neat formal jacket"],
    footwear: ["black formal shoes", "simple heels", "plain loafers"]
  },
  party: {
    tops: {
      womenswear: ["sparkly top", "simple party blouse", "embroidered kurti"],
      menswear: ["neat printed shirt", "simple dark shirt", "plain party shirt"],
    },
    bottoms: {
      womenswear: ["fitted jeans", "simple flared skirt", "straight pants"],
      menswear: ["dark jeans", "simple dark trousers", "slim fit pants"],
    },
    outerwear: ["simple blazer", "neat jacket", "plain shrug"],
    footwear: ["heels", "neat sneakers", "simple boots"]
  },
  sports: {
    tops: {
      womenswear: ["sports t-shirt", "simple sports top", "cotton gym tee"],
      menswear: ["dry-fit t-shirt", "simple sports tee", "cotton round-neck tee"],
    },
    bottoms: {
      womenswear: ["gym leggings", "sports shorts", "track pants"],
      menswear: ["track pants", "sports shorts", "gym joggers"],
    },
    outerwear: ["simple zip jacket", "light hoodie", "sports windcheater"],
    footwear: ["running shoes", "sports shoes", "sneakers"]
  },
  travel: {
    tops: {
      womenswear: ["comfortable cotton t-shirt", "simple kurti", "loose full-sleeve top"],
      menswear: ["cotton t-shirt", "simple shirt", "comfortable polo"],
    },
    bottoms: {
      womenswear: ["comfortable leggings", "loose cotton pants", "stretchy jeans"],
      menswear: ["comfortable jeans", "cotton track pants", "easy cargo pants"],
    },
    outerwear: ["simple jacket", "light hoodie", "easy cardigan"],
    footwear: ["comfortable sneakers", "walking shoes", "slip-on sandals"]
  },
  "date-night": {
    tops: {
      womenswear: ["nice printed top", "simple party blouse", "neat embroidered kurti"],
      menswear: ["neat collar shirt", "simple printed shirt", "plain dark shirt"],
    },
    bottoms: {
      womenswear: ["slim fit jeans", "simple flared pants", "neat trousers"],
      menswear: ["dark slim jeans", "neat chinos", "simple trousers"],
    },
    outerwear: ["light blazer", "neat jacket", "simple shrug"],
    footwear: ["heels", "neat loafers", "simple boots"]
  }
};

const galleryItems = [
  {
    title: "City Coffee Casual",
    category: "casual",
    weather: "mild-winter",
    description: "A soft tee, relaxed trousers, and white sneakers for an effortless daytime look.",
    image: "images/casual_outfit.png",
    tags: ["casual", "trending"]
  },
  {
    title: "Evening Formal Edit",
    category: "formal",
    weather: "cold",
    description: "Structured tailoring, rich layers, and polished footwear for formal settings.",
    image: "images/formal_outfit.png",
    tags: ["formal"]
  },
  {
    title: "After-Hours Party Look",
    category: "party",
    weather: "humid",
    description: "Light-catching fabrics and sleek lines that stay sharp in warm nightlife weather.",
    image: "images/party_outfit.png",
    tags: ["party", "trending"]
  },
  {
    title: "Sport Utility Fit",
    category: "sports",
    weather: "extreme-heat",
    description: "Performance separates with breathable layers and dependable trainers.",
    image: "images/sports_outfit.png",
    tags: ["sports"]
  },
  {
    title: "Travel Day Layers",
    category: "travel",
    weather: "mild-winter",
    description: "Stretch pieces, an easy jacket, and slip-on footwear built for movement.",
    image: "images/travel_outfit.png",
    tags: ["travel", "trending"]
  },
  {
    title: "Monsoon Street Style",
    category: "casual",
    weather: "monsoon",
    description: "Water-resistant layers and dark denim for a rainy day in the city.",
    image: "images/monsoon_outfit.png",
    tags: ["casual", "trending"]
  }
];

/* ============================
   ELEMENTS
   ============================ */
const navbar = document.getElementById("navbar");
const form = document.getElementById("recommendation-form");
const recommendBtn = document.getElementById("recommend-btn");
const recommendBtnText = document.getElementById("recommend-btn-text");
const recommendBtnLoader = document.getElementById("recommend-btn-loader");
const resultCard = document.getElementById("result-card");
const resultTemplate = document.getElementById("result-template");
const memoryChip = document.getElementById("memory-chip");
const toastContainer = document.getElementById("toast-container");

const wardrobeToggle = document.getElementById("wardrobe-toggle");
const wardrobeBody = document.getElementById("wardrobe-body");
const wardrobeGrid = document.getElementById("wardrobe-grid");
const wardrobeForm = document.getElementById("wardrobe-form");
const wardrobeStatus = document.getElementById("wardrobe-status");
const wardrobeUpload = document.getElementById("wardrobe-upload");
const uploadLabelText = document.getElementById("upload-label-text");

const authBtn = document.getElementById("auth-btn");
const logoutBtn = document.getElementById("logout-btn");
const authModal = document.getElementById("auth-modal");
const authForm = document.getElementById("auth-form");
const authTitle = document.getElementById("auth-title");
const authSubmit = document.getElementById("auth-submit");
const authToggle = document.getElementById("auth-toggle");
const authError = document.getElementById("auth-error");
const userGreeting = document.getElementById("user-greeting");

const galleryGrid = document.getElementById("gallery-grid");
const galleryFilters = document.getElementById("gallery-filters");

const detectBtn = document.getElementById("detect-weather-btn");
const weatherSelect = document.getElementById("weather");
const weatherStatus = document.getElementById("weather-status");

/* ============================
   UTILITIES
   ============================ */
function titleize(str) {
  if (!str) return "";
  return str.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = "toastOut 300ms ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ============================
   UI EFFECTS
   ============================ */
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = "var(--shadow)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

wardrobeToggle?.addEventListener("click", () => {
  const isExpanded = wardrobeToggle.getAttribute("aria-expanded") === "true";
  wardrobeToggle.setAttribute("aria-expanded", !isExpanded);
  wardrobeBody.style.display = isExpanded ? "none" : "block";
});

wardrobeUpload?.addEventListener("change", (e) => {
  if (e.target.files[0]) {
    uploadLabelText.textContent = e.target.files[0].name;
  }
});

/* ============================
   WEATHER LOGIC
   ============================ */
detectBtn?.addEventListener("click", async () => {
  if (!navigator.geolocation) {
    showToast("Geolocation is not supported", "error");
    return;
  }

  detectBtn.disabled = true;
  weatherStatus.textContent = "Detecting location...";
  weatherStatus.style.display = "block";

  navigator.geolocation.getCurrentPosition(async (pos) => {
    try {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      weatherSelect.value = data.weatherCategory;
      weatherStatus.textContent = `📍 ${data.temperature}°C, ${data.description}`;
      showToast("Weather updated successfully!", "success");
    } catch (err) {
      showToast("Failed to fetch weather", "error");
      weatherStatus.textContent = "Detection failed.";
    } finally {
      detectBtn.disabled = false;
    }
  }, () => {
    showToast("Location access denied", "error");
    detectBtn.disabled = false;
    weatherStatus.textContent = "";
  });
});

/* ============================
   RECOMMENDATION LOGIC
   ============================ */
async function getRecommendation(prefs) {
  const token = localStorage.getItem("threadsense-token");
  try {
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(prefs)
    });
    
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (err) {
    showToast("AI logic failed, using local backup", "info");
    // Simple fallback returning 3 outfits
    const fallbackOutfits = [
      {
        title: `The ${titleize(prefs.eventType)} Standard`,
        top: `Simple ${prefs.colorPalette} cotton top`,
        bottom: `Comfortable everyday trousers`,
        shoes: `Clean white sneakers`,
        accessory: `Minimalist watch`,
        explanation: `Prioritizes both comfort and style while matching your chosen color palette.`
      },
      {
        title: `Elevated ${titleize(prefs.style)}`,
        top: `Structured ${prefs.colorPalette} blazer or overshirt`,
        bottom: `Dark wash tailored jeans`,
        shoes: `Leather loafers or sleek boots`,
        accessory: `Classic sunglasses`,
        explanation: `A slightly dressed-up version of your preferences for a sharper look.`
      },
      {
        title: `Relaxed ${titleize(prefs.eventType)} Vibe`,
        top: `Loose-fit soft t-shirt`,
        bottom: `Breathable straight-leg pants`,
        shoes: `Canvas slip-ons`,
        accessory: `Canvas tote bag`,
        explanation: `Maximum comfort while maintaining the ${prefs.style} aesthetic.`
      }
    ];
    return { outfits: fallbackOutfits, metadata: { event: prefs.eventType, weather: prefs.weather, style: prefs.style } };
  }
}

const coverImages = {
  casual: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
  formal: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=600&auto=format&fit=crop&q=80',
  party: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
  sports: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&auto=format&fit=crop&q=80',
  travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
  'date-night': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80'
};

function getColorHex(text) {
  const t = text.toLowerCase();
  if (t.includes('black') || t.includes('dark') || t.includes('charcoal') || t.includes('slate') || t.includes('obsidian') || t.includes('grey') || t.includes('gray')) {
    return '#2b2b2b'; // Obsidian Black / Charcoal
  }
  if (t.includes('white') || t.includes('cream') || t.includes('beige') || t.includes('off-white') || t.includes('ivory') || t.includes('sand') || t.includes('light grey')) {
    return '#f4f1ea'; // Warm Cream / Ivory
  }
  if (t.includes('blue') || t.includes('navy') || t.includes('denim') || t.includes('indigo') || t.includes('sky')) {
    return '#2c3e50'; // Deep Navy / Denim Blue
  }
  if (t.includes('green') || t.includes('olive') || t.includes('mint') || t.includes('emerald') || t.includes('khaki') || t.includes('sage')) {
    return '#4a5d4e'; // Sage / Olive Green
  }
  if (t.includes('brown') || t.includes('tan') || t.includes('earthy') || t.includes('chocolate') || t.includes('rust')) {
    return '#8c6239'; // Earthy Brown / Tan
  }
  if (t.includes('pink') || t.includes('pastel') || t.includes('blush') || t.includes('peach') || t.includes('lavender') || t.includes('rose')) {
    return '#e8c5c8'; // Pastel Blush / Lavender Rose
  }
  if (t.includes('red') || t.includes('bold') || t.includes('orange') || t.includes('maroon') || t.includes('burgundy') || t.includes('crimson')) {
    return '#962d2d'; // Bold Rust / Crimson Burgundy
  }
  if (t.includes('yellow') || t.includes('mustard') || t.includes('gold')) {
    return '#d4a373'; // Warm Mustard Gold
  }
  return '#c4b0a0'; // Soft Neutral Fallback
}

function renderRecommendation(data) {
  resultCard.innerHTML = "";
  const content = resultTemplate.content.cloneNode(true);
  
  // Hide static save button as tinder handles it dynamically
  const oldSaveBtn = content.querySelector("#save-outfit-btn");
  if (oldSaveBtn) oldSaveBtn.style.display = "none";
  
  // Set metadata tags
  content.querySelector("#result-event").textContent = titleize(data.metadata.event);
  content.querySelector("#result-weather").textContent = titleize(data.metadata.weather);
  content.querySelector("#result-style").textContent = titleize(data.metadata.style);
  
  const container = content.querySelector("#outfit-combinations-container");
  const comboTemplate = document.getElementById("outfit-combo-template");
 
  // Render stacked cards
  data.outfits.forEach((outfit, index) => {
    const comboNode = comboTemplate.content.cloneNode(true);
    const cardDiv = comboNode.querySelector(".outfit-combo-card");
    cardDiv.id = `outfit-card-${index}`;
    cardDiv.dataset.index = index;
 
    // Set beautiful magazine-style cover image based on occasion
    const coverImg = comboNode.querySelector(".combo-cover-img");
    const occasionKey = data.metadata.event || 'casual';
    coverImg.src = coverImages[occasionKey] || coverImages.casual;

    comboNode.querySelector(".combo-title").textContent = `Option ${index + 1}: ${outfit.title}`;
    comboNode.querySelector(".combo-top").textContent = outfit.top;
    comboNode.querySelector(".combo-bottom").textContent = outfit.bottom;
    comboNode.querySelector(".combo-shoes").textContent = outfit.shoes;
    comboNode.querySelector(".combo-accessory").textContent = outfit.accessory;
    comboNode.querySelector(".combo-explanation").textContent = outfit.explanation;

    // Apply color swatches with matching glowing shadow offsets
    const setSwatch = (swatchEl, itemText) => {
      if (!swatchEl) return;
      const hex = getColorHex(itemText);
      swatchEl.style.backgroundColor = hex;
      swatchEl.style.boxShadow = `0 3px 8px rgba(0, 0, 0, 0.12), 0 0 12px ${hex}55`;
      swatchEl.style.display = 'block';
    };

    setSwatch(comboNode.querySelector(".combo-top-swatch"), outfit.top);
    setSwatch(comboNode.querySelector(".combo-bottom-swatch"), outfit.bottom);
    setSwatch(comboNode.querySelector(".combo-shoes-swatch"), outfit.shoes);
    setSwatch(comboNode.querySelector(".combo-accessory-swatch"), outfit.accessory);
 
    // Setup Canvas Lookbook Download button event handler
    const downloadBtn = comboNode.querySelector(".download-lookbook-btn");
    if (downloadBtn) {
      downloadBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent card from swiping / dragging trigger
        downloadLookbookCard(outfit, data.metadata.event || 'casual', index + 1);
      };
    }
 
    container.appendChild(comboNode);
  });

  // DB Save API caller
  const saveOutfitAtIndex = async (index) => {
    const token = localStorage.getItem("threadsense-token");
    if (!token) {
      showToast("Login to save this outfit to your profile!", "info");
      return;
    }
    try {
      const currentOutfit = data.outfits[index];
      const res = await fetch('/api/save-outfit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...currentOutfit,
          event: data.metadata.event,
          weather: data.metadata.weather,
          style: data.metadata.style,
          outfit: `${currentOutfit.top} with ${currentOutfit.bottom} and ${currentOutfit.accessory}`,
          footwear: currentOutfit.shoes,
          description: currentOutfit.title
        }) 
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to save outfit");
      }
      showToast(`Saved "${currentOutfit.title}"! ❤️`, "success");
    } catch (err) {
      showToast(err.message || "Failed to save outfit", "error");
    }
  };

  const outfitCardsList = Array.from(container.querySelectorAll('.outfit-combo-card'));
  
  const updateStackPositions = () => {
    let activeIndex = 0;
    outfitCardsList.forEach((card) => {
      if (card.style.display === 'none' || card.classList.contains('swiped')) return;
      
      if (activeIndex === 0) {
        card.style.transform = 'scale(1) translateY(0) rotate(0deg)';
        card.style.zIndex = '3';
        card.style.opacity = '1';
        card.style.filter = 'blur(0px)';
        card.style.pointerEvents = 'auto';
      } else if (activeIndex === 1) {
        card.style.transform = 'scale(0.95) translateY(16px) rotate(-1deg)';
        card.style.zIndex = '2';
        card.style.opacity = '0.85';
        card.style.filter = 'blur(0.5px)';
        card.style.pointerEvents = 'none';
      } else if (activeIndex === 2) {
        card.style.transform = 'scale(0.9) translateY(32px) rotate(1deg)';
        card.style.zIndex = '1';
        card.style.opacity = '0.6';
        card.style.filter = 'blur(1px)';
        card.style.pointerEvents = 'none';
      } else {
        card.style.transform = 'scale(0.85) translateY(48px) rotate(0deg)';
        card.style.zIndex = '0';
        card.style.opacity = '0';
        card.style.filter = 'blur(2px)';
        card.style.pointerEvents = 'none';
      }
      activeIndex++;
    });

    if (activeIndex === 0) {
      const controls = resultCard.querySelector(".tinder-controls");
      if (controls) controls.style.display = "none";

      const emptyState = document.createElement("div");
      emptyState.className = "tinder-empty-state";
      emptyState.innerHTML = `
        <div class="empty-sparkles">✨</div>
        <h3>No More Looks!</h3>
        <p>You swiped through all styled options. Would you like to review them again or build a new one?</p>
        <button class="btn-outline reset-tinder-btn" style="margin-top: 10px;">🔄 Review Options Again</button>
      `;
      container.appendChild(emptyState);

      emptyState.querySelector(".reset-tinder-btn").onclick = () => {
        emptyState.remove();
        outfitCardsList.forEach((c) => {
          c.style.display = 'block';
          c.classList.remove('swiped');
          c.style.opacity = '1';
          c.style.transform = '';
        });
        updateStackPositions();
        if (controls) controls.style.display = "flex";
      };
    }
  };

  const swipers = outfitCardsList.map((card, index) => {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;

    const dragStart = (e) => {
      if (e.type === 'mousedown' && e.button !== 0) return;
      isDragging = true;
      card.style.transition = 'none';
      const touch = e.type === 'touchstart' ? e.touches[0] : e;
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const dragMove = (e) => {
      if (!isDragging) return;
      const touch = e.type === 'touchmove' ? e.touches[0] : e;
      currentX = touch.clientX - startX;
      currentY = touch.clientY - startY;

      const rotation = currentX / 15;
      card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;
    };

    const dragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2), opacity 0.4s ease';

      const threshold = 120;
      if (currentX > threshold) {
        swipe('right');
      } else if (currentX < -threshold) {
        swipe('left');
      } else {
        card.style.transform = 'scale(1) translateY(0) rotate(0deg)';
        currentX = 0;
        currentY = 0;
      }
    };

    const swipe = (direction) => {
      const flyX = direction === 'right' ? window.innerWidth + 200 : -window.innerWidth - 200;
      const rotate = direction === 'right' ? 35 : -35;
      card.style.transform = `translate(${flyX}px, ${currentY}px) rotate(${rotate}deg)`;
      card.style.opacity = '0';
      card.classList.add('swiped');
      
      setTimeout(() => {
        card.style.display = 'none';
        if (direction === 'right') {
          saveOutfitAtIndex(index);
        }
        updateStackPositions();
      }, 300);
    };

    card.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);

    card.addEventListener('touchstart', dragStart, { passive: true });
    document.addEventListener('touchmove', dragMove, { passive: true });
    document.addEventListener('touchend', dragEnd);

    return {
      swipeLeft: () => {
        currentX = -200;
        swipe('left');
      },
      swipeRight: () => {
        currentX = 200;
        swipe('right');
      }
    };
  });

  if (data.outfits.length > 0) {
    const controlsRow = document.createElement("div");
    controlsRow.className = "tinder-controls";

    const passBtn = document.createElement("button");
    passBtn.className = "tinder-btn pass-btn";
    passBtn.innerHTML = "✖";
    passBtn.title = "Pass option";
    passBtn.onclick = () => {
      const topIndex = outfitCardsList.findIndex(c => c.style.display !== 'none' && !c.classList.contains('swiped'));
      if (topIndex !== -1) {
        swipers[topIndex].swipeLeft();
      }
    };

    const likeBtn = document.createElement("button");
    likeBtn.className = "tinder-btn like-btn";
    likeBtn.innerHTML = "❤️";
    likeBtn.title = "Save and Like option";
    likeBtn.onclick = () => {
      const topIndex = outfitCardsList.findIndex(c => c.style.display !== 'none' && !c.classList.contains('swiped'));
      if (topIndex !== -1) {
        swipers[topIndex].swipeRight();
      }
    };

    controlsRow.appendChild(passBtn);
    controlsRow.appendChild(likeBtn);
    content.appendChild(controlsRow);
  }

  resultCard.appendChild(content);
  updateStackPositions();
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  recommendBtn.disabled = true;
  recommendBtnText.style.display = "none";
  recommendBtnLoader.style.display = "block";

  const data = new FormData(form);
  const prefs = Object.fromEntries(data.entries());
  
  // Integrate Style DNA preference profiles
  const storedDna = localStorage.getItem("aestrelle-style-dna");
  if (storedDna) {
    try {
      prefs.styleDNA = JSON.parse(storedDna);
    } catch (err) {}
  }
  
  const rec = await getRecommendation(prefs);
  renderRecommendation(rec);
  
  memoryChip.textContent = `Recent memory: ${titleize(prefs.eventType)}, ${titleize(prefs.weather)} weather.`;
  
  recommendBtn.disabled = false;
  recommendBtnText.style.display = "block";
  recommendBtnLoader.style.display = "none";
  
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

/* ============================
   AUTH LOGIC
   ============================ */
let isLogin = true;

function updateAuthUI() {
  const token = localStorage.getItem("threadsense-token");
  const name = localStorage.getItem("threadsense-username");

  if (token) {
    authBtn.style.display = "none";
    logoutBtn.style.display = "block";
    userGreeting.textContent = `Hi, ${name}`;
    document.getElementById("wardrobe-panel").style.display = "block";
    loadWardrobe();
  } else {
    authBtn.style.display = "block";
    logoutBtn.style.display = "none";
    userGreeting.textContent = "";
    document.getElementById("wardrobe-panel").style.display = "none";
  }
}

authBtn?.addEventListener("click", () => authModal.classList.add("open"));
document.getElementById("auth-close")?.addEventListener("click", () => authModal.classList.remove("open"));

authToggle?.addEventListener("click", () => {
  isLogin = !isLogin;
  authTitle.textContent = isLogin ? "Login" : "Register";
  authSubmit.textContent = isLogin ? "Login" : "Create Account";
  authToggle.textContent = isLogin ? "Need an account? Register" : "Already have an account? Login";
});

authForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  authError.textContent = "";
  const username = document.getElementById("auth-username").value;
  const password = document.getElementById("auth-password").value;
  
  try {
    const res = await fetch(isLogin ? '/api/login' : '/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    
    localStorage.setItem("threadsense-token", data.token);
    localStorage.setItem("threadsense-username", data.username);
    authModal.classList.remove("open");
    authForm.reset();
    updateAuthUI();
    showToast(isLogin ? `Welcome back, ${data.username}!` : "Account created successfully!", "success");
  } catch (err) {
    authError.textContent = err.message;
  }
});

logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("threadsense-token");
  localStorage.removeItem("threadsense-username");
  updateAuthUI();
  showToast("Logged out successfully");
});

/* ============================
   WARDROBE LOGIC
   ============================ */
async function loadWardrobe() {
  const token = localStorage.getItem("threadsense-token");
  if (!token) return;
  try {
    const res = await fetch('/api/wardrobe', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const items = await res.json();
    wardrobeGrid.innerHTML = items.map(item => `
      <div class="wardrobe-item">
        <img src="${item.image_path}" alt="${item.label}">
        <div class="wardrobe-item-label">${item.label}</div>
      </div>
    `).join('');
  } catch (err) {}
}

wardrobeForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = wardrobeUpload.files[0];
  if (!file) return;

  const btn = document.getElementById("wardrobe-submit");
  btn.disabled = true;
  wardrobeStatus.textContent = "⌛ AI analyzing your clothing...";

  try {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    await new Promise(r => img.onload = r);
    
    const model = await mobilenet.load();
    const predictions = await model.classify(img);
    const label = predictions[0].className.split(',')[0];

    const formData = new FormData();
    formData.append("image", file);
    formData.append("label", label);

    const res = await fetch('/api/wardrobe', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('threadsense-token')}` },
      body: formData
    });
    if (!res.ok) throw new Error();
    
    showToast(`Added ${label} to your wardrobe!`, "success");
    wardrobeForm.reset();
    uploadLabelText.textContent = "Choose a clothing photo";
    loadWardrobe();
  } catch (err) {
    showToast("Upload failed", "error");
  } finally {
    btn.disabled = false;
    wardrobeStatus.textContent = "";
  }
});

/* ============================
   GALLERY LOGIC
   ============================ */
function renderGallery(filter = "all") {
  galleryGrid.innerHTML = "";
  const items = filter === "all" ? galleryItems : galleryItems.filter(i => i.tags.includes(filter) || i.category === filter);
  
  items.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.style.animationDelay = `${i * 50}ms`;
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="gallery-card-content">
        <div class="gallery-meta">
          ${item.tags.map(t => `<span class="tag">${titleize(t)}</span>`).join('')}
        </div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;
    galleryGrid.appendChild(card);
  });
}

galleryFilters?.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-button")) {
    galleryFilters.querySelectorAll(".filter-button").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    renderGallery(e.target.dataset.filter);
  }
});

/* ============================
   INIT
   ============================ */
updateAuthUI();
renderGallery();
if (!localStorage.getItem("threadsense-profile")) {
  memoryChip.textContent = "Start by building an outfit to save your preferences.";
}

window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  if (splash) {
    // Hold briefly, then trigger the cinematic zoom-out
    setTimeout(() => {
      splash.classList.add("netflix-zoom");
      setTimeout(() => splash.remove(), 900); // Wait for the zoom animation to finish
    }, 1500);
  }
});

/* ============================
   STYLE DNA LOGIC (FEATURE 5)
   ============================ */
const dnaBadgeBtn = document.getElementById("dna-badge-btn");
const dnaModal = document.getElementById("style-dna-modal");
const dnaCloseBtn = document.getElementById("dna-close-btn");
const dnaPrevBtn = document.getElementById("dna-prev-btn");
const dnaNextBtn = document.getElementById("dna-next-btn");
const progressBar = document.getElementById("dna-progress-bar");

let currentDnaStep = 1;
const styleDnaProfile = {
  fit: '',
  colors: '',
  aesthetic: ''
};

function updateDnaBadgeUI() {
  const storedDna = localStorage.getItem("aestrelle-style-dna");
  if (storedDna && dnaBadgeBtn) {
    dnaBadgeBtn.classList.add("active-dna");
    document.getElementById("dna-badge-text").textContent = "Style DNA: Active";
  } else if (dnaBadgeBtn) {
    dnaBadgeBtn.classList.remove("active-dna");
    document.getElementById("dna-badge-text").textContent = "Build Style DNA";
  }
}

// Card Selection Logic
document.querySelectorAll(".dna-card").forEach(card => {
  card.addEventListener("click", () => {
    const step = parseInt(card.dataset.step);
    const val = card.dataset.val;

    // Deselect other cards in this step
    document.querySelectorAll(`.dna-card[data-step="${step}"]`).forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");

    // Save selection
    if (step === 1) styleDnaProfile.fit = val;
    else if (step === 2) styleDnaProfile.colors = val;
    else if (step === 3) styleDnaProfile.aesthetic = val;
  });
});

function showDnaStep(step) {
  document.querySelectorAll(".dna-quiz-step").forEach(s => s.style.display = "none");
  const stepEl = document.querySelector(`.dna-quiz-step[data-step="${step}"]`);
  if (stepEl) stepEl.style.display = "block";

  // Update controls
  dnaPrevBtn.style.visibility = step === 1 ? "hidden" : "visible";
  dnaNextBtn.textContent = step === 3 ? "Complete Profile" : "Next Step &rarr;";
  
  // Progress bar width (33%, 66%, 100%)
  const percentage = (step / 3) * 100;
  progressBar.style.width = `${percentage}%`;
}

// Modal open/close
dnaBadgeBtn?.addEventListener("click", () => {
  currentDnaStep = 1;
  const storedDna = localStorage.getItem("aestrelle-style-dna");
  if (storedDna) {
    try {
      const parsed = JSON.parse(storedDna);
      Object.assign(styleDnaProfile, parsed);
      
      // Highlight existing cards
      document.querySelectorAll(".dna-card").forEach(c => c.classList.remove("selected"));
      if (parsed.fit) document.querySelector(`.dna-card[data-step="1"][data-val="${parsed.fit}"]`)?.classList.add("selected");
      if (parsed.colors) document.querySelector(`.dna-card[data-step="2"][data-val="${parsed.colors}"]`)?.classList.add("selected");
      if (parsed.aesthetic) document.querySelector(`.dna-card[data-step="3"][data-val="${parsed.aesthetic}"]`)?.classList.add("selected");
    } catch(e) {}
  }
  showDnaStep(1);
  dnaModal.classList.add("open");
});

dnaCloseBtn?.addEventListener("click", () => dnaModal.classList.remove("open"));

dnaPrevBtn?.addEventListener("click", () => {
  if (currentDnaStep > 1) {
    currentDnaStep--;
    showDnaStep(currentDnaStep);
  }
});

dnaNextBtn?.addEventListener("click", () => {
  // Validate selection for current step
  let selection = '';
  if (currentDnaStep === 1) selection = styleDnaProfile.fit;
  else if (currentDnaStep === 2) selection = styleDnaProfile.colors;
  else if (currentDnaStep === 3) selection = styleDnaProfile.aesthetic;

  if (!selection) {
    showToast("Please choose one option to continue!", "error");
    return;
  }

  if (currentDnaStep < 3) {
    currentDnaStep++;
    showDnaStep(currentDnaStep);
  } else {
    // Save to local storage
    localStorage.setItem("aestrelle-style-dna", JSON.stringify(styleDnaProfile));
    dnaModal.classList.remove("open");
    updateDnaBadgeUI();
    showToast("Style DNA saved! AI will now personalize your suggestions. 🧬", "success");
  }
});

/* ============================
   CANVAS LOOKBOOK EXPORTER (FEATURE 4)
   ============================ */
function downloadLookbookCard(outfit, occasion, optionNumber) {
  showToast("⌛ Generating your sharing card...", "info");

  // Create canvas element
  const canvas = document.createElement("canvas");
  canvas.width = 480;
  canvas.height = 680;
  const ctx = canvas.getContext("2d");

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 680);
  grad.addColorStop(0, '#fdf9f6'); // var(--bg)
  grad.addColorStop(1, '#f7e7e8'); // soft warm pink tint
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 480, 680);

  // Border frame
  ctx.strokeStyle = 'rgba(196, 126, 154, 0.2)'; // var(--primary-light)
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, 480 - 12, 680 - 12);

  // Top header logo text
  ctx.fillStyle = '#1c1410'; // var(--text)
  ctx.font = "italic 400 24px 'DM Serif Display', serif";
  ctx.textAlign = 'center';
  ctx.fillText('aestrelle', 240, 50);

  ctx.fillStyle = '#c47e9a'; // var(--primary)
  ctx.font = "800 9px 'Manrope', sans-serif";
  ctx.fillText('AI PERSONAL OUTFIT CURATION', 240, 70);

  // Divider
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, 85);
  ctx.lineTo(440, 85);
  ctx.stroke();

  // Outfit Title / Option
  ctx.fillStyle = '#1c1410';
  ctx.font = "400 20px 'DM Serif Display', serif";
  ctx.fillText(`Option ${optionNumber}: ${outfit.title}`, 240, 115);

  ctx.fillStyle = '#8a7060'; // var(--text-muted)
  ctx.font = "800 9px 'Manrope', sans-serif";
  ctx.fillText(occasion.toUpperCase() + ' LOOKBOOK', 240, 133);

  // Draw Outfit Piece details
  const drawPiece = (yPos, category, text, icon) => {
    // Draw rounded background block
    ctx.fillStyle = '#ffffff'; // card panel
    ctx.beginPath();
    ctx.roundRect(40, yPos, 400, 70, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.stroke();

    // Draw Emoji icon
    ctx.font = "24px 'Segoe UI Emoji', sans-serif";
    ctx.textAlign = 'left';
    ctx.fillText(icon, 55, yPos + 44);

    // Draw Labels
    ctx.fillStyle = '#c47e9a'; // primary
    ctx.font = "800 9px 'Manrope', sans-serif";
    ctx.fillText(category.toUpperCase(), 100, yPos + 26);

    ctx.fillStyle = '#1c1410';
    ctx.font = "600 12px 'Manrope', sans-serif";
    
    // Text truncating for clean lookbook look
    let displayTxt = text;
    if (displayTxt.length > 40) displayTxt = displayTxt.substring(0, 38) + '...';
    ctx.fillText(displayTxt, 100, yPos + 46);

    // Draw Swatch
    const swatchHex = getColorHex(text);
    ctx.fillStyle = swatchHex;
    ctx.beginPath();
    ctx.arc(410, yPos + 35, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Draw 4 items
  drawPiece(155, 'Top', outfit.top, '👕');
  drawPiece(240, 'Bottom', outfit.bottom, '👖');
  drawPiece(325, 'Shoes', outfit.shoes, '👟');
  drawPiece(410, 'Accessory', outfit.accessory, '⌚');

  // Draw Explanation
  ctx.fillStyle = '#faf5f0'; // warm board
  ctx.beginPath();
  ctx.roundRect(40, 500, 400, 100, 8);
  ctx.fill();
  
  ctx.fillStyle = '#c47e9a';
  ctx.font = "800 9px 'Manrope', sans-serif";
  ctx.fillText('WHY IT WORKS', 55, 524);

  ctx.fillStyle = '#8a7060';
  ctx.font = "500 11px 'Manrope', sans-serif";
  
  // Wrap explanation text cleanly
  const words = outfit.explanation.split(' ');
  let line = '';
  let y = 544;
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    if (metrics.width > 360 && n > 0) {
      ctx.fillText(line, 55, y);
      line = words[n] + ' ';
      y += 16;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 55, y);

  // Footer stamp
  ctx.fillStyle = 'rgba(196, 126, 154, 0.4)';
  ctx.font = "800 8px 'Manrope', sans-serif";
  ctx.textAlign = 'center';
  ctx.fillText('DESIGNED BY AESTRELLE AI STYLIST', 240, 635);

  // Trigger download
  setTimeout(() => {
    try {
      const link = document.createElement("a");
      link.download = `aestrelle_lookbook_${occasion}_${optionNumber}.png`;
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Lookbook card downloaded successfully! 📥", "success");
    } catch(err) {
      showToast("Download failed, please try again", "error");
    }
  }, 400);
}

// Initialise Style DNA UI
updateDnaBadgeUI();
