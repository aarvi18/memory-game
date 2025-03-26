import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

type RatingDialogProps = {
  onClose: () => void;
};

const RatingDialog: React.FC<RatingDialogProps> = ({ onClose }) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = () => {
    console.log("User Rating:", rating);
    console.log("User Feedback:", feedback);
    onClose(); // Close dialog after submission
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">⭐ Rate Us</h2>
        
        {/* Star Rating */}
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={24}
              className={`cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-500"}`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        {/* Feedback Input */}
        <textarea
          className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none"
          placeholder="Write your feedback..."
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button className="bg-red-500 px-4 py-2 rounded-md" onClick={onClose}>Cancel</button>
          <button className="bg-green-500 px-4 py-2 rounded-md" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </motion.div>
  );
};

export default RatingDialog;
