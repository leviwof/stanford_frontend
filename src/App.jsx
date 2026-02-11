import React, { useState } from 'react';
import FormPanel from '../components/form/FormPanel.jsx';
import ChatContainer from '../components/Chat/ChatContainer.jsx';

function App() {
    const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'form'

    return (
        <div className="app">
            <header className="app-header">
                <h1>🎓 Stanford AI Assistant</h1>
                <nav className="tab-nav">
                    <button
                        className={activeTab === 'chat' ? 'active' : ''}
                        onClick={() => setActiveTab('chat')}
                    >
                        AI Conversation
                    </button>
                    <button
                        className={activeTab === 'form' ? 'actisve' : ''}
                        onClick={() => setActiveTab('form')}
                    >
                        Contact Form
                    </button>
                </nav>
            </header>

            <main className="app-main">
                <div style={{ width: "100%", maxWidth: "1100px" }}>
                    {activeTab === 'chat' ? <ChatContainer /> : <FormPanel />}
                </div>
            </main>

        </div>
    );
}

export default App;