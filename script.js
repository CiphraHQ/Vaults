// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Smooth scroll to section with enhanced easing
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 80;
        
        // Enhanced smooth scrolling
        window.scrollTo({ 
            top: targetPosition, 
            behavior: 'smooth'
        });
    }
}

// Navigation scroll effects
const navbar = document.getElementById('navbar');

function updateNavbar() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger animation by adding a class
            entry.target.style.animationPlayState = 'running';
            
            // For staggered animations on child elements
            if (entry.target.classList.contains('features-grid')) {
                const cards = entry.target.querySelectorAll('.feature-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animationPlayState = 'running';
                    }, index * 100);
                });
            }
            
            if (entry.target.classList.contains('architecture-visual')) {
                const layers = entry.target.querySelectorAll('.arch-layer');
                layers.forEach((layer, index) => {
                    setTimeout(() => {
                        layer.style.animationPlayState = 'running';
                    }, index * 150);
                });
            }
            
            // Unobserve after animation triggers
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .features-grid, .architecture-visual');
    animatedElements.forEach(el => {
        // Pause animations initially
        el.style.animationPlayState = 'paused';
        animationObserver.observe(el);
    });
}

window.addEventListener('scroll', updateNavbar, { passive: true });

// Updates form handling with enhanced animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    const updatesForm = document.getElementById('updatesForm');
    if (updatesForm) {
        updatesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            // Enhanced success animation
            button.style.transform = 'scale(0.95)';
            button.style.transition = 'all 0.1s ease';
            
            setTimeout(() => {
                button.textContent = 'Added to Waitlist ✓';
                button.style.background = 'var(--primary-accent)';
                button.style.transform = 'scale(1.05)';
                button.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 100);
            
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                button.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                button.textContent = originalText;
                button.style.background = '';
                this.querySelector('input').value = '';
            }, 3000);
        });
    }
});

