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
    
    // Handle experience questions - focus on data analysis and business impact
    if (lowerInput.includes('experience') || lowerInput.includes('work experience') || lowerInput.includes('tell me about prajwal\'s experience')) {
      return {
        content: "Prajwal is a strategic Data Analyst with proven business impact - he delivered $1.6M in cost savings through fraud detection analytics, boosted operational efficiency by 20% analyzing 800+ student records, and reduced manual processes saving 15 analyst hours weekly. He specializes in SQL, Python, Power BI/Tableau for executive reporting and data-driven decision making.",
        suggestions: ["What business problems has he solved?", "Tell me about his analytical tools", "Show me his dashboard work", "What cost savings has he achieved?"]
      };
    }
    
    // Handle ML experience questions separately for those interested in ML aspects
    if (lowerInput.includes('ml experience') || lowerInput.includes('machine learning experience') || lowerInput.includes('tell me about prajwal\'s ml')) {
      return {
        content: "Prajwal applies ML for business solutions: fraud detection models (improved AUC-ROC from 0.81 to 0.89 preventing $1.6M losses), credit risk scoring (F1=0.80), and automated classification systems. He focuses on practical ML applications that drive measurable business outcomes rather than theoretical research.",
        suggestions: ["How does he apply ML to business problems?", "Tell me about the fraud detection ROI", "What about his analytical approach?", "Show me his recent projects"]
      };
    }
    
    // Handle biggest project impact questions
    if (lowerInput.includes('biggest project') || lowerInput.includes('project impact') || lowerInput.includes('most impactful')) {
      return {
        content: "His most impactful project is the fraud detection system at Valley Infosystems that prevented $1.6M+ in annual fraud losses. Working on 3M+ transactions, he improved the AUC-ROC from 0.81 to 0.89, reduced false positives by 18%, and cut fraud response time by 10% using anomaly detection models.",
        suggestions: ["How does the fraud detection work?", "What technologies did he use?", "Tell me about his other projects", "What about his current research?"]
      };
    }
    
    // Handle scheduling questions
    if (lowerInput.includes('schedule an interview') || lowerInput.includes('book') || lowerInput.includes('meeting') || lowerInput.includes('interview')) {
      return {
        content: "Perfect! I can help you schedule an interview with Prajwal. He's available for technical interviews, behavioral interviews, or informal chats. Would you prefer a 30-minute screening call to discuss his background and fit, or a 60-minute technical deep dive with his fraud detection and research projects?",
        suggestions: ["Book 30-min screening", "Book 60-min technical interview", "Get his calendar link", "What to expect in interview?"]
      };
    }
    
    // Handle resume download questions
    if (lowerInput.includes('download his resume') || lowerInput.includes('resume') || lowerInput.includes('cv')) {
      return {
        content: "I can provide Prajwal's latest resume! It's ATS-optimized and includes his verified achievements: $1.6M fraud prevention, 30% reduction in manual reviews, and research acceleration by 15%. The resume highlights his technical skills in SQL, Python, Power BI/Tableau, and ML frameworks.",
        suggestions: ["Download PDF resume", "Get LinkedIn profile", "Show skill breakdown", "Tell me about his education"]
      };
    }
    
    // Handle specific follow-up questions
    if (lowerInput.includes('ml frameworks') || lowerInput.includes('what ml frameworks')) {
      return {
        content: "Prajwal uses multiple ML frameworks based on his resume: Python with NumPy, Pandas, Scikit-learn for research pipelines, and has experience with classification and regression models. He's also worked with Power BI (DAX) and Tableau for visualization, plus SQL and Snowflake for data processing.",
        suggestions: ["What about his Python experience?", "Tell me about his data visualization skills", "What databases does he use?", "Any cloud certifications?"]
      };
    }
    
    if (lowerInput.includes('model performance') || lowerInput.includes('performance metrics')) {
      return {
        content: "Here are Prajwal's verified model performance metrics: Fraud Detection (improved AUC-ROC from 0.81 to 0.89, reduced false positives by 18%), Fina Credit Risk System (F1-score = 0.80), and Botanical Image Classification (80.9% accuracy improvement from 58%). His work prevented $1.6M in annual fraud losses.",
        suggestions: ["How did he improve the AUC-ROC?", "Tell me about the Fina project", "What validation methods did he use?", "Any other achievements?"]
      };
    }
    
    if (lowerInput.includes('ai projects') || lowerInput.includes('artificial intelligence') || lowerInput.includes('recent projects')) {
      return {
        content: "Prajwal's recent AI projects include: 1) Fina: AI-powered Credit Risk System with RAG, XGBoost, and Streamlit (F1=0.80, 30% reduction in manual reviews), 2) VibeSync: Mood-driven Music Recommender using NLP and Spotify API (28% user engagement increase), and 3) Botanical Image Classification using CNN (80.9% accuracy).",
        suggestions: ["Tell me about the Fina system", "How does VibeSync work?", "What about his fraud detection work?", "Any research projects?"]
      };
    }
    
    if (lowerInput.includes('biggest ml achievement') || lowerInput.includes('ml achievement')) {
      return {
        content: "Prajwal's biggest ML achievement is building the fraud detection system at Valley Infosystems that saved $1.6M+ annually. He improved the AUC-ROC from 0.81 to 0.89, reduced false positives by 18%, and deployed Power BI dashboards with SHAP explainability that helped analysts triage 13% faster.",
        suggestions: ["How does the fraud system work?", "What's SHAP explainability?", "Tell me about his current research", "What other projects has he worked on?"]
      };
    }
    
    if (lowerInput.includes('how does the fraud detection work') || lowerInput.includes('fraud detection work') || lowerInput.includes('fraud detection achievement') || lowerInput.includes('fraud prevention details')) {
      return {
        content: "The fraud detection system uses anomaly detection models deployed on 3M+ transactions. Prajwal collaborated with risk management teams to improve AUC-ROC from 0.81 to 0.89, established data governance frameworks, and created Power BI dashboards with SHAP explainability for prioritized alert queues.",
        suggestions: ["What is SHAP explainability?", "How did he improve the AUC-ROC?", "Tell me about the data governance", "What technologies were used?"]
      };
    }
    
    if (lowerInput.includes('technologies did he use') || lowerInput.includes('what technologies')) {
      return {
        content: "Based on his experience, Prajwal uses: Python (NumPy, Pandas, Scikit-learn), SQL and Snowflake for data mining, Power BI with DAX and Tableau for visualization, ETL pipelines for automation, and cloud platforms (AWS Cloud Practitioner certified, Oracle Cloud expected Oct 2025).",
        suggestions: ["What about his research tools?", "Tell me about his certifications", "Any specific databases?", "What visualization tools?"]
      };
    }
    
    // Handle quick actions
    if (lowerInput.includes('book 30-min') || lowerInput.includes('30-min screening')) {
      return {
        content: "Great choice! A 30-minute screening call is perfect for discussing Prajwal's background, including his fraud detection work ($1.6M savings), current research role, and your team's needs. You can explore his experience with SQL, Python, ML frameworks, and data visualization tools.",
        suggestions: ["Open calendar link", "What should I prepare?", "Can we discuss specific projects?", "What about technical questions?"]
      };
    }
    
    if (lowerInput.includes('60-min technical') || lowerInput.includes('technical deep dive') || lowerInput.includes('book 60-min')) {
      return {
        content: "Excellent! A 60-minute technical interview allows deep discussion of his fraud detection system (AUC-ROC improvement 0.81→0.89), research work with ML pipelines, Fina credit risk system, and VibeSync recommender. Perfect for exploring his Python, SQL, and ML expertise in detail.",
        suggestions: ["Schedule technical interview", "What projects should we discuss?", "Any coding challenges?", "Can he demo his work?"]
      };
    }
    
    if (lowerInput.includes('calendar link') || lowerInput.includes('get his calendar')) {
      return {
        content: "I'll open Prajwal's calendar for you! He's currently a Research Assistant at UT Arlington and available for interviews. The calendar shows his availability for both screening calls and technical deep dives, with options for different time zones.",
        suggestions: ["Open calendar now"]
      };
    }
    
    if (lowerInput.includes('download pdf') || lowerInput.includes('download pdf resume')) {
      return {
        content: "Perfect! Prajwal's PDF resume includes his verified achievements: $1.6M fraud prevention, 4.0 GPA in Data Science MS, AWS Cloud Practitioner certification, and detailed project metrics including F1-scores and accuracy improvements. It's formatted for ATS systems.",
        suggestions: ["Download now", "Get LinkedIn profile link", "Tell me about his education", "What certifications does he have?"]
      };
    }
    
    // Handle general experience/background questions
    if (lowerInput.includes('experience') || lowerInput.includes('background')) {
      return {
        content: "Prajwal is currently a Research Assistant at UT Arlington (Jul 2025-Present) with previous experience as Data Analyst GTA and Data Scientist at Valley Infosystems. He has a 4.0 GPA MS in Data Science and delivered $1.6M+ in fraud prevention while working with SQL, Python, and ML frameworks.",
        suggestions: ["Tell me about his current research", "What about his fraud detection work?", "Show me his education details", "What skills does he have?"]
      };
    }
    
    if (lowerInput.includes('skills') || lowerInput.includes('tech') || lowerInput.includes('stack')) {
      return {
        content: "Prajwal's technical skills include: Programming (SQL, Python, R), Data Visualization (Power BI with DAX, Tableau, Excel), ML & Stats (Regression, Classification, A/B Testing), and Cloud (AWS Cloud Practitioner certified, Oracle Cloud expected Oct 2025). He also has project management and cross-functional collaboration experience.",
        suggestions: ["Tell me about his Python experience", "What databases does he use?", "Any ML certifications?", "What about his research skills?"]
      };
    }
    if (lowerInput.includes('what business problems has he solved') || lowerInput.includes('business problems')) {
      return {
        content: "Prajwal has solved critical business problems: 1) Fraud Prevention - saved $1.6M annually by improving detection accuracy (AUC-ROC 0.81→0.89), 2) Operational Efficiency - boosted efficiency 20% analyzing student records, saved 15 analyst hours weekly through automation, 3) Decision Making - created real-time KPI dashboards improving engagement 25%, 4) Risk Management - built credit risk system reducing manual reviews 30%.",
        suggestions: ["Tell me about the fraud prevention details", "What dashboards has he built?", "Book interview"]
      };
    }
    
    if (lowerInput.includes('tell me about his analytical tools') || lowerInput.includes('analytical tools') || lowerInput.includes('what tools does he use')) {
      return {
        content: "Prajwal's analytical toolkit includes: SQL & Snowflake for data mining (reduced query time 15 min→3 min), Python with NumPy/Pandas/Scikit-learn for analysis, Power BI with DAX for executive reporting, Tableau for real-time KPI dashboards, Excel with Power Query/VLOOKUP/Pivot Tables for business analysis, and ETL pipelines for automation.",
        suggestions: ["Tell me about his SQL skills", "What about his Python experience?", "How does he use Power BI?", "Schedule interview"]
      };
    }
    
    if (lowerInput.includes('show me his dashboard work') || lowerInput.includes('dashboard work') || lowerInput.includes('what dashboards has he built')) {
      return {
        content: "Prajwal built impactful dashboards: 1) Real-time KPI dashboards in Tableau (boosted student engagement 25%), 2) Power BI risk dashboards with SHAP explainability (helped analysts triage 13% faster), 3) Executive reporting dashboards for operational insights, 4) Prioritized alert queues for fraud detection. All focus on actionable business insights.",
        suggestions: ["What is SHAP explainability?", "Tell me about his Power BI skills", "How does he create executive reports?", "Book interview"]
      };
    }

    if (lowerInput.includes('what cost savings has he achieved') || lowerInput.includes('cost savings') || lowerInput.includes('savings achieved')) {
      return {
        content: "Prajwal delivered significant cost savings: $1.6M+ annual fraud prevention through improved detection models, 15 analyst hours saved weekly through process automation, 20% operational efficiency gains through data analysis, and reduced manual reviews by 30% in credit risk systems. His work consistently translates data insights into measurable business value.",
        suggestions: ["How did he achieve the $1.6M savings?", "Tell me about the automation he built", "What other business impacts?", "Schedule interview"]
      };
    }
    
    if (lowerInput.includes('what should i prepare') || lowerInput.includes('what to prepare')) {
      return {
        content: "For the interview, prepare to discuss: 1) Your specific business challenges and how Prajwal's fraud detection ($1.6M savings) or analytics experience could help, 2) Questions about his SQL/Python skills for your data infrastructure, 3) His experience with Power BI/Tableau for your reporting needs, 4) Timeline and team structure for the role.",
        suggestions: ["Book interview now", "Tell me about his SQL experience", "What dashboards has he built?", "Get his resume"]
      };
    }
    
    if (lowerInput.includes('tell me about his certifications') || lowerInput.includes('certification details') || lowerInput.includes('any certifications')) {
      return {
        content: "Prajwal holds AWS Cloud Practitioner certification (verified) and is expecting Oracle Cloud Infrastructure Foundations Associate certification in October 2025. He also has a perfect 4.0 GPA in his Master of Science in Data Science from UT Arlington, with coursework in Big Data & Cloud Computing (Azure).",
        suggestions: ["Download his resume", "Tell me about his cloud experience", "What about his education?", "Book interview"]
      };
    }
    
    if (lowerInput.includes('any other achievements') || lowerInput.includes('show me more achievements') || lowerInput.includes('other accomplishments')) {
      return {
        content: "Additional achievements: Boosted student engagement 25% with real-time KPI dashboards, improved assessment outcomes 40% through 12+ workshops to 80+ participants, accelerated research cycles by 15% analyzing 30+ ML papers, and reduced query time from 15 minutes to 3 minutes using SQL/Snowflake optimization.",
        suggestions: ["Tell me about his dashboard work", "What workshops did he deliver?", "How does he optimize queries?", "Schedule interview"]
      };
    }
    
    if (lowerInput.includes('how does he use snowflake') || lowerInput.includes('snowflake experience') || lowerInput.includes('tell me about snowflake')) {
      return {
        content: "In his current Research Assistant role, Prajwal uses SQL and Snowflake for efficient data mining, achieving a dramatic improvement in query performance - reducing average query time from 15 minutes to 3 minutes. This optimization improved data governance and supported his team's ML algorithm testing workflows.",
        suggestions: ["What other databases does he use?", "Tell me about his SQL skills", "How does he handle data governance?", "Book technical interview"]
      };
    }
    if (lowerInput.includes('fina') || lowerInput.includes('credit risk')) {
      return {
        content: "Fina is Prajwal's AI-powered Credit Risk & Advisory System built with Python, RAG, XGBoost, and Streamlit. For FHL bank, it achieved F1-score of 0.80, flagged the top 2% of risky loans, cut manual reviews by 30%, and reduced evaluation time by 15% with 12% faster decision turnaround.",
        suggestions: ["How does the RAG system work?", "What's the XGBoost model doing?", "Tell me about SHAP integration", "Any other recent projects?"]
      };
    }
    
    if (lowerInput.includes('vibesync') || lowerInput.includes('music recommender')) {
      return {
        content: "VibeSync is Prajwal's mood-driven music recommender built with Python, NLP, and Spotify API. It uses KNN algorithms for sentiment-to-music matching and achieved 28% increase in user engagement with 40%+ engagement lift through emotion-aware time-series data analytics.",
        suggestions: ["How does the NLP sentiment analysis work?", "What's the KNN algorithm doing?", "Tell me about the Spotify API integration", "Any other ML projects?"]
      };
    }
    
    if (lowerInput.includes('research') || lowerInput.includes('research assistant') || lowerInput.includes('current work')) {
      return {
        content: "As a Research Assistant at UT Arlington (Jul 2025-Present), Prajwal accelerated research cycles by 15% by analyzing 30+ ML papers. He built Python experiment pipelines with automated evaluation, reducing validation errors from 20 to 5 per project, and used SQL/Snowflake to reduce query time from 15 minutes to 3 minutes.",
        suggestions: ["What ML papers is he analyzing?", "Tell me about the experiment pipelines", "How does he use Snowflake?", "What research frameworks?"]
      };
    }
    
    // Default response with more helpful suggestions
    return {
      content: "I can help you learn more about Prajwal's experience, current research work, verified projects, or schedule an interview. He's currently a Research Assistant at UT Arlington with proven results in fraud detection and ML systems. What would you like to know?",
      suggestions: ["Schedule interview", "Tell me about his current research", "His fraud detection achievement", "Recent AI projects"]
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
      case 'schedule':
        window.open('https://calendly.com/prajwalvenkatv/30min', '_blank');
        break;
      case 'resume':
        const link = document.createElement('a');
        link.href = '/Prajwal_Venkatesh_Resume_.pdf';
        link.download = 'Prajwal_Venkatesh_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case 'voice':
        // Voice assistant will be connected when Supabase is integrated
        alert('Voice assistant feature coming soon!');
        break;
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full w-16 h-16 bg-gradient-ai hover:shadow-ai-glow transition-all duration-300 glow-ai pulse-glow"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50 animate-scale-in">
          <Card className="glass glow-ai shadow-elevation">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-ai rounded-full flex items-center justify-center glow-ai">
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
                            : 'bg-gradient-ai'
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
                      <div className="w-8 h-8 bg-gradient-ai rounded-full flex items-center justify-center">
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