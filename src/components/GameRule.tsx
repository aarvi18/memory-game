import React from "react";
import { motion } from "framer-motion";

type GameRuleProps = {
  onClose: () => void;
};

const GameRule: React.FC<GameRuleProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-center">Game Rules & Terms</h2>
        
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Flip two cards to find a matching pair.</li>
          <li>The game ends when all pairs are matched.</li>
          <li>Try to complete the game in the fewest moves!</li>
          <li>Restart anytime to improve your score.</li>
          <li>Any misuse of the game may result in a ban.</li>
        </ul>

        <p className="mt-4 text-sm text-gray-400 text-center">Version: 1.0.0</p>

        {/* Close Button */}
        <div className="mt-4 flex justify-end">
          <button className="bg-red-500 px-4 py-2 rounded-md" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameRule;
