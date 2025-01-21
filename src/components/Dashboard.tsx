import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Droplets, 
  Apple, 
  Dumbbell,
  TrendingUp,
  Award,
  Brain,
  Heart,
  Moon,
  Sun,
  Utensils,
  Scale,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const mockWeeklyData = [
  { day: 'Mon', calories: 2100, water: 2.5, steps: 8000 },
  { day: 'Tue', calories: 1950, water: 2.2, steps: 10000 },
  { day: 'Wed', calories: 2200, water: 2.8, steps: 7500 },
  { day: 'Thu', calories: 1850, water: 2.0, steps: 9000 },
  { day: 'Fri', calories: 2300, water: 2.7, steps: 11000 },
  { day: 'Sat', calories: 2000, water: 2.4, steps: 6000 },
  { day: 'Sun', calories: 1900, water: 2.1, steps: 8500 },
];

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showMealPlanner, setShowMealPlanner] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'activity', label: 'Activity', icon: Dumbbell },
    { id: 'sleep', label: 'Sleep', icon: Moon },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header with Greeting and Time-based Message */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, Sarah!</h1>
            <p className="text-gray-600 mt-1">Let's make today count! 💪</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <Sun className="h-6 w-6 text-yellow-500" />
              <span className="text-lg font-medium">Good Morning</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg ${
                selectedTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              } shadow-md transition-all duration-200`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { 
            icon: Apple, 
            title: 'Calories', 
            value: '1,200', 
            target: '2,000',
            color: 'from-green-500 to-emerald-600',
            percentage: 60
          },
          { 
            icon: Droplets, 
            title: 'Water', 
            value: '1.5L', 
            target: '2.5L',
            color: 'from-blue-500 to-cyan-600',
            percentage: 75
          },
          { 
            icon: Activity, 
            title: 'Steps', 
            value: '5,432', 
            target: '10,000',
            color: 'from-purple-500 to-indigo-600',
            percentage: 54
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={stat.percentage}
                  text={`${stat.percentage}%`}
                  styles={buildStyles({
                    pathColor: `url(#${stat.title}Gradient)`,
                    textColor: '#6366f1',
                    trailColor: '#e2e8f0'
                  })}
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">{stat.title}</p>
              <p className="text-sm text-gray-500">Target: {stat.target}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg mb-8"
      >
        <h2 className="text-xl font-bold mb-6">Weekly Progress</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockWeeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="calories"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ fill: '#6366f1' }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="water"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ fill: '#0ea5e9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg mb-8"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Brain className="h-6 w-6 mr-2 text-purple-600" />
          AI Insights
        </h2>
        <div className="space-y-4">
          {[
            {
              text: 'Add more protein to your lunch to maintain energy levels',
              icon: Utensils,
              color: 'text-green-600',
              bg: 'bg-green-50'
            },
            {
              text: 'You\'re 20% short of your daily water goal',
              icon: Droplets,
              color: 'text-blue-600',
              bg: 'bg-blue-50'
            },
            {
              text: 'Your sleep pattern shows improvement this week',
              icon: Moon,
              color: 'text-purple-600',
              bg: 'bg-purple-50'
            }
          ].map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start p-4 ${insight.bg} rounded-lg`}
            >
              <insight.icon className={`h-5 w-5 ${insight.color} mt-0.5 mr-3`} />
              <p className="text-gray-700">{insight.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Award className="h-6 w-6 mr-2 text-indigo-600" />
          Recent Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Hydration Hero',
              description: 'Reached water goal 7 days in a row',
              icon: Droplets,
              color: 'text-blue-600',
              bg: 'bg-blue-50'
            },
            {
              title: 'Perfect Week',
              description: 'Completed all daily goals',
              icon: Target,
              color: 'text-green-600',
              bg: 'bg-green-50'
            },
            {
              title: 'Early Bird',
              description: 'Workout completed before 8 AM',
              icon: Sun,
              color: 'text-yellow-600',
              bg: 'bg-yellow-50'
            }
          ].map((achievement, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className={`flex items-center p-4 ${achievement.bg} rounded-lg`}
            >
              <achievement.icon className={`h-5 w-5 ${achievement.color} mr-3`} />
              <div>
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* SVG Gradients */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="CaloriesGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="WaterGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="StepsGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Dashboard;