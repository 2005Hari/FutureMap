import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full flex-shrink-0">
          <Icon name="Bot" size={20} color="var(--color-primary)" />
        </div>
        <div className="flex-1">
          <div className="bg-card border border-border rounded-lg p-4 max-w-3xl">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-muted-foreground">AI is thinking...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-6 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${
        isUser 
          ? 'bg-secondary/10' :'bg-primary/10'
      }`}>
        <Icon 
          name={isUser ? "User" : "Bot"} 
          size={20} 
          color={isUser ? "var(--color-secondary)" : "var(--color-primary)"} 
        />
      </div>
      <div className="flex-1 max-w-3xl">
        <div className={`rounded-lg p-4 ${
          isUser 
            ? 'bg-secondary text-secondary-foreground ml-auto' 
            : 'bg-card border border-border'
        }`}>
          {message?.type === 'structured' ? (
            <div className="space-y-4">
              <p className="text-foreground leading-relaxed">{message?.content}</p>
              
              {message?.sections && message?.sections?.map((section, index) => (
                <div key={index} className="border-t border-border pt-3">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                    <Icon name={section?.icon} size={16} />
                    <span>{section?.title}</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{section?.content}</p>
                  
                  {section?.links && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {section?.links?.map((link, linkIndex) => (
                        <button
                          key={linkIndex}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors duration-150"
                        >
                          {link?.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {message?.quickActions && (
                <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                  {message?.quickActions?.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className="flex items-center space-x-1 px-3 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm transition-colors duration-150"
                    >
                      <Icon name={action?.icon} size={14} />
                      <span>{action?.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className={`leading-relaxed ${isUser ? 'text-secondary-foreground' : 'text-foreground'}`}>
              {message?.content}
            </p>
          )}
        </div>
        
        <div className={`flex items-center space-x-2 mt-2 text-xs text-muted-foreground ${
          isUser ? 'justify-end' : 'justify-start'
        }`}>
          <span>{formatTime(timestamp)}</span>
          {isUser && (
            <Icon name="Check" size={12} color="var(--color-success)" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;