// Initialize demo with enhanced animations
function initVaultsDemo() {
    const demoContainer = document.getElementById('vaults-demo-container');
    if (!demoContainer) return;

    let activeTab = 'chat';
    let messages = [
        {
            id: 1,
            type: 'system',
            content: "Welcome to the Vaults demo! This simulates local AI processing. Try asking me about privacy features or document analysis.",
            timestamp: new Date().toLocaleTimeString(),
        }
    ];
    let typing = false;

    const tabs = [
        { id: 'chat', label: 'AI Assistant' },
        { id: 'docs', label: 'Documents' },
        { id: 'voice', label: 'Voice Notes' },
        { id: 'analysis', label: 'Insights' },
    ];

    const docs = [
        { id: 1, name: 'Sample_Contract.pdf', size: '2.4 MB', encrypted: true, analyzed: true, date: '2 hours ago' },
        { id: 2, name: 'Client_Notes.txt', size: '156 KB', encrypted: true, analyzed: false, date: 'Yesterday' }
    ];

    const recordings = [
        { id: 1, name: 'Client Call - Demo', duration: '23:45', status: 'completed' },
        { id: 2, name: 'Team Meeting Notes', duration: '45:12', status: 'completed' }
    ];

    function renderDemo() {
        demoContainer.innerHTML = `
            <div style="height: 100%; display: flex; background: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; opacity: 0; animation: fadeIn 0.5s ease forwards;">
                <!-- Sidebar -->
                <div style="width: 220px; background: white; border-right: 1px solid #e5e7eb; padding: 12px; display: flex; flex-direction: column;">
                    <div style="margin-bottom: 16px;">
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                            <div style="display: flex; gap: 1px;">
                                ${[12, 16, 20, 18, 22, 17, 19, 15].map(height => 
                                    `<div style="width: 2px; height: ${height}px; background: linear-gradient(to top, #059669, #10b981); border-radius: 1px;"></div>`
                                ).join('')}
                            </div>
                            <h1 style="font-size: 16px; font-weight: 900; margin: 0; font-family: 'Orbitron', monospace; letter-spacing: 1px;">VAULTS</h1>
                        </div>
                        <div style="font-size: 10px; color: #059669; font-weight: 600;">Demo Preview</div>
                        <div style="font-size: 10px; color: #6b7280;">Simulated Local Processing</div>
                    </div>
                    
                    ${tabs.map(t => `
                        <button 
                            onclick="switchTab('${t.id}')" 
                            style="width: 100%; text-align: left; padding: 8px 12px; margin-bottom: 2px; border: none; border-radius: 6px; background: ${activeTab === t.id ? '#dcfce7' : 'transparent'}; color: ${activeTab === t.id ? '#166534' : '#374151'}; font-weight: ${activeTab === t.id ? '600' : '400'}; cursor: pointer; font-size: 13px; transition: all 0.2s ease;"
                        >
                            ${t.label}
                        </button>
                    `).join('')}
                    
                    <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
                        <div style="font-size: 10px; color: #6b7280; display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
                            <div style="width: 4px; height: 4px; background: #10b981; border-radius: 50%;"></div>
                            Demo Mode Active
                        </div>
                        <div style="font-size: 10px; color: #6b7280;">
                            Simulated Local Processing
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div style="flex: 1; display: flex; flex-direction: column;">
                    ${renderTabContent()}
                </div>
            </div>
        `;
    }

    function renderTabContent() {
        if (activeTab === 'chat') {
            return `
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 16px; border-bottom: 1px solid #e5e7eb; background: white;">
                        <h2 style="font-size: 18px; font-weight: 700; margin: 0; margin-bottom: 2px;">AI Assistant</h2>
                        <p style="margin: 0; font-size: 12px; color: #6b7280;">Demo: Simulated local AI processing</p>
                    </div>
                    
                    <div style="flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; background: #f9fafb;">
                        ${messages.map(m => `
                            <div style="display: flex; justify-content: ${m.type === 'user' ? 'flex-end' : 'flex-start'}; animation: slideIn 0.3s ease;">
                                <div style="max-width: 320px; padding: 8px 12px; border-radius: 12px; background: ${
                                    m.type === 'user' ? '#059669' : m.type === 'system' ? '#dbeafe' : 'white'
                                }; color: ${
                                    m.type === 'user' ? 'white' : m.type === 'system' ? '#1e40af' : '#111827'
                                }; border: ${m.type === 'system' || m.type === 'ai' ? '1px solid #e5e7eb' : 'none'}; transition: transform 0.2s ease;">
                                    <div style="font-size: 13px; line-height: 1.4;">${m.content}</div>
                                    <div style="font-size: 10px; margin-top: 4px; opacity: 0.7;">
                                        ${m.timestamp}${m.type === 'ai' ? ' • Local AI' : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                        ${typing ? `
                            <div style="display: flex; justify-content: flex-start;">
                                <div style="background: white; border: 1px solid #e5e7eb; padding: 8px 12px; border-radius: 12px;">
                                    <div style="display: flex; align-items: center; gap: 6px;">
                                        <div style="display: flex; gap: 2px;">
                                            <div style="width: 4px; height: 4px; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite;"></div>
                                            <div style="width: 4px; height: 4px; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite 0.2s;"></div>
                                            <div style="width: 4px; height: 4px; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite 0.4s;"></div>
                                        </div>
                                        <span style="font-size: 12px; color: #6b7280;">Processing locally...</span>
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div style="padding: 12px; border-top: 1px solid #e5e7eb; background: white; display: flex; gap: 8px;">
                        <input 
                            id="demo-input"
                            style="flex: 1; border: 1px solid #d1d5db; border-radius: 6px; padding: 8px 12px; font-size: 13px; outline: none; transition: all 0.2s ease;"
                            placeholder="Ask me anything... (processed locally)"
                            onkeydown="if(event.key==='Enter') sendDemoMessage()"
                        />
                        <button 
                            onclick="sendDemoMessage()"
                            style="background: #059669; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; transition: all 0.2s ease;"
                        >
                            Send
                        </button>
                    </div>
                </div>
            `;
        } else if (activeTab === 'docs') {
            return `
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 16px; border-bottom: 1px solid #e5e7eb; background: white; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h2 style="font-size: 18px; font-weight: 700; margin: 0; margin-bottom: 2px;">Documents</h2>
                            <p style="margin: 0; font-size: 12px; color: #6b7280;">Encrypted document vault</p>
                        </div>
                        <button style="background: #059669; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; transition: all 0.2s ease;">
                            Upload
                        </button>
                    </div>
                    
                    <div style="flex: 1; overflow-y: auto; padding: 16px; background: #f9fafb;">
                        ${docs.map((doc, index) => `
                            <div style="display: flex; justify-content: space-between; align-items: center; background: white; border: 1px solid #e5e7eb; padding: 12px; border-radius: 8px; margin-bottom: 8px; transition: all 0.2s ease; animation: slideIn 0.3s ease ${index * 0.1}s both;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="background: #dcfce7; padding: 6px; border-radius: 6px; font-size: 12px; font-weight: 600;">DOC</div>
                                    <div>
                                        <div style="font-weight: 600; font-size: 13px;">${doc.name}</div>
                                        <div style="font-size: 11px; color: #6b7280;">${doc.size} • ${doc.date}</div>
                                        <div style="display: flex; gap: 8px; margin-top: 4px;">
                                            <span style="font-size: 10px; background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px;">Encrypted</span>
                                            ${doc.analyzed ? '<span style="font-size: 10px; background: #dbeafe; color: #1e40af; padding: 2px 6px; border-radius: 4px;">Analyzed</span>' : ''}
                                        </div>
                                    </div>
                                </div>
                                <button style="background: #f3f4f6; border: 1px solid #d1d5db; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; transition: all 0.2s ease;">
                                    Open
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (activeTab === 'voice') {
            return `
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 16px; border-bottom: 1px solid #e5e7eb; background: white;">
                        <h2 style="font-size: 18px; font-weight: 700; margin: 0; margin-bottom: 2px;">Voice Notes</h2>
                        <p style="margin: 0; font-size: 12px; color: #6b7280;">Record and transcribe locally</p>
                    </div>
                    
                    <div style="flex: 1; padding: 16px; background: #f9fafb; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; animation: slideIn 0.3s ease;">
                            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">New Recording</h3>
                            <div style="text-center; padding: 24px 0;">
                                <button style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid #d1d5db; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; margin: 0 auto; transition: all 0.2s ease;">
                                    🎙️
                                </button>
                                <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Tap to start recording</p>
                            </div>
                            <div style="background: #dcfce7; border: 1px solid #16a34a; border-radius: 6px; padding: 8px; font-size: 11px; color: #166534;">
                                Local Whisper AI transcription
                            </div>
                        </div>
                        
                        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; animation: slideIn 0.3s ease 0.1s both;">
                            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Recent Recordings</h3>
                            ${recordings.map((r, index) => `
                                <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px; margin-bottom: 6px; animation: slideIn 0.3s ease ${(index + 2) * 0.1}s both;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <div style="font-size: 12px; font-weight: 500;">${r.name}</div>
                                            <div style="font-size: 10px; color: #6b7280;">Duration: ${r.duration}</div>
                                        </div>
                                        <button style="background: #059669; color: white; border: none; padding: 4px; border-radius: 4px; cursor: pointer; transition: all 0.2s ease;">▶️</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else if (activeTab === 'analysis') {
            return `
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 16px; border-bottom: 1px solid #e5e7eb; background: white;">
                        <h2 style="font-size: 18px; font-weight: 700; margin: 0; margin-bottom: 2px;">Document Insights</h2>
                        <p style="margin: 0; font-size: 12px; color: #6b7280;">AI-powered analysis (local processing)</p>
                    </div>
                    
                    <div style="flex: 1; padding: 16px; background: #f9fafb; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; animation: slideIn 0.3s ease;">
                            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Upload for Analysis</h3>
                            <div style="border: 2px dashed #d1d5db; border-radius: 8px; padding: 24px; text-center;">
                                <div style="font-size: 24px; margin-bottom: 8px;">📁</div>
                                <p style="font-size: 12px; color: #6b7280; margin: 0;">Drop files here</p>
                                <p style="font-size: 10px; color: #9ca3af; margin: 4px 0 0 0;">PDF, Word, Text files</p>
                                <div style="margin-top: 8px; font-size: 10px; color: #059669;">Analyzed locally</div>
                            </div>
                        </div>
                        
                        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; animation: slideIn 0.3s ease 0.1s both;">
                            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Analysis Options</h3>
                            ${[
                                { name: 'Smart Summary', icon: 'SUM' },
                                { name: 'Find Details', icon: 'FIND' },
                                { name: 'Review Tone', icon: 'TONE' },
                                { name: 'Legal Review', icon: 'LAW' },
                            ].map((opt, index) => `
                                <div style="display: flex; align-items: center; gap: 8px; border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px; margin-bottom: 6px; cursor: pointer; background: #f9fafb; transition: all 0.2s ease; animation: slideIn 0.3s ease ${(index + 2) * 0.1}s both;">
                                    <div style="background: #f3f4f6; padding: 4px; border-radius: 4px; font-size: 10px; font-weight: 600;">${opt.icon}</div>
                                    <span style="font-size: 12px; font-weight: 500;">${opt.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        return '';
    }

    async function sendMessage() {
        const input = document.getElementById('demo-input');
        if (!input || !input.value.trim()) return;
        
        const userContent = input.value;
        messages.push({
            id: Date.now(),
            type: 'user',
            content: userContent,
            timestamp: new Date().toLocaleTimeString()
        });
        
        input.value = '';
        typing = true;
        renderDemo();
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const responses = [
            "I've processed your request locally on this device. In the real Vaults app, I'd be running advanced language models without any internet connection.",
            "This demo simulates how I'll analyze your documents privately. Everything stays on your device - no cloud processing ever.",
            "I can help with legal document review, medical record analysis, or journalistic research - all processed locally for complete confidentiality.",
            "Your query shows how Vaults will work: ask questions, get AI insights, maintain absolute privacy. No data transmission, ever.",
            "This demonstrates local AI processing. The real product will use models running entirely on your hardware."
        ];
        
        messages.push({
            id: Date.now() + 1,
            type: 'ai',
            content: responses[Math.floor(Math.random() * responses.length)],
            timestamp: new Date().toLocaleTimeString()
        });
        
        typing = false;
        renderDemo();
    }

    function switchTab(tabId) {
        activeTab = tabId;
        renderDemo();
    }

    window.switchTab = switchTab;
    window.sendDemoMessage = sendMessage;

    renderDemo();
}

window.addEventListener('load', () => {
    updateNavbar();
    setTimeout(initVaultsDemo, 1000);
});// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 80;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
}

// Navigation scroll effects
const navbar = document.getElementById('navbar');

function updateNavbar() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNavbar, { passive: true });

// Updates form handling
document.addEventListener('DOMContentLoaded', function() {
    const updatesForm = document.getElementById('updatesForm');
    if (updatesForm) {
        updatesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Added to Waitlist ✓';
            button.style.background = 'var(--primary-accent)';
            button.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.style.transform = '';
                this.querySelector('input').value = '';
            }, 3000);
        });
    }
});

