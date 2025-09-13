import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ConversationStarters from './components/ConversationStarters';
import QuickActions from './components/QuickActions';

const AiCareerChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showStarters, setShowStarters] = useState(true);
  const messagesEndRef = useRef(null);

  // Mock AI responses based on message content
  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();
    
    if (lowerMessage?.includes('stream') || lowerMessage?.includes('10th') || lowerMessage?.includes('choose')) {
      return {
        type: 'structured',
        content: `Great question! Choosing the right stream after 10th grade is crucial for your career path. Let me break down your options:`,
        sections: [
          {
            icon: 'Atom',
            title: 'Science Stream (PCM/PCB)',
            content: `Perfect for students interested in Engineering, Medicine, Research, or Technology. PCM opens doors to Engineering and Tech careers, while PCB leads to Medical and Life Sciences.`,
            links: [
              { label: 'Engineering Careers', path: '/career-pathway-explorer' },
              { label: 'Medical Careers', path: '/career-pathway-explorer' }
            ]
          },
          {
            icon: 'TrendingUp',
            title: 'Commerce Stream',
            content: `Ideal for future business leaders, accountants, and finance professionals. Opens pathways to CA, CS, MBA, and entrepreneurship.`,
            links: [
              { label: 'Business Careers', path: '/career-pathway-explorer' },
              { label: 'Finance Options', path: '/course-program-explorer' }
            ]
          },
          {
            icon: 'Palette',
            title: 'Arts/Humanities',
            content: `Great for creative minds and those interested in social sciences, literature, psychology, and media. Very diverse career options available.`,
            links: [
              { label: 'Creative Careers', path: '/career-pathway-explorer' },
              { label: 'Social Sciences', path: '/course-program-explorer' }
            ]
          }
        ],
        quickActions: [
          { icon: 'Brain', label: 'Take Aptitude Quiz' },
          { icon: 'Target', label: 'Get Recommendations' },
          { icon: 'MessageCircle', label: 'Ask More Questions' }
        ]
      };
    }
    
    if (lowerMessage?.includes('career') || lowerMessage?.includes('job') || lowerMessage?.includes('profession')) {
      return {
        type: 'structured',
        content: `Career planning is exciting! Let me help you explore various career options based on current trends and opportunities:`,
        sections: [
          {
            icon: 'Cpu',
            title: 'Technology & IT',
            content: `High-growth sectors including AI/ML, Cybersecurity, Data Science, Software Development, and Digital Marketing. Great salary prospects and remote work opportunities.`,
            links: [
              { label: 'Tech Careers', path: '/career-pathway-explorer' },
              { label: 'Skill Requirements', path: '/course-program-explorer' }
            ]
          },
          {
            icon: 'Heart',
            title: 'Healthcare & Medicine',
            content: `Always in demand with options like Doctor, Nurse, Physiotherapist, Medical Research, Healthcare Management, and emerging fields like Telemedicine.`,
            links: [
              { label: 'Medical Pathways', path: '/career-pathway-explorer' }
            ]
          },
          {
            icon: 'Briefcase',
            title: 'Business & Finance',
            content: `From traditional banking to fintech, including roles in Investment Banking, Financial Planning, Business Analysis, and Entrepreneurship.`,
            links: [
              { label: 'Business Careers', path: '/career-pathway-explorer' }
            ]
          }
        ],
        quickActions: [
          { icon: 'Map', label: 'Explore All Careers' },
          { icon: 'Target', label: 'Get Personalized Suggestions' }
        ]
      };
    }
    
    if (lowerMessage?.includes('skill') || lowerMessage?.includes('develop') || lowerMessage?.includes('improve')) {
      return {
        type: 'structured',
        content: `Skill development is key to career success! Here are the most important skills to focus on:`,
        sections: [
          {
            icon: 'Users',
            title: 'Soft Skills',
            content: `Communication, Leadership, Problem-solving, Time Management, and Emotional Intelligence. These are valued across all industries.`,
            links: [
              { label: 'Communication Tips', path: '/course-program-explorer' }
            ]
          },
          {
            icon: 'Code',
            title: 'Technical Skills',
            content: `Programming, Data Analysis, Digital Marketing, Design Tools, and Industry-specific software. Choose based on your career path.`,
            links: [
              { label: 'Tech Courses', path: '/course-program-explorer' }
            ]
          },
          {
            icon: 'Globe',
            title: 'Future-Ready Skills',
            content: `AI/ML basics, Digital Literacy, Adaptability, Creative Thinking, and Cross-cultural Communication for the global workplace.`,
            links: [
              { label: 'Future Skills', path: '/course-program-explorer' }
            ]
          }
        ],
        quickActions: [
          { icon: 'BookOpen', label: 'Find Skill Courses' },
          { icon: 'Target', label: 'Skill Assessment' }
        ]
      };
    }
    
    // Default response
    return {
      type: 'structured',
      content: `I understand you're looking for career guidance. I'm here to help you with stream selection, career exploration, skill development, and education planning.`,
      sections: [
        {
          icon: 'Compass',
          title: 'How I Can Help',
          content: `I can provide personalized advice on career paths, educational choices, skill development, and answer any specific questions about your future.`,
          links: [
            { label: 'Take Assessment', path: '/aptitude-quiz-interface' },
            { label: 'View Recommendations', path: '/stream-recommendations' }
          ]
        }
      ],
      quickActions: [
        { icon: 'Brain', label: 'Start Assessment' },
        { icon: 'MessageCircle', label: 'Ask Specific Question' }
      ]
    };
  };

  const handleSendMessage = async (messageContent) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      content: messageContent,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowStarters(false);
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageContent);
      const aiMessage = {
        id: Date.now() + 1,
        ...aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleClearChat = () => {
    setMessages([]);
    setShowStarters(true);
    setIsTyping(false);
  };

  const handleStarterClick = (starter) => {
    handleSendMessage(starter);
  };

  const handleQuickAction = (question) => {
    handleSendMessage(question);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Generate suggestions based on conversation context
  const getSuggestions = () => {
    if (messages?.length === 0) return [];
    
    const lastMessage = messages?.[messages?.length - 1];
    if (lastMessage?.isUser) return [];
    
    return [
      "Tell me more about this",
      "What are the requirements?",
      "How do I get started?",
      "What's the salary range?"
    ];
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Career Counselor - CareerCompass</title>
        <meta name="description" content="Get personalized career guidance from our AI counselor. Ask questions about streams, careers, skills, and education planning." />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="w-full px-8 py-6">
          <Breadcrumb />
          
          <div className="">
            <div className="bg-card rounded-lg border border-border card-shadow overflow-hidden">
              <ChatHeader 
                onClearChat={handleClearChat}
                messageCount={messages?.length}
              />
              
              <div className="flex h-[calc(100vh-160px)]">
                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-6">
                    {showStarters ? (
                      <ConversationStarters onStarterClick={handleStarterClick} />
                    ) : (
                      <div className="space-y-6">
                        {messages?.map((message) => (
                          <ChatMessage
                            key={message?.id}
                            message={message}
                            isUser={message?.isUser}
                            timestamp={message?.timestamp}
                          />
                        ))}
                        
                        {isTyping && (
                          <ChatMessage 
                            message={{ content: '', type: 'structured' }}
                            isUser={false}
                            timestamp={new Date()}
                            isTyping={true} 
                          />
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>
                  
                  <ChatInput
                    onSendMessage={handleSendMessage}
                    disabled={isTyping}
                    suggestions={getSuggestions()}
                  />
                </div>
                
                {/* Sidebar - Quick Actions */}
                <div className="w-1/3 border-l border-border bg-muted/20 p-6 overflow-y-auto hidden lg:block">
                  <QuickActions onQuickAction={handleQuickAction} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiCareerChatbot;