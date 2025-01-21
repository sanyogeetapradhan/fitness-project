import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Minus, Info, Apple, Coffee, Pizza, Cookie } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  portion: string;
}

interface Meal {
  id: string;
  name: string;
  time: string;
  foods: FoodItem[];
}

const mockFoodDatabase: FoodItem[] = [
  {
    id: '1',
    name: 'Oatmeal with Banana',
    calories: 250,
    protein: 6,
    carbs: 45,
    fats: 5,
    portion: '1 bowl'
  },
  {
    id: '2',
    name: 'Grilled Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    portion: '100g'
  },
  // Add more mock food items...
];

const CalorieTracker = () => {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Breakfast',
      time: '8:00 AM',
      foods: []
    },
    {
      id: '2',
      name: 'Lunch',
      time: '12:30 PM',
      foods: []
    },
    {
      id: '3',
      name: 'Dinner',
      time: '7:00 PM',
      foods: []
    },
    {
      id: '4',
      name: 'Snacks',
      time: 'Any time',
      foods: []
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const getMealIcon = (mealName: string) => {
    switch (mealName.toLowerCase()) {
      case 'breakfast':
        return Coffee;
      case 'lunch':
        return Pizza;
      case 'dinner':
        return Apple;
      default:
        return Cookie;
    }
  };

  const calculateMealNutrition = (foods: FoodItem[]) => {
    return foods.reduce(
      (acc, food) => ({
        calories: acc.calories + food.calories,
        protein: acc.protein + food.protein,
        carbs: acc.carbs + food.carbs,
        fats: acc.fats + food.fats
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  };

  const filteredFoods = mockFoodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFoodToMeal = (mealId: string, food: FoodItem) => {
    setMeals(meals.map(meal =>
      meal.id === mealId
        ? { ...meal, foods: [...meal.foods, { ...food, id: Date.now().toString() }] }
        : meal
    ));
  };

  const removeFoodFromMeal = (mealId: string, foodId: string) => {
    setMeals(meals.map(meal =>
      meal.id === mealId
        ? { ...meal, foods: meal.foods.filter(f => f.id !== foodId) }
        : meal
    ));
  };

  const totalNutrition = meals.reduce(
    (acc, meal) => {
      const mealNutrition = calculateMealNutrition(meal.foods);
      return {
        calories: acc.calories + mealNutrition.calories,
        protein: acc.protein + mealNutrition.protein,
        carbs: acc.carbs + mealNutrition.carbs,
        fats: acc.fats + mealNutrition.fats
      };
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const macroData = [
    { name: 'Protein', value: totalNutrition.protein, color: '#4ade80' },
    { name: 'Carbs', value: totalNutrition.carbs, color: '#60a5fa' },
    { name: 'Fats', value: totalNutrition.fats, color: '#f472b6' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Calorie & Nutrient Tracker</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {meals.map(meal => {
            const MealIcon = getMealIcon(meal.name);
            const nutrition = calculateMealNutrition(meal.foods);
            
            return (
              <motion.div
                key={meal.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <MealIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <div>
                      <h3 className="font-semibold">{meal.name}</h3>
                      <p className="text-sm text-gray-500">{meal.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMeal(meal.id)}
                    className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {meal.foods.map(food => (
                    <motion.div
                      key={food.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium">{food.name}</p>
                        <p className="text-xs text-gray-500">{food.calories} kcal</p>
                      </div>
                      <button
                        onClick={() => removeFoodFromMeal(meal.id, food.id)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <Minus className="h-4 w-4 text-gray-500" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Total Calories:</span>
                    <span className="font-semibold">{nutrition.calories} kcal</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Macro Distribution Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <h3 className="text-xl font-bold mb-4">Macro Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={macroData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6">
          {macroData.map((macro, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: macro.color }}
              />
              <span className="text-sm">
                {macro.name}: {macro.value}g
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Food Search Modal */}
      {selectedMeal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-lg w-full mx-4"
          >
            <div className="flex items-center mb-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search foods..."
                className="ml-2 w-full p-2 border-b focus:outline-none focus:border-indigo-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredFoods.map(food => (
                <motion.div
                  key={food.id}
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  className="p-3 rounded-lg cursor-pointer"
                  onClick={() => {
                    addFoodToMeal(selectedMeal, food);
                    setSelectedMeal(null);
                    setSearchTerm('');
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{food.name}</p>
                      <p className="text-sm text-gray-500">{food.portion}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{food.calories} kcal</p>
                      <p className="text-xs text-gray-500">
                        P: {food.protein}g • C: {food.carbs}g • F: {food.fats}g
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setSelectedMeal(null)}
              className="mt-4 w-full p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CalorieTracker;