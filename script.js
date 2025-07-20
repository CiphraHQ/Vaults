// Enhanced navigation with scroll effects
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });

// Smooth scroll functions
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 100;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const updatesForm = document.getElementById('updatesForm');
    if (updatesForm) {
        updatesForm.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') {
                e.preventDefault();
                const button = e.target;
                const input = this.querySelector('input');
                const originalText = button.textContent;
                
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.textContent = 'Added to Waitlist ✓';
                    button.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
                    button.style.transform = 'scale(1.05)';
                    button.style.boxShadow = '0 8px 30px rgba(16, 185, 129, 0.4)';
                    
                    input.style.transform = 'scale(1.02)';
                    input.style.borderColor = '#10b981';
                    input.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
                }, 100);
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.style.transform = '';
                    button.style.boxShadow = '';
                    input.style.transform = '';
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                    input.value = '';
                }, 3000);
            }
        });
    }
});

// Demo functionality - Updated for offline-first workspace
function initVaultsDemo() {
    const demoContainer = document.getElementById('vaults-demo-container');
    if (!demoContainer) return;

    let activeTab = 'workspace';
    let licenseExpired = false;
    let documents = [
        { id: 1, name: 'Client_Confidential.pdf', size: '2.4 MB', encrypted: true, lastAccess: '2 hours ago' },
        { id: 2, name: 'Case_Notes.txt', size: '156 KB', encrypted: true, lastAccess: 'Yesterday' },
        { id: 3, name: 'Legal_Brief_Draft.docx', size: '1.2 MB', encrypted: true, lastAccess: '3 days ago' }
    ];

    const tabs = [
        { id: 'workspace', label: 'Workspace' },
        { id: 'documents', label: 'Documents' },
        { id: 'licensing', label: 'License' },
        { id: 'security', label: 'Security' },
    ];

    function renderDemo() {
        demoContainer.innerHTML = `
            <div style="height: 100%; display: flex; background: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; border-radius: 20px; overflow: hidden;">
                <!-- Sidebar -->
                <div style="width: 240px; background: #0a0a0a; border-right: 1px solid rgba(16, 185, 129, 0.2); padding: 16px; display: flex; flex-direction: column;">
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <div style="display: flex; gap: 1px;">
                                ${[12, 16, 20, 18, 22, 17, 19, 15].map(height => 
                                    `<div style="width: 2px; height: ${height}px; background: linear-gradient(to top, #059669, #10b981); border-radius: 1px;"></div>`
                                ).join('')}
                            </div>
                            <h1 style="font-size: 18px; font-weight: 900; margin: 0; font-family: 'Orbitron', monospace; letter-spacing: 1px; color: #ffffff;">VAULTS</h1>
                        </div>
                        <div style="font-size: 11px; color: #10b981; font-weight: 600;">Demo Preview</div>
                        <div style="font-size: 10px; color: #94a3b8;">Offline-First Workspace</div>
                    </div>
                    
                    ${tabs.map(t => `
                        <button 
                            onclick="window.switchTab('${t.id}')" 
                            style="width: 100%; text-align: left; padding: 12px 16px; margin-bottom: 4px; border: none; border-radius: 10px; background: ${activeTab === t.id ? 'rgba(16, 185, 129, 0.2)' : 'transparent'}; color: ${activeTab === t.id ? '#10b981' : '#94a3b8'}; font-weight: ${activeTab === t.id ? '600' : '400'}; cursor: pointer; font-size: 14px; transition: all 0.2s ease; border: 1px solid ${activeTab === t.id ? '#10b981' : 'transparent'};"
                            onmouseover="if('${t.id}' !== '${activeTab}') this.style.background='rgba(16, 185, 129, 0.1)'"
                            onmouseout="if('${t.id}' !== '${activeTab}') this.style.background='transparent'"
                        >
                            ${t.label}
                        </button>
                    `).join('')}
                    
                    <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(16, 185, 129, 0.2);">
                        <div style="font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                            <div style="width: 6px; height: 6px; background: #10b981; border-radius: 50%; box-shadow: 0 0 4px rgba(16, 185, 129, 0.5);"></div>
                            Offline Mode
                        </div>
                        <div style="font-size: 10px; color: #94a3b8; display: flex; align-items: center; gap: 6px;">
                            <div style="width: 4px; height: 4px; background: #94a3b8; border-radius: 50%;"></div>
                            No Network Access
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div style="flex: 1; display: flex; flex-direction: column; background: #1a1a1a;">
                    ${renderTabContent()}
                </div>
            </div>
        `;
    }

    function renderTabContent() {
        if (activeTab === 'workspace') {
            return `
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 20px; border-bottom: 1px solid rgba(16, 185, 129, 0.2); background: #0a0a0a;">
                        <h2 style="font-size: 20px; font-weight: 700; margin: 0; margin-bottom: 4px; color: #ffffff;">Secure Workspace</h2>
                        <p style="margin: 0; font-size: 13px; color: #94a3b8;">Professional environment for sensitive work</p>
                    </div>
                    
                    <div style="flex: 1; padding: 20px; background: #1a1a1a; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="background: #0a0a0a; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px;">
                            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #ffffff;">New Document</h3>
                            <div style="display: grid; gap: 12px;">
                                ${[
                                    { name: 'Legal Brief', icon: 'LAW', desc: 'Professional legal template' },
                                    { name: 'Case Notes', icon: 'NOTE', desc: 'Secure case documentation' },
                                    { name: 'Client Report', icon: 'RPT', desc: 'Encrypted client communication' },
                                    { name: 'Compliance Doc', icon: 'CMP', desc: 'Regulatory compliance template' }
                                ].map(template => `
                                    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #1a1a1a; border: 1px solid rgba(16, 185, 129, 0.1); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;" onmouseover="this.style.background='rgba(16, 185, 129, 0.05)'; this.style.borderColor='rgba(16, 185, 129, 0.3)'" onmouseout="this.style.background='#1a1a1a'; this.style.borderColor='rgba(16, 185, 129, 0.1)'">
                                        <div style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 6px; border-radius: 6px; font-size: 10px; font-weight: 600; min-width: 36px; text-align: center;">${template.icon}</div>
                                        <div>
                                            <div style="font-size: 13px; font-weight: 500; color: #ffffff; margin-bottom: 2px;">${template.name}</div>
                                            <div style="font-size: 11px; color: #94a3b8;">${template.desc}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div style="background: #0a0a0a; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px;">
                            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #ffffff;">Recent Activity</h3>
                            <div style="display: grid; gap: 10px;">
                                ${[
                                    { action: 'Edited Legal_Brief_Draft.docx', time: '2 hours ago', type: 'edit' },
                                    { action: 'Created Client_Notes.txt', time: 'Yesterday', type: 'create' },
                                    { action: 'Exported Case_Summary.pdf', time: '2 days ago', type: 'export' },
                                    { action: 'Updated license file', time: '1 week ago', type: 'license' }
                                ].map(activity => `
                                    <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: #1a1a1a; border-radius: 8px;">
                                        <div style="width: 8px; height: 8px; background: ${
                                            activity.type === 'edit' ? '#10b981' : 
                                            activity.type === 'create' ? '#34d399' : 
                                            activity.type === 'export' ? '#059669' : '#94a3b8'
                                        }; border-radius: 50%;"></div>
                                        <div style="flex: 1;">
                                            <div style="font-size: 12px; color: #ffffff; margin-bottom: 2px;">${activity.action}</div>
                                            <div style="font-size: 10px; color: #94a3b8;">${activity.time}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (activeTab === 'documents') {
            return `
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 20px; border-bottom: 1px solid rgba(16, 185, 129, 0.2); background: #0a0a0a; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h2 style="font-size: 20px; font-weight: 700; margin: 0; margin-bottom: 4px; color: #ffffff;">Document Vault</h2>
                            <p style="margin: 0; font-size: 13px; color: #94a3b8;">Encrypted local storage</p>
                        </div>
                        <button style="background: linear-gradient(135deg, #10b981, #34d399); color: #000000; border: none; padding: 8px 16px; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 600; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);">
                            New Document
                        </button>
                    </div>
                    
                    <div style="flex: 1; overflow-y: auto; padding: 20px; background: #1a1a1a;">
                        ${documents.map(doc => `
                            <div style="display: flex; justify-content: space-between; align-items: center; background: #0a0a0a; border: 1px solid rgba(16, 185, 129, 0.2); padding: 16px; border-radius: 12px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); transition: all 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(0, 0, 0, 0.4)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.3)'">
                                <div style="display: flex; align-items: center; gap: 16px;">
                                    <div style="background: rgba(16, 185, 129, 0.2); padding: 8px; border-radius: 8px; font-size: 12px; font-weight: 600; color: #10b981;">SEC</div>
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px; color: #ffffff;">${doc.name}</div>
                                        <div style="font-size: 12px; color: #94a3b8; margin-bottom: 6px;">${doc.size} • Last access: ${doc.lastAccess}</div>
                                        <div style="display: flex; gap: 8px;">
                                            <span style="font-size: 10px; background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 3px 8px; border-radius: 6px; font-weight: 500;">AES-256 Encrypted</span>
                                            <span style="font-size: 10px; background: rgba(52, 211, 153, 0.2); color: #34d399; padding: 3px 8px; border-radius: 6px; font-weight: 500;">Local Only</span>
                                        </div>
                                    </div>
                                </div>
                                <button style="background: #1a1a1a; border: 1px solid rgba(16, 185, 129, 0.2); padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 12px; transition: all 0.2s ease; color: #ffffff;" onmouseover="this.style.background='rgba(16, 185, 129, 0.1)'" onmouseout="this.style.background='#1a1a1a'">
                                    Open
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (activeTab === 'licensing') {
            return `
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 20px; border-bottom: 1px solid rgba(16, 185, 129, 0.2); background: #0a0a0a;">
                        <h2 style="font-size: 20px; font-weight: 700; margin: 0; margin-bottom: 4px; color: #ffffff;">License Management</h2>
                        <p style="margin: 0; font-size: 13px; color: #94a3b8;">Manual licensing for maximum security</p>
                    </div>
                    
                    <div style="flex: 1; padding: 20px; background: #1a1a1a; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="background: #0a0a0a; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px;">
                            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #ffffff; display: flex; align-items: center; gap: 8px;">
                                <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);"></div>
                                Current License
                            </h3>
                            <div style="background: #1a1a1a; border: 1px solid rgba(16, 185, 129, 0.1); border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                                <div style="font-size: 12px; color: #94a3b8; margin-bottom: 8px;">License Status</div>
                                <div style="font-size: 14px; font-weight: 600; color: #10b981; margin-bottom: 12px;">Active (Demo)</div>
                                <div style="font-size: 11px; color: #94a3b8; margin-bottom: 4px;">Valid until: Dec 31, 2025</div>
                                <div style="font-size: 11px; color: #94a3b8;">License file: vaults_demo.lic</div>
                            </div>
                            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; padding: 12px; font-size: 12px; color: #10b981; margin-bottom: 16px;">
                                ✓ Manual license import successful
                            </div>
                            <button style="background: linear-gradient(135deg, #10b981, #34d399); color: #000000; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600; width: 100%;">
                                Import New License
                            </button>
                        </div>
                        
                        <div style="background: #0a0a0a; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px;">
                            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #ffffff;">How Licensing Works</h3>
                            <div style="display: grid; gap: 12px;">
                                ${[
                                    { step: '1', title: 'Purchase License', desc: 'Receive signed .lic file via email' },
                                    { step: '2', title: 'Import Manually', desc: 'Drag license file into Vaults' },
                                    { step: '3', title: 'Work Offline', desc: 'Full functionality without internet' },
                                    { step: '4', title: 'Renewal Notice', desc: 'Read-only mode when expired' }
                                ].map(item => `
                                    <div style="display: flex; gap: 12px; padding: 12px; background: #1a1a1a; border-radius: 8px;">
                                        <div style="background: rgba(16, 185, 129, 0.2); color: #10b981; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; flex-shrink: 0;">${item.step}</div>
                                        <div>
                                            <div style="font-size: 13px; font-weight: 500; color: #ffffff; margin-bottom: 2px;">${item.title}</div>
                                            <div style="font-size: 11px; color: #94a3b8;">${item.desc}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (activeTab === 'security') {
            return `
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 20px; border-bottom: 1px solid rgba(16, 185, 129, 0.2); background: #0a0a0a;">
                        <h2 style="font-size: 20px; font-weight: 700; margin: 0; margin-bottom: 4px; color: #ffffff;">Security Status</h2>
                        <p style="margin: 0; font-size: 13px; color: #94a3b8;">System security monitoring</p>
                    </div>
                    
                    <div style="flex: 1; padding: 20px; background: #1a1a1a;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                            <div style="background: #0a0a0a; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px;">
                                <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #ffffff;">Network Status</h3>
                                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; padding: 16px; text-align: center;">
                                    <div style="font-size: 24px; margin-bottom: 8px;">🔒</div>
                                    <div style="font-size: 14px; font-weight: 600; color: #10b981; margin-bottom: 4px;">Offline Mode</div>
                                    <div style="font-size: 11px; color: #10b981;">No network access detected</div>
                                </div>
                            </div>
                            
                            <div style="background: #0a0a0a; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px;">
                                <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #ffffff;">Encryption Status</h3>
                                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; padding: 16px; text-align: center;">
                                    <div style="font-size: 24px; margin-bottom: 8px;">🛡️</div>
                                    <div style="font-size: 14px; font-weight: 600; color: #10b981; margin-bottom: 4px;">AES-256 Active</div>
                                    <div style="font-size: 11px; color: #10b981;">LibSodium encryption enabled</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: #0a0a0a; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px;">
                            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #ffffff;">Security Features</h3>
                            <div style="display: grid; gap: 8px;">
                                ${[
                                    { guarantee: 'Data never leaves your device', status: 'active' },
                                    { guarantee: 'No cloud servers or API calls', status: 'active' },
                                    { guarantee: 'Manual updates only', status: 'active' },
                                    { guarantee: 'Air-gap compatible operation', status: 'active' },
                                    { guarantee: 'Read-only mode when expired', status: 'active' },
                                    { guarantee: 'Zero telemetry or tracking', status: 'active' }
                                ].map(item => `
                                    <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: #1a1a1a; border-radius: 8px;">
                                        <div style="width: 6px; height: 6px; background: #10b981; border-radius: 50%; box-shadow: 0 0 4px rgba(16, 185, 129, 0.5);"></div>
                                        <div style="font-size: 13px; color: #ffffff;">${item.guarantee}</div>
                                        <div style="margin-left: auto; font-size: 10px; background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 2px 6px; border-radius: 4px; font-weight: 500;">✓</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        return '';
    }

    function switchTab(tabId) {
        activeTab = tabId;
        renderDemo();
    }

    // Make functions globally available
    window.switchTab = switchTab;

    renderDemo();
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    updateNavbar();
    setTimeout(initVaultsDemo, 500);
});