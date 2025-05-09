import React, { useEffect, useState } from 'react';
import { Shield, Terminal, Code, Phone, Mail, Instagram, Linkedin, Youtube, UserCircle, Trophy, Lock, ChevronDown, ChevronUp, AlertTriangle, Calendar, Clock, MapPin, QrCode } from 'lucide-react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';

const sanitizeEmail = (email) => {
  return email.replace(/\./g, '_dot_').replace(/@/g, '_at_');
};

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        const emailKey = sanitizeEmail(currentUser.email);

        // Fetch name
        const userRef = ref(db, `users/${emailKey}`);
        const userSnap = await get(userRef);

        const userData = userSnap.val();
        if (userSnap.exists()) {
          if (typeof userData === 'object' && userData.name) {
            setName(userData.name);
          } else if (typeof userData === 'string') {
            setName(userData);
          }
        }

        // Fetch score
        const scoreRef = ref(db, `scores/${emailKey}`);
        const scoreSnap = await get(scoreRef);
        if (scoreSnap.exists()) {
          setScore(scoreSnap.val());
        } else {
          setScore(0);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const rules = [
    'All participants must register before the event starts.',
    'Attacking the CTF infrastructure is strictly prohibited.',
    'The format of the flag to be discovered is: ISTEHITSC{flag...}.',
    'Sharing flags or solutions during the competition is not allowed.',
    'The organizing team decision is final in case of any disputes.',
    'Participants must bring their own laptops with necessary software installed.',
    'Participants should maintain ethical conduct throughout the event.',
  ];

  const guidelines = [
    'Arrive at least 15 minutes before the event starts for registration verification.',
    'Basic knowledge of Linux commands, networking, and web technologies is recommended.',
    'Take regular breaks and stay hydrated during the event.',
    'Ask volunteers for help if you are completely stuck on a challenge.'
  ];

  const contacts = [
    { name: 'Kunal Rajnish', year: '4th year', phone: '6204003785' },
    { name: 'Aayush Dutta', year: '4th year', phone: '7044139147' },
    { name: 'Pranav Aditya', year: '4th year', phone: '6206825782' },
  ];

  return (
    <div className="min-h-screen bg-transparent text-gray-800">
      
      {/* Add margin-top to account for fixed navbar */}
      <div className="pt-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-16">
          
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white p-3 border-2 border-red-500 flex items-center justify-center shadow-md">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <div className="w-16 h-16 rounded-full bg-white p-3 border-2 border-green-500 flex items-center justify-center shadow-md">
                <Terminal className="w-8 h-8 text-green-500" />
              </div>
              <div className="w-16 h-16 rounded-full bg-white p-3 border-2 border-blue-500 flex items-center justify-center shadow-md">
                <Code className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-2">
              <span className="text-gray-900">Exploit</span>
              <span className="text-slate-600">X</span>
            </h1>
            
            <div className="mt-3 max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-6">
                <span className="font-mono text-green-600">{">"}</span> Bootcamp & CTF (Capture The Flag) — a perfect blend of hands-on training and thrilling cybersecurity challenges!
              </p>
              
              <div className="inline-block border-2 border-purple-500 bg-purple-100 px-8 py-4 rounded-lg transform transition-transform hover:scale-105 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900">
                  INDIAN SOCIETY FOR TECHNICAL EDUCATION
                </h2>
                <p className="text-xl text-slate-600">HIT STUDENTS' CHAPTER</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="bg-gray-50 py-8 px-4">
          {loading ? (
            <div className="max-w-md mx-auto bg-white rounded-lg p-6 border border-gray-200 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="animate-pulse h-20 w-20 rounded-full bg-gray-200"></div>
              </div>
              <div className="animate-pulse h-6 bg-gray-200 rounded mb-3"></div>
              <div className="animate-pulse h-6 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
              <div className="animate-pulse h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          ) : !user ? (
            <div className="max-w-md mx-auto bg-white rounded-lg p-6 border border-gray-200 shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Lock className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-red-500 mb-3">Authentication Required</h3>
              <p className="text-gray-600 mb-2">You are not signed in.</p>
              <p className="text-gray-500">Sign in to view your profile and track your CTF score.</p>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white rounded-lg border border-green-500 shadow-lg p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 z-0"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <UserCircle className="h-24 w-24 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-mono">{`> User Profile`}</h3>
                
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <div className="bg-gray-50 rounded p-3 border border-gray-200">
                    <p className="font-mono text-green-600 text-sm mb-1">EMAIL</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded p-3 border border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="font-mono text-green-600 text-sm mb-1">SCORE</p>
                      <p className="text-gray-900">{score}</p>
                    </div>
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Event Details Section */}
        <div className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              <span className="font-mono text-green-600">&lt;</span> Event Details <span className="font-mono text-green-600">/&gt;</span>
            </h2>
            
            <div className="grid">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Event Schedule</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <Calendar className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">Main Event</p>
                        <p className="text-gray-600">5<sup>th</sup> - 7<sup>th</sup> May</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <Clock className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">Time</p>
                        <p className="text-gray-600">4:30 PM onwards</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <MapPin className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">Location</p>
                        <p className="text-gray-600">CSE-CS, 3<sup>rd</sup> floor</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <Calendar className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">Online Introduction Classes</p>
                        <p className="text-gray-600">2<sup>nd</sup> - 4<sup>th</sup> May</p>
                        <p className="text-gray-600">7:30 PM onwards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rules Section */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
              <span className="text-red-500">#</span> Rules & Regulations
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-red-500">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-red-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Competition Rules</h3>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {rules.map((rule, index) => (
                    (index===2) ? (
                      <li key={index} className="flex items-start">
                      <span className="font-mono text-red-500 mr-2 mt-0.5">§</span>
                      <span className="text-gray-700 font-bold">{rule}</span>
                    </li>
                    ):(
                      <li key={index} className="flex items-start">
                      <span className="font-mono text-red-500 mr-2 mt-0.5">§</span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                    )
                  ))}
                </ul>
                
                <div className={`transition-all duration-500 overflow-hidden ${expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="flex items-center mb-6">
                    <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Guidelines</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {guidelines.map((guideline, index) => (
                      <li key={index} className="flex items-start">
                        <span className="font-mono text-yellow-500 mr-2 mt-0.5">›</span>
                        <span className="text-gray-700">{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={() => setExpanded(!expanded)}
                  className="mt-6 flex items-center mx-auto text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {expanded 
                    ? <><ChevronUp className="h-5 w-5 mr-1" /> Show Less</> 
                    : <><ChevronDown className="h-5 w-5 mr-1" /> Show More</>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              <span className="font-mono text-green-600">@</span> For Queries Contact
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {contacts.map((contact, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-green-500 transition-all transform hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.name}</h3>
                  <p className="text-gray-500 mb-4">{contact.year}</p>
                  <a 
                    href={`tel:${contact.phone}`} 
                    className="flex items-center text-green-600 hover:text-green-700 transition-colors"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-2">Need more information?</p>
              <a 
                href="mailto:istehitsc@example.com" 
                className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                istehitsc@example.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-100 py-8 px-4 border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  <span className="text-purple-500">ISTE</span> HIT SC
                </h2>
                <p className="text-gray-600 text-sm">Indian Society for Technical Education</p>
                <p className="text-gray-600 text-sm">Haldia Institute of Technology Students' Chapter</p>
              </div>
              
              <div className="flex space-x-6">
                {[
                  { href: 'https://instagram.com/iste.hit.sc', icon: <Instagram className="h-6 w-6" />, label: 'iste.hit.sc' },
                  { href: 'https://linkedin.com/company/iste-hit-sc', icon: <Linkedin className="h-6 w-6" />, label: 'iste-hit-sc' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <div className="bg-white p-3 rounded-full hover:bg-gray-200 transition-colors shadow-sm">
                      {social.icon}
                    </div>
                    <span className="mt-2 text-sm">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} ISTE HIT Students' Chapter. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;