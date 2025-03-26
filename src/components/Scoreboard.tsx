import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaStar, FaBookOpen, FaInfoCircle, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { motion } from "framer-motion";
import RatingDialog from "./RatingDialog";
import gameMusic from "../assets/game-music.mp3"; // Import game music
import GameRule from "./GameRule";
import AboutUs from "./AboutUs";

type ScoreboardProps = {
  score: number;
  highestScore: number;
};

const Scoreboard: React.FC<ScoreboardProps> = ({ score, highestScore }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [ratingOpen, setRatingOpen] = useState<boolean>(false);
  const [gameRuleOpen, setGameRuleOpen] = useState<boolean>(false);
  const [aboutUsOpen, setAboutUsOpen] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false); // State to track sound

  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for audio

  // Effect to initialize audio
  useEffect(() => {
    audioRef.current = new Audio(gameMusic);
    audioRef.current.loop = true; // Loop music
    audioRef.current.volume = 0.5; // Set volume
  }, []);

  // Function to toggle sound
  const toggleSound = () => {
    setIsSoundOn((prev) => !prev);
    if (audioRef.current) {
      if (isSoundOn) {
        audioRef.current.pause(); // Pause music
      } else {
        audioRef.current.play(); // Play music
      }
    }
  };

  const handleRateUs = () => {
    setRatingOpen(true);
    setMenuOpen(false);
  };
  const handleGameRules = () => {
    setGameRuleOpen(true);
    setMenuOpen(false);
  };
  const handleAboutUs = () => {
    setAboutUsOpen(true);
    setMenuOpen(false);
  };

  return (
    <div className="z-50 relative w-full max-w-2xl bg-gray-800 text-white p-4 shadow-lg flex justify-between items-center border border-gray-700">
      {/* Score Section */}
      <div className="flex flex-col">
        <p className="text-lg">Score: <span className="text-yellow-400">{score}</span></p>
        <p className="text-lg">Highest: <span className="text-blue-400">{highestScore}</span></p>
      </div>

      {/* Hamburger Icon */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="ml-4 text-white focus:outline-none">
        <FaBars size={24} />
      </button>

      {/* Animated Dropdown Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute top-20 right-1 bg-gray-700 p-4 rounded-lg shadow-lg border border-gray-600 w-56"
        >
          <h3 className="text-2xl font-semibold text-green-400 mb-2">Memory Game</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-yellow-400 flex items-center" onClick={handleRateUs}>
              <FaStar className="mr-2" /> Rate Us
            </li>

            <li className="cursor-pointer hover:text-yellow-400 flex items-center" onClick={handleGameRules}>
              <FaBookOpen className="mr-2" /> Game Rules
            </li>

            <li className="cursor-pointer hover:text-yellow-400 flex items-center" onClick={handleAboutUs}>
              <FaInfoCircle className="mr-2" /> About Us
            </li>

            {/* Sound Toggle */}
            <li className="cursor-pointer hover:text-yellow-400 flex items-center" onClick={toggleSound}>
              {isSoundOn ? <FaVolumeUp className="mr-2" /> : <FaVolumeMute className="mr-2" />}
              {isSoundOn ? "Sound On" : "Sound Off"}
            </li>
          </ul>
        </motion.div>
      )}

      {/* Rating Dialog */}
      {ratingOpen && <RatingDialog onClose={() => setRatingOpen(false)} />}

      {/* Rating Dialog */}
      {gameRuleOpen && <GameRule onClose={() => setGameRuleOpen(false)} />}

      {/* Rating Dialog */}
      {aboutUsOpen && <AboutUs onClose={() => setAboutUsOpen(false)} />}
    </div>
  );
};

export default Scoreboard;
