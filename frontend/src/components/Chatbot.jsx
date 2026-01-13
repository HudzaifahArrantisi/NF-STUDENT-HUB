import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaTrash, FaGraduationCap, FaUser, FaCode, FaChartLine, FaPalette, FaGlobe, FaBook, FaBriefcase, FaHeart, FaExclamationTriangle } from 'react-icons/fa';
import api from '../services/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [apiStatus, setApiStatus] = useState('unknown'); // 'unknown', 'healthy', 'error'
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Cek status API saat component mount
  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      await api.get('/api/chatbot/health');
      setApiStatus('healthy');
    } catch (error) {
      setApiStatus('error');
      console.error('API health check failed:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Tambah pesan user ke state
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await api.post('/api/chatbot/chat', {
        message: userMessage,
        conversationId: conversationId
      });

      if (response.data.success) {
        // Update conversationId jika baru
        if (!conversationId) {
          setConversationId(response.data.conversationId);
        }
        
        // Update messages dengan history terbaru dari backend
        setMessages(response.data.history);
        setApiStatus('healthy');
      } else {
        throw new Error(response.data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Tampilkan error message yang lebih spesifik
      let errorContent = 'Maaf, sedang ada gangguan teknis. ';
      
      if (error.response?.status === 502) {
        errorContent += 'Layanan AI sedang tidak tersedia. Silakan coba lagi nanti.';
      } else if (error.response?.status === 503) {
        errorContent += 'Server sedang sibuk. Silakan coba beberapa saat lagi.';
      } else {
        errorContent += 'Silakan refresh halaman dan coba lagi.';
      }
      
      const errorMessage = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date().toISOString(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setApiStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    if (conversationId) {
      try {
        await api.delete(`/api/chatbot/history/${conversationId}`);
      } catch (error) {
        console.error('Error clearing chat:', error);
      }
    }
    
    setMessages([]);
    setConversationId(null);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatMessage = (content) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Check for bold text (surrounded by **)
      const boldRegex = /\*\*(.*?)\*\*/g;
      let elements = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        // Add text before bold
        if (match.index > lastIndex) {
          elements.push(line.slice(lastIndex, match.index));
        }
        // Add bold text
        elements.push(
          <strong key={elements.length} className="font-semibold text-gray-800">
            {match[1]}
          </strong>
        );
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (lastIndex < line.length) {
        elements.push(line.slice(lastIndex));
      }
      
      if (elements.length === 0) {
        elements.push(line);
      }
      
      return (
        <div key={index} className="mb-1 leading-relaxed">
          {elements}
        </div>
      );
    });
  };

  // Suggested questions yang lebih spesifik
  const suggestedTopics = [
    {
      category: "💻 Programming Help",
      icon: FaCode,
      color: "from-blue-500 to-cyan-500",
      questions: [
        "Jelaskan perbedaan let, const, dan var dalam JavaScript",
        "Bagaimana cara membuat REST API dengan Node.js?",
        "Apa itu React hooks dan contoh penggunaannya?",
        "Cara fix error 'undefined is not a function'"
      ]
    },
    {
      category: "📚 Math & Science",
      icon: FaBook,
      color: "from-green-500 to-emerald-500",
      questions: [
        "Jelaskan integral dan turunan dengan contoh",
        "Bagaimana menyelesaikan persamaan kuadrat?",
        "Apa perbedaan kinetik dan potensial energy?",
        "Cara menghitung probabilitas dalam statistik"
      ]
    },
    {
      category: "🎓 Academic Help",
      icon: FaGraduationCap,
      color: "from-purple-500 to-pink-500",
      questions: [
        "Bagaimana struktur paper akademik yang baik?",
        "Cara membuat presentasi yang efektif",
        "Tips manajemen waktu untuk mahasiswa",
        "Cara menulis abstract untuk penelitian"
      ]
    },
    {
      category: "💡 Creative & Ideas",
      icon: FaPalette,
      color: "from-orange-500 to-red-500",
      questions: [
        "Buatkan ide project programming untuk pemula",
        "Cerita pendek tentang teknologi masa depan",
        "Ide nama untuk aplikasi mobile",
        "Desain sistem untuk manajemen tugas kampus"
      ]
    }
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  // Quick actions buttons
  const quickActions = [
    {
      icon: FaCode,
      label: "Programming",
      question: "Jelaskan cara kerja async/await dalam JavaScript dengan contoh",
      color: "hover:border-blue-400 hover:text-blue-600"
    },
    {
      icon: FaBook,
      label: "Mathematics", 
      question: "Bagaimana menyelesaikan sistem persamaan linear tiga variabel?",
      color: "hover:border-green-400 hover:text-green-600"
    },
    {
      icon: FaPalette,
      label: "Creative",
      question: "Buatkan puisi tentang kecerdasan buatan",
      color: "hover:border-purple-400 hover:text-purple-600"
    },
    {
      icon: FaBriefcase,
      label: "Academic",
      question: "Bagaimana cara menulis literature review yang baik?",
      color: "hover:border-orange-400 hover:text-orange-600"
    }
  ];

  return (
    <>
      {/* Floating Chat Button dengan status indicator */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-3xl transition-all duration-300 z-40 hover:scale-110 group"
        aria-label="Buka AI Assistant"
      >
        <FaRobot className="text-xl group-hover:scale-110 transition-transform" />
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          apiStatus === 'healthy' ? 'bg-green-500' : 
          apiStatus === 'error' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
        }`}>
          {apiStatus === 'healthy' ? '✓' : apiStatus === 'error' ? '!' : '?'}
        </div>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chat Container */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[85vh] flex flex-col z-10 border border-gray-200">
            {/* Header dengan status indicator */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaRobot className="text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">NF Assistant</h3>
                  <div className="flex items-center space-x-2 text-xs opacity-90">
                    <span>AI Assistant Universal</span>
                    <div className={`w-2 h-2 rounded-full ${
                      apiStatus === 'healthy' ? 'bg-green-400' : 
                      apiStatus === 'error' ? 'bg-red-400 animate-pulse' : 'bg-yellow-400'
                    }`}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {apiStatus === 'error' && (
                  <div className="flex items-center space-x-1 text-yellow-200 text-xs">
                    <FaExclamationTriangle />
                    <span>Limited</span>
                  </div>
                )}
                <button
                  onClick={clearChat}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors tooltip"
                  title="Hapus Percakapan"
                >
                  <FaTrash className="text-sm" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.length === 0 ? (
                <div className="text-center text-gray-600 h-full flex flex-col justify-center">
                  <div className="mb-6">
                    <FaRobot className="text-6xl mx-auto mb-4 text-blue-400" />
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">Halo! Saya NF Assistant</h3>
                    <p className="text-sm mb-2">Asisten AI universal untuk membantu semua pertanyaan Anda</p>
                    
                    {apiStatus === 'error' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-md mx-auto mb-4">
                        <div className="flex items-center space-x-2 text-yellow-800 text-sm">
                          <FaExclamationTriangle />
                          <span>Sedang dalam mode terbatas. Beberapa fitur mungkin tidak tersedia.</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {quickActions.map((action, index) => (
                      <button 
                        key={index}
                        onClick={() => handleQuickQuestion(action.question)}
                        className={`flex items-center justify-center space-x-2 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 ${action.color}`}
                      >
                        <action.icon className="text-lg" />
                        <span className="text-sm font-medium">{action.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Topics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {suggestedTopics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${topic.color} flex items-center justify-center text-white`}>
                            <topic.icon className="text-sm" />
                          </div>
                          <h4 className="font-semibold text-gray-800 text-sm">{topic.category}</h4>
                        </div>
                        <div className="space-y-2">
                          {topic.questions.map((question, qIndex) => (
                            <button
                              key={qIndex}
                              onClick={() => handleQuickQuestion(question)}
                              className="text-left w-full p-2 text-xs text-gray-600 hover:bg-blue-50 rounded-lg transition-colors hover:text-blue-600 border border-transparent hover:border-blue-200"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} space-x-3`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 shadow-sm">
                        <FaRobot />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none shadow-md'
                          : message.isError
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-white border border-gray-200 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">
                        {formatMessage(message.content)}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 shadow-sm">
                        <FaUser />
                      </div>
                    )}
                  </div>
                ))
              )}
              
              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 shadow-sm">
                    <FaRobot />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 max-w-[85%] shadow-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs">NF Assistant sedang mengetik...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form 
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 bg-white rounded-b-2xl"
            >
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Tanyakan apa saja... (programming, matematika, bisnis, kreativitas, dll.)"
                  className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      handleSendMessage(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:scale-105 hover:shadow-md"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  NF Assistant • Powered by AI • Bisa tanya semua topik
                </p>
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <FaHeart className="text-red-400" />
                  <span>NF Student HUB</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;