// Initialize demo
function initVaultsDemo() {
    const demoContainer = document.getElementById('vaults-demo-container');
    if (!demoContainer) return;

    let activeTab = 'chat';
    let messages = [
        {
            id: 1,
            type: 'system',
            content: "Welcome to the Vaults demo! This simulates local AI processing. Try asking me about privacy features or document analysis.",
            timestamp: new Date().toLocaleTimeString(),
        }
    ];
    let typing = false;

    const tabs = [
        { id: 'chat', label: 'AI Assistant' },
        { id: 'docs', label: 'Documents' },
        { id: 'voice', label: 'Voice Notes' },
        { id: 'analysis', label: 'Insights' },
    ];

    const docs = [
        { id: 1, name: 'Sample_Contract.pdf', size: '2.4 MB', encrypted: true, analyzed: true, date: '2 hours ago' },
        { id: 2, name: 'Client_Notes.txt', size: '156 KB', encrypted: true, analyzed: false, date: 'Yesterday' }
    ];

    const recordings = [
        { id: 1, name: 'Client Call - Demo', duration: '23:45', status: 'completed' },
        { id: 2, name: 'Team Meeting Notes', duration: '45:12', status: 'completed' }
    ];

    function renderDemo() {
        demoContainer.innerHTML = `
            <div style="height: 100%; display: flex; background: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px;">
                <!-- Sidebar -->
                <div style="width: 220px; background: white; border-right: 1px solid #e5e7eb; padding: 12px; display: flex; flex-direction: column;">
                    <div style="margin-bottom: 16px;">
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                            <div style="display: flex; gap: 1px;">
                                ${[12, 16, 20, 18, 22, 17, 19, 15].map(height => 
                                    `<div style="width: 2px; height: ${height}px; background: linear-gradient(to top, #059669, #10b981); border-radius: 1px;"></div>`
                                ).join('')}
                            </div>
                            <h1 style="font-size: 16px; font-weight: 900; margin: 0; font-family: 'Orbitron', monospace; letter-spacing: 1px;">VAULTS</h1>
                        </div>
                        <div style="font-size: 10px; color: #059669; font-weight: 600;">Demo Preview</div>
                        <div style="font-size: 10px; color: #6b7280;">Simulated Local Processing</div>
                    </div>
                    
                    ${tabs.map(t => `
                        <button 
                            onclick="switchTab('${t.id}')" 
                            style="width: 100%; text-align: left; padding: 8px 12px; margin-bottom: 2px; border: none; border-radius: 6px; background: ${activeTab === t.id ? '#dcfce7' : 'transparent'}; color: ${activeTab === t.id ? '#166534' : '#374151'}; font-weight: ${activeTab === t.id ? '600' : '400'}; cursor: pointer; font-size: 13px;"
                        >
                            ${t.label}
                        </button>
                    `).join('')}
                    
                    <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
                        <div style="font-size: 10px; color: #6b7280; display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
                            <div style="width: 4px; height: 4px; background: #10b981; border-radius: 50%;"></div>
                            Demo Mode Active
                        </div>
                        <div style="font-size: 10px; color: #6b7280;">
                            Simulated Local Processing
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div style="flex: 1; display: flex; flex-direction: column;">
                    ${renderTabContent()}
                </div>
            </div>
        `;
    }

    function renderTabContent() {
        if (activeTab === 'chat') {
            return `
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 16px; border-bottom: 1px solid #e5e7eb; background: white;">
                        <h2 style="font-size: 18px; font-weight: 700; margin: 0; margin-bottom: 2px;">AI Assistant</h2>
                        <p style="margin: 0; font-size: 12px; color: #6b7280;">Demo: Simulated local AI processing</p>
                    </div>
                    
                    <div style="flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; background: #f9fafb;">
                        ${messages.map(m => `
                            <div style="display: flex; justify-content: ${m.type === 'user' ? 'flex-end' : 'flex-start'};">
                                <div style="max-width: 320px; padding: 8px 12px; border-radius: 12px; background: ${
                                    m.type === 'user' ? '#059669' : m.type === 'system' ? '#dbeafe' : 'white'
                                }; color: ${
                                    m.type === 'user' ? 'white' : m.type === 'system' ? '#1e40af' : '#111827'
                                }; border: ${m.type === 'system' || m.type === 'ai' ? '1px solid #e5e7eb' : 'none'};">
                                    <div style="font-size: 13px; line-height: 1.4;">${m.content}</div>
                                    <div style="font-size: 10px; margin-top: 4px; opacity: 0.7;">
                                        ${m.timestamp}${m.type === 'ai' ? ' • Local AI' : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                        ${typing ? `
                            <div style="display: flex; justify-content: flex-start;">
                                <div style="background: white; border: 1px solid #e5e7eb; padding: 8px 12px; border-radius: 12px;">
                                    <div style="display: flex; align-items: center; gap: 6px;">
                                        <div style="display: flex; gap: 2px;">
                                            <div style="width: 4px; height: 4px; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite;"></div>
                                            <div style="width: 4px; height: 4px; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite 0.2s;"></div>
                                            <div style="width: 4px; height: 4px; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite 0.4s;"></div>
                                        </div>
                                        <span style="font-size: 12px; color: #6b7280;">Processing locally...</span>
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div style="padding: 12px; border-top: 1px solid #e5e7eb; background: white; display: flex; gap: 8px;">
                        <input 
                            id="demo-input"
                            style="flex: 1; border: 1px solid #d1d5db; border-radius: 6px; padding: 8px 12px; font-size: 13px; outline: none;"
                            placeholder="Ask me anything... (processed locally)"
                            onkeydown="if(event.key==='Enter') sendDemoMessage()"
                        />
                        <button 
                            onclick="sendDemoMessage()"
                            style="background: #059669; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;"
                        >
                            Send
                        </button>
                    </div>
                </div>
            `;
        } else if (activeTab === 'docs') {
            return `
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 16px; border-bottom: 1px solid #e5e7eb; background: white; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h2 style="font-size: 18px; font-weight: 700; margin: 0; margin-bottom: 2px;">Documents</h2>
                            <p style="margin: 0; font-size: 12px; color: #6b7280;">Encrypted document vault</p>
                        </div>
                        <button style="background: #059669; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">
                            Upload
                        </button>
                    </div>
                    
                    <div style="flex: 1; overflow-y: auto; padding: 16px; background: #f9fafb;">
                        ${docs.map(doc => `
                            <div style="display: flex; justify-content: space-between; align-items: center; background: white; border: 1px solid #e5e7eb; padding: 12px; border-radius: 8px; margin-bottom: 8px;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="background: #dcfce7; padding: 6px; border-radius: 6px; font-size: 12px; font-weight: 600;">DOC</div>
                                    <div>
                                        <div style="font-weight: 600; font-size: 13px;">${doc.name}</div>
                                        <div style="font-size: 11px; color: #6b7280;">${doc.size} • ${doc.date}</div>
                                        <div style="display: flex; gap: 8px; margin-top: 4px;">
                                            <span style="font-size: 10px; background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px;">Encrypted</span>
                                            ${doc.analyzed ? '<span style="font-size: 10px; background: #dbeafe; color: #1e40af; padding: 2px 6px; border-radius: 4px;">Analyzed</span>' : ''}
                                        </div>
                                    </div>
                                </div>
                                <button style="background: #f3f4f6; border: 1px solid #d1d5db; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                    Open
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (activeTab === 'voice') {
            return `
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 16px; border-bottom: 1px solid #e5e7eb; background: white;">
                        <h2 style="font-size: 18px; font-weight: 700; margin: 0; margin-bottom: 2px;">Voice Notes</h2>
                        <p style="margin: 0; font-size: 12px; color: #6b7280;">Record and transcribe locally</p>
                    </div>
                    
                    <div style="flex: 1; padding: 16px; background: #f9fafb; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
                            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">New Recording</h3>
                            <div style="text-center; padding: 24px 0;">
                                <button style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid #d1d5db; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; margin: 0 auto;">
                                    🎙️
                                </button>
                                <p style="margin-top: 8px; font-size: 12px; color: #6b7280;">Tap to start recording</p>
                            </div>
                            <div style="background: #dcfce7; border: 1px solid #16a34a; border-radius: 6px; padding: 8px; font-size: 11px; color: #166534;">
                                Local Whisper AI transcription
                            </div>
                        </div>
                        
                        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
                            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Recent Recordings</h3>
                            ${recordings.map(r => `
                                <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px; margin-bottom: 6px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <div style="font-size: 12px; font-weight: 500;">${r.name}</div>
                                            <div style="font-size: 10px; color: #6b7280;">Duration: ${r.duration}</div>
                                        </div>
                                        <button style="background: #059669; color: white; border: none; padding: 4px; border-radius: 4px; cursor: pointer;">▶️</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else if (activeTab === 'analysis') {
            return `
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 16px; border-bottom: 1px solid #e5e7eb; background: white;">
                        <h2 style="font-size: 18px; font-weight: 700; margin: 0; margin-bottom: 2px;">Document Insights</h2>
                        <p style="margin: 0; font-size: 12px; color: #6b7280;">AI-powered analysis (local processing)</p>
                    </div>
                    
                    <div style="flex: 1; padding: 16px; background: #f9fafb; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
                            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Upload for Analysis</h3>
                            <div style="border: 2px dashed #d1d5db; border-radius: 8px; padding: 24px; text-center;">
                                <div style="font-size: 24px; margin-bottom: 8px;">📁</div>
                                <p style="font-size: 12px; color: #6b7280; margin: 0;">Drop files here</p>
                                <p style="font-size: 10px; color: #9ca3af; margin: 4px 0 0 0;">PDF, Word, Text files</p>
                                <div style="margin-top: 8px; font-size: 10px; color: #059669;">Analyzed locally</div>
                            </div>
                        </div>
                        
                        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
                            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Analysis Options</h3>
                            ${[
                                { name: 'Smart Summary', icon: 'SUM' },
                                { name: 'Find Details', icon: 'FIND' },
                                { name: 'Review Tone', icon: 'TONE' },
                                { name: 'Legal Review', icon: 'LAW' },
                            ].map(opt => `
                                <div style="display: flex; align-items: center; gap: 8px; border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px; margin-bottom: 6px; cursor: pointer; background: #f9fafb;">
                                    <div style="background: #f3f4f6; padding: 4px; border-radius: 4px; font-size: 10px; font-weight: 600;">${opt.icon}</div>
                                    <span style="font-size: 12px; font-weight: 500;">${opt.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        return '';
    }

    async function sendMessage() {
        const input = document.getElementById('demo-input');
        if (!input || !input.value.trim()) return;
        
        const userContent = input.value;
        messages.push({
            id: Date.now(),
            type: 'user',
            content: userContent,
            timestamp: new Date().toLocaleTimeString()
        });
        
        input.value = '';
        typing = true;
        renderDemo();
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const responses = [
            "I've processed your request locally on this device. In the real Vaults app, I'd be running advanced language models without any internet connection.",
            "This demo simulates how I'll analyze your documents privately. Everything stays on your device - no cloud processing ever.",
            "I can help with legal document review, medical record analysis, or journalistic research - all processed locally for complete confidentiality.",
            "Your query shows how Vaults will work: ask questions, get AI insights, maintain absolute privacy. No data transmission, ever.",
            "This demonstrates local AI processing. The real product will use models running entirely on your hardware."
        ];
        
        messages.push({
            id: Date.now() + 1,
            type: 'ai',
            content: responses[Math.floor(Math.random() * responses.length)],
            timestamp: new Date().toLocaleTimeString()
        });
        
        typing = false;
        renderDemo();
    }

    function switchTab(tabId) {
        activeTab = tabId;
        renderDemo();
    }

    window.switchTab = switchTab;
    window.sendDemoMessage = sendMessage;

    renderDemo();
}

window.addEventListener('load', () => {
    updateNavbar();
    setTimeout(initVaultsDemo, 1000);
});