import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, Mic, Calendar, Download } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm Prajwal's AI assistant. I can answer questions about his experience, projects, skills, or help you schedule an interview. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Tell me about Prajwal's experience",
        "What's his biggest project impact?",
        "Schedule an interview",
        "Download his resume"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);


  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };

    window.addEventListener('openAIChat', handleOpenChat);
    return () => window.removeEventListener('openAIChat', handleOpenChat);
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response (will be replaced with actual AI integration)
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('experience') || lowerInput.includes('background')) {
      return {
        content: "Prajwal is a Data Scientist, AI/ML at JPMorgan Chase (Jan 2025\u2013Present), working on credit risk modeling, generative AI/RAG platforms, and fraud detection. Before that, he spent three years as a Data Scientist at Mphasis in India (Jun 2020\u2013Jul 2023) on forecasting, ETL modernization, and customer segmentation. He holds an MS in Data Science from UT Arlington (4.0 GPA).",
        suggestions: ["What's his biggest project impact?", "Tell me about his credit risk work", "What about his RAG platform?", "Schedule an interview"]
      };
    }

    if (lowerInput.includes('credit risk') || lowerInput.includes('auc')) {
      return {
        content: "At JPMorgan Chase, Prajwal redesigned credit risk feature engineering and retrained XGBoost models against 95M+ lending records, improving default prediction AUC from 0.79 to 0.91 across retail and commercial portfolios.",
        suggestions: ["Tell me about his RAG platform", "What's the fraud detection work?", "Any other projects?", "Schedule an interview"]
      };
    }

    if (lowerInput.includes('rag') || lowerInput.includes('generative ai') || lowerInput.includes('llm')) {
      return {
        content: "Prajwal built a RAG platform at JPMorgan indexing SEC filings, earnings reports, and market disclosures via vector search and document embeddings \u2014 cutting analyst research time from 2.5 hours to under 50 minutes. At Mphasis, he also used LangChain, LlamaIndex, and GCP Vertex AI for financial document processing, saving 340+ analyst hours annually.",
        suggestions: ["Tell me about his credit risk work", "What's his flagship portfolio project?", "What ML frameworks does he use?", "Schedule an interview"]
      };
    }

    if (lowerInput.includes('fraud') || lowerInput.includes('anomaly')) {
      return {
        content: "Prajwal recalibrated anomaly detection models at JPMorgan using MLflow drift monitoring, cutting false positive transaction screening alerts from 18% to 11% across enterprise payment channels.",
        suggestions: ["Tell me about his credit risk work", "What's his biggest project?", "Schedule an interview"]
      };
    }

    if (lowerInput.includes('biggest project') || lowerInput.includes('most impactful') || lowerInput.includes('flagship') || lowerInput.includes('portfolio optimization')) {
      return {
        content: "His flagship personal project is a Quantitative Multi Asset Portfolio Optimization & Rebalancing Engine \u2014 a PyTorch covariance engine querying 6M+ tick level records in Snowflake, boosting portfolio Sharpe ratio from 1.15 to 1.82, and cutting rebalancing latency from 45 seconds to under 1.8 seconds across 500+ tickers.",
        suggestions: ["What tech did he use?", "Any other side projects?", "Tell me about his JPMorgan work", "Schedule an interview"]
      };
    }

    if (lowerInput.includes('schedule') || lowerInput.includes('book') || lowerInput.includes('meeting') || lowerInput.includes('interview')) {
      return {
        content: "I can help you schedule time with Prajwal \u2014 a 30-minute screening call to discuss background and fit, or a deeper technical conversation about his credit risk, RAG, or portfolio optimization work.",
        suggestions: ["Open calendar link", "Download his resume", "Tell me about his experience"]
      };
    }

    if (lowerInput.includes('resume') || lowerInput.includes('cv')) {
      return {
        content: "I can get you Prajwal's r\u00e9sum\u00e9 \u2014 it covers his JPMorgan Chase and Mphasis roles, the portfolio optimization project, and his full skill set (Python, PyTorch, XGBoost, LangChain, Snowflake, Databricks, and more).",
        suggestions: ["Download now", "Get LinkedIn profile link", "Tell me about his education"]
      };
    }

    if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack') || lowerInput.includes('framework')) {
      return {
        content: "Modeling: XGBoost, LightGBM, PyTorch, deep learning/CNNs. GenAI: LangChain, LlamaIndex, Hugging Face, RAG, vector search. Data & MLOps: Snowflake, Databricks, Apache Spark, Airflow, Kafka, MLflow, Docker, AWS. Languages: Python, SQL, C++, PySpark.",
        suggestions: ["Tell me about his credit risk work", "What about his RAG platform?", "Tell me about his education", "Schedule an interview"]
      };
    }

    if (lowerInput.includes('education') || lowerInput.includes('degree') || lowerInput.includes('gpa') || lowerInput.includes('university')) {
      return {
        content: "Prajwal holds an MS in Data Science from the University of Texas at Arlington (4.0/4.0 GPA, May 2025), and a BE in Electronics & Communication Engineering from M.S. Ramaiah Institute of Technology in Bengaluru, India.",
        suggestions: ["Tell me about his experience", "What skills does he have?", "Schedule an interview"]
      };
    }

    if (lowerInput.includes('fina')) {
      return {
        content: "Fina is a side project \u2014 an AI-powered credit risk & advisory system combining RAG and explainable ML (SHAP visualizations) for conversational credit risk assessment. Built with Python and Streamlit.",
        suggestions: ["Tell me about VibeSync", "What's his flagship project?", "Any other side projects?"]
      };
    }

    if (lowerInput.includes('vibesync') || lowerInput.includes('music')) {
      return {
        content: "VibeSync is a side project \u2014 an AI-driven music recommender that analyzes listening patterns and mood signals to generate personalized playlists, built with Python, deep learning, and the Spotify API.",
        suggestions: ["Tell me about Fina", "What's his flagship project?", "Any other side projects?"]
      };
    }

    if (lowerInput.includes('forecast') || lowerInput.includes('etl') || lowerInput.includes('spark') || lowerInput.includes('mphasis')) {
      return {
        content: "At Mphasis, Prajwal improved revenue-forecast accuracy from 74% to 89%, migrated batch ETL workflows to Apache Spark (cutting processing time for 40M+ monthly records from 11 hours to under 3), and lifted qualified-lead conversion from 12% to 19% via customer segmentation.",
        suggestions: ["Tell me about his JPMorgan work", "What's his flagship project?", "Schedule an interview"]
      };
    }

    // Default response
    return {
      content: "I can tell you about Prajwal's work at JPMorgan Chase and Mphasis, his portfolio optimization project, his skill set, or help you schedule time with him. What would you like to know?",
      suggestions: ["Tell me about his experience", "What's his biggest project impact?", "Schedule an interview", "Download his resume"]
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    const lowerSuggestion = suggestion.toLowerCase();
    
    // Handle direct actions
    if (lowerSuggestion.includes('download now')) {
      const link = document.createElement('a');
      link.href = '/Prajwal_Venkatesh_Resume_.pdf';
      link.download = 'Prajwal_Venkatesh_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    
    if (lowerSuggestion.includes('get linkedin profile') || lowerSuggestion.includes('linkedin profile link')) {
      window.open('https://www.linkedin.com/in/prajwal-venkat-v-9654a5180', '_blank');
      return;
    }
    
    if (lowerSuggestion.includes('book 30-min') || lowerSuggestion.includes('book 60-min') || 
        lowerSuggestion.includes('open calendar') || lowerSuggestion.includes('schedule technical interview') ||
        lowerSuggestion.includes('get his calendar link') || lowerSuggestion.includes('open calendar now')) {
      window.open('https://calendly.com/prajwalvenkatv/30min', '_blank');
      return;
    }
    
    // For all other suggestions, send as regular message to get AI response
    handleSendMessage(suggestion);
  };

      const handleQuickAction = (action: string) => {
    switch (action) {
      case 'schedule': {
        window.open('https://calendly.com/prajwalvenkatv/30min', '_blank');
        break;
      }
      case 'resume': {
        const link = document.createElement('a');
        link.href = '/Prajwal_Venkatesh_Resume_.pdf';
        link.download = 'Prajwal_Venkatesh_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      }
      case 'voice': {
        alert('Voice assistant feature coming soon!');
        break;
      }
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full w-16 h-16 bg-gradient-hero hover:shadow-glow transition-all duration-300 glow-primary pulse-glow"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50 animate-scale-in">
          <Card className="glass glow-primary shadow-elevation">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center glow-primary">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Prajwal's AI Assistant</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-xs text-muted-foreground">Online</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="hover-glow"
                >
                  ✕
                </Button>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex gap-2 pt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="glass text-xs"
                  onClick={() => handleQuickAction('schedule')}
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  Interview
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="glass text-xs"
                  onClick={() => handleQuickAction('resume')}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Resume
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="glass text-xs"
                  onClick={() => handleQuickAction('voice')}
                >
                  <Mic className="h-3 w-3 mr-1" />
                  Voice
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Messages */}
              <div className="max-h-80 overflow-y-auto space-y-4 pr-2">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-gradient-hero' 
                            : 'bg-gradient-hero'
                        }`}>
                          {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className={`p-3 rounded-2xl ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-card glass'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* AI Suggestions */}
                    {message.type === 'ai' && message.suggestions && (
                      <div className="flex flex-wrap gap-2 ml-10">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="text-xs glass hover-glow"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-card glass p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about experience, projects, or schedule interview..."
                  className="glass"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(inputValue);
                    }
                  }}
                />
                <Button 
                  size="sm"
                  className="bg-gradient-hero hover:shadow-glow"
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground text-center">
                AI Assistant • Powered by intelligent responses
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AIChat;