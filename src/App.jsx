import React, { useState } from 'react';
import ChatContainer from '../components/chat/ChatContainer.jsx';
import FormPanel from '../components/form/FormPanel.jsx';
import '../styles/global.css';

function App() {
    const [activeTab, setActiveTab] = useState('chat');

    return (
        <div className="app-shell">
            {/* ─── Sticky Header ─── */}
            <header className="topbar">
                <div className="topbar-inner">
                    {/* Brand */}
                    <div className="brand-group">
                        <div className="brand-logo">
                            <span className="brand-dot d1"></span>
                            <span className="brand-dot d2"></span>
                            <span className="brand-dot d3"></span>
                        </div>
                        <span className="brand-name">helloivy</span>
                    </div>

                    {/* Breadcrumb */}
                    <div className="breadcrumb-row">
                        <span className="breadcrumb-sep">/</span>
                        <span className="breadcrumb-txt">New Essay Brainstorming</span>
                    </div>

                    {/* Essay Info */}
                    <div className="essay-meta">
                        <span className="meta-label">Essay Topic</span>
                        <span className="meta-value">"What matters most to you, and why?"</span>
                        <span className="meta-badge">350 words</span>
                    </div>

                    {/* Spacer */}
                    <div style={{ flex: 1 }} />

                    {/* Tab Pills */}
                    <div className="tab-pills">
                        <button
                            className={`pill ${activeTab === 'chat' ? 'pill-active' : ''}`}
                            onClick={() => setActiveTab('chat')}
                            id="tab-chat"
                        >
                            <span className="material-icons-round" style={{ fontSize: '17px' }}>chat</span>
                            AI Session
                        </button>
                        <button
                            className={`pill ${activeTab === 'form' ? 'pill-active' : ''}`}
                            onClick={() => setActiveTab('form')}
                            id="tab-form"
                        >
                            <span className="material-icons-round" style={{ fontSize: '17px' }}>mail</span>
                            Contact Form
                        </button>
                    </div>

                    {/* Avatar */}
                    <div className="header-avatar" id="user-avatar">
                        <span className="material-icons-round" style={{ fontSize: '22px' }}>account_circle</span>
                    </div>
                </div>
            </header>

            {/* ─── Main Content ─── */}
            <main className="main-content">
                <div className="content-container">
                    {activeTab === 'chat' ? <ChatContainer /> : <FormPanel />}
                </div>
            </main>
        </div>
    );
}

export default App;