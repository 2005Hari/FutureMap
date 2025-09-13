import React from 'react';
import Icon from '../../../components/AppIcon';

const ConversationStarters = ({ onStarterClick, className = "" }) => {
  const starterCategories = [
    {
      title: "Stream Selection",
      icon: "BookOpen",
      color: "text-primary",
      bgColor: "bg-primary/10",
      starters: [
        "Which stream should I choose after 10th grade?",
        "What are the differences between Science, Commerce, and Arts?",
        "I'm confused between PCM and PCB, help me decide",
        "What vocational courses are available after 10th?"
      ]
    },
    {
      title: "Career Options",
      icon: "Target",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      starters: [
        "What career options do I have with my current stream?",
        "Tell me about emerging career fields",
        "What are high-paying careers in India?",
        "How do I become an entrepreneur?"
      ]
    },
    {
      title: "Skill Development",
      icon: "TrendingUp",
      color: "text-accent",
      bgColor: "bg-accent/10",
      starters: [
        "What skills should I develop for my future career?",
        "How can I improve my communication skills?",
        "What technical skills are in demand?",
        "How do I build a strong portfolio?"
      ]
    },
    {
      title: "Higher Education",
      icon: "GraduationCap",
      color: "text-success",
      bgColor: "bg-success/10",
      starters: [
        "What are the best colleges for my stream?",
        "How do I prepare for entrance exams?",
        "Should I study abroad or in India?",
        "What are the scholarship opportunities available?"
      ]
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          How can I help you today?
        </h2>
        <p className="text-muted-foreground">
          Choose a topic below or ask me anything about your career journey
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {starterCategories?.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="group bg-card border border-border rounded-lg p-6 card-shadow transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${category?.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                <Icon 
                  name={category?.icon} 
                  size={20} 
                  color={category?.color?.replace('text-', 'var(--color-')}
                />
              </div>
              <h3 className="font-semibold text-foreground">{category?.title}</h3>
            </div>

            <div className="space-y-2">
              {category?.starters?.map((starter, starterIndex) => (
                <button
                  key={starterIndex}
                  onClick={() => onStarterClick(starter)}
                  className="w-full text-left p-3 bg-muted/50 hover:bg-muted text-foreground rounded-lg text-sm transition-colors duration-150 group flex items-center justify-between"
                >
                  <span>{starter}</span>
                  <Icon name="ChevronRight" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={16} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Pro Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be specific about your interests and goals for better recommendations</li>
              <li>• Ask follow-up questions to dive deeper into any topic</li>
              <li>• Mention your current grade/stream for personalized advice</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationStarters;