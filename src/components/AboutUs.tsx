import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

type AboutUsProps = {
  onClose: () => void;
};

const AboutUs: React.FC<AboutUsProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <FaGlobe className="mr-2 text-green-400" /> About the Developer
        </h2>

        <p className="text-sm text-gray-300 mb-3">
          Hi! I am <span className="text-green-400 font-bold">Rakesh Kumar</span>, a passionate Software Engineer.
          I love building cool projects and interactive applications.
        </p>

        <div className="flex flex-col space-y-2">
          <a
            href="https://www.instagram.com/rakesh_aarvi"
            target="_blank"
            className="flex items-center text-white hover:underline"
          >
            <FaInstagram className="mr-2" /> Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/rakesh-kumar18/"
            target="_blank"
            className="flex items-center text-white hover:underline"
          >
            <FaLinkedin className="mr-2" /> LinkedIn
          </a>
          <a
            href="https://x.com/rakesh_aarvi"
            target="_blank"
            className="flex items-center text-white hover:underline"
          >
            <FaTwitter className="mr-2" /> Twitter
          </a>
          <a
            href="https://aarvi18.github.io/rakeshportfolio/"
            target="_blank"
            className="flex items-center text-white hover:underline"
          >
            <FaGlobe className="mr-2" /> Portfolio.
          </a>
        </div>

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

export default AboutUs;
