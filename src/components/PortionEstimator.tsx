import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, 
  ChevronUp, 
  ChevronDown, 
  Info,
  Coffee,
  Pizza,
  Apple,
  Cookie,
  Beef,
  Fish,
  Egg,
  Wheat
} from 'lucide-react';

interface FoodPortion {
  id: string;
  name: string;
  icon: any;
  baseAmount: number;
  unit: string;
  caloriesPer100g: number;
  protein: number;
  carbs: number;
  fats: number;
  funFact: string;
}

const foodPortions: FoodPortion[] = [
  {
    id: '1',
    name: 'Rice',
    icon: Wheat,
    baseAmount: 100,
    unit: 'g',
    caloriesPer100g: 130,
    protein: 2.7,
    carbs: 28,
    fats: 0.3,
    funFact: 'One cup of cooked rice contains about 45g of carbohydrates!'
  },
  {
    id: '2',
    name: 'Chicken Breast',
    icon: Beef,
    baseAmount: 100,
    unit: 'g',
    caloriesPer100g: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    funFact: 'Chicken breast is one of the leanest protein sources available!'
  },
  {
    id: '3',
    name: 'Salmon',
    icon: Fish,
    baseAmount: 100,
    unit: 'g',
    caloriesPer100g: 208,
    protein: 22,
    carbs: 0,
    fats: 13,
    funFact: 'Salmon is rich in omega-3 fatty acids, great for brain health!'
  },
  {
    id: '4',
    name: 'Eggs',
    icon: Egg,
    baseAmount: 50,
    unit: 'g',
    caloriesPer100g: 155,
    protein: 13,
    carbs: 1.1,
    fats: 11,
    funFact: 'One large egg contains about 6g of high-quality protein!'
  },
];

const PortionEstimator = () => {
  const [portions, setPortions] = useState(
    foodPortions.map(food => ({
      ...food,
      currentAmount: food.baseAmount,
      showFunFact: false
    }))
  );

  const adjustPortion = (id: string, increment: boolean) => {
    setPortions(portions.map(portion =>
      portion.id === id
        ? {
            ...portion,
            currentAmount: Math.max(
              portion.baseAmount / 2,
              Math.min(
                portion.baseAmount * 3,
                increment
                  ? portion.currentAmount + portion.baseAmount / 4
                  : portion.currentAmount - portion.baseAmount / 4
              )
            )
          }
        : portion
    ));
  };

  const toggleFunFact = (id: string) => {
    setPortions(portions.map(portion =>
      portion.id === id
        ? { ...portion, showFunFact: !portion.showFunFact }
        : portion
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Portion Size Estimator</h2>
        <p className="text-gray-600 mb-6">
          Adjust portion sizes to see how they affect your nutritional intake
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portions.map(portion => {
            const calories = (portion.caloriesPer100g * portion.currentAmount) / 100;
            const protein = (portion.protein * portion.currentAmount) / 100;
            const carbs = (portion.carbs * portion.currentAmount) / 100;
            const fats = (portion.fats * portion.currentAmount) / 100;

            return (
              <motion.div
                key={portion.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <portion.icon className="h-8 w-8 text-indigo-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-lg">{portion.name}</h3>
                      <p className="text-sm text-gray-500">
                        Base portion: {portion.baseAmount}{portion.unit}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFunFact(portion.id)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Info className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                {portion.showFunFact && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-indigo-50 rounded-lg text-sm text-indigo-700"
                  >
                    {portion.funFact}
                  </motion.div>
                )}

                <div className="flex items-center justify-center mb-6">
                  <button
                    onClick={() => adjustPortion(portion.id, false)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <ChevronDown className="h-6 w-6 text-gray-600" />
                  </button>
                  <div className="mx-4 text-center">
                    <p className="text-3xl font-bold text-indigo-600">
                      {portion.currentAmount}
                    </p>
                    <p className="text-sm text-gray-500">{portion.unit}</p>
                  </div>
                  <button
                    onClick={() => adjustPortion(portion.id, true)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <ChevronUp className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Calories:</span>
                    <span className="font-semibold">{calories.toFixed(1)} kcal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Protein:</span>
                    <span className="font-semibold">{protein.toFixed(1)}g</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Carbs:</span>
                    <span className="font-semibold">{carbs.toFixed(1)}g</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fats:</span>
                    <span className="font-semibold">{fats.toFixed(1)}g</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Per 100{portion.unit}:</span>
                    <span>{portion.caloriesPer100g} kcal</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PortionEstimator;