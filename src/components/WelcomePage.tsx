import React from 'react';
import { Activity, Droplets, Brain, Apple } from 'lucide-react';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 animate-pulse" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-6">
            Your Journey to Wellness
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your life with AI-powered insights, personalized nutrition tracking, and a supportive community.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full 
            text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Start Your Health Journey
          </button>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[Activity, Droplets, Brain, Apple].map((Icon, index) => (
            <Icon
              key={index}
              className={`absolute text-indigo-500/20 animate-float-${index + 1}`}
              size={48}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${index * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Activity,
            title: 'Track Progress',
            description: 'Monitor your health journey with intuitive tracking tools.',
          },
          {
            icon: Brain,
            title: 'AI Insights',
            description: 'Get personalized recommendations powered by artificial intelligence.',
          },
          {
            icon: Droplets,
            title: 'Stay Hydrated',
            description: 'Smart reminders to keep you hydrated throughout the day.',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Quote Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <blockquote className="text-3xl font-light italic mb-8">
            "Eat well. Live well. Be well."
          </blockquote>
          <p className="text-xl opacity-90">Start your transformation today</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;