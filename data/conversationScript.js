/**
 * Pre-scripted conversation about Stanford goals
 * Topic: What are your short-term & long-term goals, and why do you want to attend Stanford?
 * ~350 words total across all messages
 */

export const conversationScript = [
    {
        role: 'ai',
        content: "Hello! I'm Ivy, your essay brainstorming partner. Today we'll explore your goals and connection to Stanford. Let's start — what are your short-term academic goals for your first two years?",
        delay: 1000
    },
    {
        role: 'user',
        content: "In my first two years, I want to build a strong foundation in computer science while exploring Stanford's interdisciplinary programs. I'm especially drawn to the Symbolic Systems program that blends CS with cognitive science and philosophy.",
        delay: 2500
    },
    {
        role: 'ai',
        content: "That's a powerful combination! Symbolic Systems is one of Stanford's hidden gems. What sparked your interest in the intersection of technology and human cognition?",
        delay: 1800
    },
    {
        role: 'user',
        content: "Growing up in a small rural town, I watched my grandmother struggle with a health app that wasn't designed for non-English speakers. That moment showed me how technology fails when it doesn't understand people. I want to bridge that gap.",
        delay: 3000
    },
    {
        role: 'ai',
        content: "What a compelling origin story! That personal connection gives your goals real authenticity. How does this experience shape your long-term vision beyond Stanford?",
        delay: 2000
    },
    {
        role: 'user',
        content: "Long-term, I want to build AI systems that make education and healthcare accessible to underserved communities globally. I envision voice-first interfaces that work across languages and literacy levels — technology that truly serves everyone, not just the privileged few.",
        delay: 3500
    },
    {
        role: 'ai',
        content: "That's exactly the kind of mission-driven thinking Stanford values. Professor Fei-Fei Li's Human-Centered AI Institute and the d.school's design thinking approach align perfectly. Have you considered how Stanford's unique ecosystem supports this vision?",
        delay: 2500
    },
    {
        role: 'user',
        content: "Absolutely! Stanford's proximity to Silicon Valley means I can prototype ideas with real users. The HAI institute's focus on ethical AI and Professor James Landay's work on accessible interfaces are exactly the mentorship and resources I need to turn this vision into reality.",
        delay: 3000
    },
    {
        role: 'ai',
        content: "You've built a beautiful narrative arc: personal experience → academic foundation → long-term impact → why Stanford specifically. This gives us a strong 350-word essay structure. Shall I help you outline each section?",
        delay: 2000
    },
    {
        role: 'user',
        content: "Yes, let's do it! I feel like the story finally has the clarity and purpose it needed.",
        delay: 1500
    }
];

export const getNextMessage = (currentIndex) => {
    if (currentIndex < conversationScript.length) {
        return conversationScript[currentIndex];
    }
    return null;
};