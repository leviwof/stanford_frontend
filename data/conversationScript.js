/**
 * Pre-scripted conversation about Stanford goals
 * This simulates AI responses for the demo
 */

export const conversationScript = [
    {
        role: 'ai',
        content: "Hello! I'm here to help you craft your Stanford application essay. Let's discuss your short-term and long-term goals, and why Stanford is the right fit for you. Ready to begin?",
        delay: 1000
    },
    {
        role: 'user',
        content: "Yes, I'm ready! I've been thinking a lot about this.",
        delay: 2000
    },
    {
        role: 'ai',
        content: "Great! Let's start with your short-term goals. What do you hope to achieve in your first two years at Stanford?",
        delay: 1500
    },
    {
        role: 'user',
        content: "In the short term, I want to dive deep into computer science fundamentals while exploring Stanford's interdisciplinary opportunities. I'm particularly interested in the CS + Humanities program.",
        delay: 3000
    },
    {
        role: 'ai',
        content: "Excellent choice! Stanford's interdisciplinary approach is unique. The Symbolic Systems program might interest you too. How does this connect to your long-term vision?",
        delay: 2000
    },
    {
        role: 'user',
        content: "Long-term, I want to build AI systems that make education accessible globally. Growing up in a small town, I saw how limited access to quality education holds people back. I want to change that.",
        delay: 3500
    },
    {
        role: 'ai',
        content: "That's a compelling mission! Stanford's proximity to Silicon Valley and its strong AI research groups like HAI (Human-Centered AI Institute) align perfectly with this goal. Have you considered specific faculty you'd want to work with?",
        delay: 2500
    },
    {
        role: 'user',
        content: "Yes! Professor Fei-Fei Li's work on democratizing AI deeply resonates with me. Her journey and commitment to AI for social good is exactly the mentorship I'm seeking.",
        delay: 3000
    },
    {
        role: 'ai',
        content: "You've articulated a clear vision that connects personal experience → academic interests → long-term impact. This narrative arc is powerful. Would you like me to help you structure this into a 350-word essay?",
        delay: 2000
    },
    {
        role: 'user',
        content: "Yes please! That would be incredibly helpful.",
        delay: 1500
    },
    {
        role: 'ai',
        content: "Here's a suggested structure:\n\n**Opening (50 words):** Hook with your small-town education experience\n\n**Short-term goals (100 words):** CS fundamentals + interdisciplinary exploration\n\n**Long-term vision (100 words):** AI for global education access\n\n**Why Stanford (100 words):** HAI, Fei-Fei Li, Silicon Valley ecosystem\n\nShall we draft each section?",
        delay: 3000
    }
];

export const getNextMessage = (currentIndex) => {
    if (currentIndex < conversationScript.length) {
        return conversationScript[currentIndex];
    }
    return null;
};