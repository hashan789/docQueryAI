import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

export default function TypingResponse({ response }) {
  const [displayedText, setDisplayedText] = useState("No response yet");
  const typingSpeed = 50; // Adjust typing speed (ms per character)

  useEffect(() => {
    let currentIndex = 0;

    const typeCharacter = async () => {
      if (currentIndex < response.length) {
        setDisplayedText((prev) => prev + (currentIndex === -1 ? "" : response[currentIndex-1]));
        currentIndex++;
        setTimeout(typeCharacter, typingSpeed);
      }
    };

    setDisplayedText(""); // Clear previous text
    (response === "Processing...") ? setDisplayedText("Processing...") : typeCharacter(); // Start typing animation

    return () => {
      // Cleanup for re-triggering typing effect
      currentIndex = response.length;
    };
  }, [response]);

  return (
    <div className="w-full pl-6 p-4 mx-auto mt-6 bg-white">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        <FontAwesomeIcon icon={faRobot} className="mr-2" />
        AI Response
      </h2>
      <p className="font-poppins text-sm text-gray-700 whitespace-pre-wrap">{displayedText}</p>
    </div>
  );
}