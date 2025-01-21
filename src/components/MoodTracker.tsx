import React, { useState } from 'react';
import { motion , AnimatePresence} from 'framer-motion';
import {
  Smile,
  Meh,
  Frown,
  TrendingUp,
  Calendar,
  Activity,
  Brain,
  Coffee,
  Sun,
  Moon
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MoodEntry {
  id: string;
  mood: 'happy' | 'neutral' | 'sad';
  energy: number;
  sleep: number;
  water: number;
  notes: string;
  timestamp: string;
}

const mockMoodData = [
  { date: 'Mon', mood: 3, water: 8, sleep: 7 },
  { date: 'Tue', mood: 4, water: 6, sleep: 8 },
  { date: 'Wed', mood: 5, water: 9, sleep: 7.5 },
  { date: 'Thu', mood: 3, water: 5, sleep: 6 },
  { date: 'Fri', mood: 4, water: 7, sleep: 8 },
  { date: 'Sat', mood: 5, water: 8, sleep: 9 },
  { date: 'Sun', mood: 4, water: 7, sleep: 7.5 },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<MoodEntry['mood'] | null>(null);
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState(7);
  const [water, setWater] = useState(6);
  const [notes, setNotes] = useState('');
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  const getMoodIcon = (mood: MoodEntry['mood']) => {
    switch (mood) {
      case 'happy':
        return Smile;
      case 'neutral':
        return Meh;
      case 'sad':
        return Frown;
      default:
        return Meh;
    }
  };

  const getMoodColor = (mood: MoodEntry['mood']) => {
    switch (mood) {
      case 'happy':
        return 'text-green-500';
      case 'neutral':
        return 'text-yellow-500';
      case 'sad':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleAddEntry = () => {
    if (selectedMood) {
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        mood: selectedMood,
        energy,
        sleep,
        water,
        notes,
        timestamp: new Date().toISOString(),
      };

      setMoodEntries([...moodEntries, newEntry]);
      setShowAddEntry(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedMood(null);
    setEnergy(5);
    setSleep(7);
    setWater(6);
    setNotes('');
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mood Tracker</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddEntry(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center"
          >
            Log Today's Mood
          </motion.button>
        </div>

        {/* Mood Trends Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-bold mb-4">Mood Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockMoodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ fill: '#6366f1' }}
                />
                <Line
                  type="monotone"
                  dataKey="water"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ fill: '#0ea5e9' }}
                />
                <Line
                  type="monotone"
                  dataKey="sleep"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Sleep Impact',
              icon: Moon,
              color: 'text-purple-600',
              bg: 'bg-purple-50',
              insight: 'You feel better on days with 8+ hours of sleep'
            },
            {
              title: 'Hydration Connection',
              icon: Activity,
              color: 'text-blue-600',
              bg: 'bg-blue-50',
              insight: 'Higher water intake correlates with improved mood'
            },
            {
              title: 'Energy Patterns',
              icon: Sun,
              color: 'text-yellow-600',
              bg: 'bg-yellow-50',
              insight: 'Morning exercise boosts your daily energy levels'
            }
          ].map((insight, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`${insight.bg} rounded-xl p-6`}
            >
              <div className="flex items-center mb-4">
                <insight.icon className={`h-6 w-6 ${insight.color} mr-3`} />
                <h3 className="font-semibold">{insight.title}</h3>
              </div>
              <p className="text-gray-600">{insight.insight}</p>
            </motion.div>
          ))}
        </div>

        {/* Add Mood Entry Modal */}
        <AnimatePresence>
          {showAddEntry && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-6 max-w-lg w-full mx-4"
              >
                <h3 className="text-xl font-bold mb-6">How are you feeling?</h3>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {(['happy', 'neutral', 'sad'] as const).map((mood) => {
                    const MoodIcon = getMoodIcon(mood);
                    return (
                      <motion.button
                        key={mood}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedMood(mood)}
                        className={`p-4 rounded-lg ${
                          selectedMood === mood
                            ? 'bg-indigo-100 border-2 border-indigo-500'
                            : 'bg-gray-50'
                        }`}
                      >
                        <MoodIcon
                          className={`h-8 w-8 mx-auto ${getMoodColor(mood)}`}
                        />
                        <span className="block text-sm mt-2 capitalize">{mood}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Energy Level (1-10)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={energy}
                      onChange={(e) => setEnergy(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sleep Hours
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={sleep}
                      onChange={(e) => setSleep(Number(e.target.value))}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Water Glasses
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={water}
                      onChange={(e) => setWater(Number(e.target.value))}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setShowAddEntry(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEntry}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    disabled={!selectedMood}
                  >
                    Save Entry
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MoodTracker;