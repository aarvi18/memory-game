import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

type RatingDialogProps = {
  onClose: () => void;
};

const RatingDialog: React.FC<RatingDialogProps> = ({ onClose }) => {
  const [rating, setRating] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (rating === "") {
      alert("Please select a rating before submitting.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://api-main.meuzz.com/v1/auth/feedback", {
        rating,
        feedback,
      });

      console.log("Response:", response.data);
      setSuccess(true); // Show success message

      setTimeout(() => {
        setSuccess(false);
        onClose(); // Close dialog after 2 seconds
      }, 8000);
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating. Please try again.");
    } finally {
      setLoading(false);
    }
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
          {["1", "2", "3", "4", "5"].map((star) => (
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
          <button className="bg-red-500 px-4 py-2 rounded-md" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="bg-green-500 px-4 py-2 rounded-md" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold mb-2">🎉 Thank You for Your Feedback!</h2>
            <p className="text-sm opacity-90">We appreciate your time and effort in sharing your thoughts.</p>

            {/* Feedback Summary */}
            <div className="mt-4 p-3 bg-green-700 rounded-md">
              <p className="text-sm"><strong>⭐ Rating:</strong> {rating} / 5</p>
              {feedback && <p className="text-sm mt-2"><strong>💬 Feedback:</strong> "{feedback}"</p>}
            </div>

            {/* Additional CTA */}
            <p className="text-xs opacity-80 mt-3">Your feedback helps us improve! Feel free to reach out anytime.</p>

            <button
              className="bg-white text-green-600 mt-4 px-4 py-2 rounded-md font-semibold"
              onClick={() => setSuccess(false)}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}


    </motion.div>


  );
};

export default RatingDialog;
