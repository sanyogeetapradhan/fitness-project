import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Clock,
  Calendar,
  Plus,
  X,
  Check,
  Droplets,
  Apple,
  Heart
} from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  days: string[];
  type: 'exercise' | 'water' | 'meal' | 'custom' | 'sleep' | 'break';
  active: boolean;
}

const initialReminders: Reminder[] = [
  {
    id: '1',
    title: 'Drink Water',
    description: 'Stay hydrated! Drinking water boosts your metabolism.',
    time: '09:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    type: 'water',
    active: true
  },
  {
    id: '2',
    title: 'Lunch Time',
    description: 'Time for a balanced lunch! Don\'t forget your proteins.',
    time: '12:30',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    type: 'meal',
    active: true
  },
  {
    id: '3',
    title: 'Evening Walk',
    description: 'Take a 10-minute walk to stay active!',
    time: '17:00',
    days: ['Mon', 'Wed', 'Fri'],
    type: 'exercise',
    active: true
  },
  {
    id: '4',
    title: 'Morning Stretch',
    description: 'Start your day with a 5-minute stretch to loosen up your muscles.',
    time: '07:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    type: 'exercise',
    active: true
  },
  {
    id: '5',
    title: 'Breakfast Time',
    description: 'Don\'t skip breakfast! Eat a nutritious meal to start your day.',
    time: '08:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    type: 'meal',
    active: true
  },
  {
    id: '6',
    title: 'Dinner Time',
    description: 'Eat a balanced dinner to keep your energy levels up.',
    time: '19:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    type: 'meal',
    active: true
  },
  {
    id: '7',
    title: 'Sleep Time',
    description: 'Get at least 7 hours of sleep to recharge for the next day.',
    time: '22:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    type: 'sleep',
    active: true
  },
  {
    id: '8',
    title: 'Take a Break',
    description: 'Take a 10-minute break every hour to stretch and move around.',
    time: '10:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    type: 'break',
    active: true
  }
];

const ReminderSystem = () => {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    title: '',
    description: '',
    time: '',
    days: [],
    type: 'custom',
    active: true
  });
  const [notification, setNotification] = useState<string | null>(null);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'water':
        return Droplets;
      case 'meal':
        return Apple;
      case 'exercise':
        return Heart;
      default:
        return Bell;
    }
  };

  const handleAddReminder = () => {
    if (newReminder.title && newReminder.time && newReminder.days?.length) {
      setReminders([
        ...reminders,
        {
          ...newReminder as Reminder,
          id: Date.now().toString(),
        }
      ]);
      setShowAddReminder(false);
      setNewReminder({
        title: '',
        description: '',
        time: '',
        days: [],
        type: 'custom',
        active: true
      });
      showNotification('Reminder added successfully!');
    }
  };

  const toggleReminderActive = (id: string) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id
        ? { ...reminder, active: !reminder.active }
        : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    showNotification('Reminder deleted successfully!');
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Reminder System</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddReminder(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Reminder
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reminders.map(reminder => {
            const ReminderIcon = getReminderIcon(reminder.type);
            
            return (
              <motion.div
                key={reminder.id}
                whileHover={{ scale: 1.02 }}
                className={`bg-white rounded-xl p-6 shadow-lg ${
                  !reminder.active && 'opacity-60'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <ReminderIcon className={`h-6 w-6 ${
                      reminder.active ? 'text-indigo-600' : 'text-gray-400'
                    } mr-3`} />
                    <div>
                      <h3 className="font-semibold">{reminder.title}</h3>
                      <p className="text-sm text-gray-500">{reminder.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleReminderActive(reminder.id)}
                      className={`p-2 rounded-lg ${
                        reminder.active
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{reminder.description}</p>

                <div className="flex flex-wrap gap-2">
                  {reminder.days.map(day => (
                    <span
                      key={day}
                      className="px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add Reminder Modal */}
      <AnimatePresence>
        {showAddReminder && (
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
              <h3 className="text-xl font-bold mb-4">Add New Reminder</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map(day => (
                      <button
                        key={day}
                        onClick={() => {
                          const days = newReminder.days || [];
                          setNewReminder({
                            ...newReminder,
                            days: days.includes(day)
                              ? days.filter(d => d !== day)
                              : [...days, day]
                          });
                        }}
                        className={`px-3 py-1 rounded-lg ${
                          newReminder.days?.includes(day)
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newReminder.type}
                    onChange={(e) => setNewReminder({
                      ...newReminder,
                      type: e.target.value as Reminder['type']
                    })}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="water">Water</option>
                    <option value="meal">Meal</option>
                    <option value="exercise">Exercise</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowAddReminder(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddReminder}
                  

                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add Reminder
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReminderSystem;