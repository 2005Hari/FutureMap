import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatInput = ({ onSendMessage, disabled = false, suggestions = [] }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    const textarea = e?.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea?.scrollHeight, 120) + 'px';
  };

  const handleSuggestionClick = (suggestion) => {
    if (!disabled) {
      onSendMessage(suggestion);
    }
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording functionality would be implemented here
  };

  return (
    <div className="border-t border-border bg-card p-4">
      {/* Suggestions */}
      {suggestions?.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {suggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={disabled}
                className="px-3 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your career path..."
            disabled={disabled}
            className="w-full px-4 py-3 pr-12 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '48px', maxHeight: '120px' }}
            rows={1}
          />
          
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleVoiceRecording}
            disabled={disabled}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors duration-150 ${
              isRecording 
                ? 'text-error hover:bg-error/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={isRecording ? 'Stop recording' : 'Voice input'}
          >
            <Icon 
              name={isRecording ? "MicOff" : "Mic"} 
              size={18} 
              className={isRecording ? 'animate-pulse' : ''}
            />
          </button>
        </div>

        <Button
          type="submit"
          disabled={!message?.trim() || disabled}
          iconName="Send"
          iconPosition="right"
          className="px-4 py-3"
        >
          Send
        </Button>
      </form>
      {/* Input Helper */}
      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span>{message?.length}/1000</span>
      </div>
    </div>
  );
};

export default ChatInput;