"use client";
import { Combobox } from "@/components/combobox/Combobox";
import { useState } from "react";

interface MyOptionType {
  value: string;
  label: string;
  description?: string; // Optional additional property
  code?: string; // Optional additional property
  icon?: string; // New field for icon
}
export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [options, setOptions] = useState<MyOptionType[]>([
    {
      value: "art",
      label: "Art & Design",
      icon: "🎨",
      description: "Exploring creativity and aesthetics",
      code: "AD101",
    },
    {
      value: "technology",
      label: "Technology & Innovation",
      icon: "💻",
      description: "Advancements in tech and gadgets",
      code: "TI102",
    },
    {
      value: "science",
      label: "Science & Research",
      icon: "🔬",
      description: "The world of scientific discoveries",
      code: "SR103",
    },
    {
      value: "music",
      label: "Music & Performing Arts",
      icon: "🎵",
      description: "Rhythms, melodies, and performances",
      code: "MP104",
    },
    {
      value: "travel",
      label: "Travel & Adventure",
      icon: "✈️",
      description: "Discovering new places and cultures",
      code: "TA105",
    },
    {
      value: "sports",
      label: "Sports & Fitness",
      icon: "🏅",
      description: "Physical activity and competitive games",
      code: "SF106",
    },
    {
      value: "gaming",
      label: "Gaming & Esports",
      icon: "🎮",
      description: "Digital entertainment and competitions",
      code: "GE107",
    },
    {
      value: "literature",
      label: "Literature & Writing",
      icon: "📚",
      description: "The art of written works",
      code: "LW108",
    },
    {
      value: "cooking",
      label: "Cooking & Culinary Arts",
      icon: "🍳",
      description: "The craft of cooking and food presentation",
      code: "CC109",
    },
    {
      value: "photography",
      label: "Photography & Film",
      icon: "📸",
      description: "Capturing moments and storytelling",
      code: "PF110",
    },
    {
      value: "fashion",
      label: "Fashion & Style",
      icon: "👗",
      description: "Trends in clothing and lifestyle",
      code: "FS111",
    },
    {
      value: "gardening",
      label: "Gardening & Landscaping",
      icon: "🌱",
      description: "Cultivating plants and outdoor spaces",
      code: "GL112",
    },
    {
      value: "astronomy",
      label: "Astronomy & Space Exploration",
      icon: "🌌",
      description: "Studying celestial objects and the universe",
      code: "AE113",
    },
    {
      value: "history",
      label: "History & Archaeology",
      icon: "🏺",
      description: "Unearthing the past and its stories",
      code: "HA114",
    },
    {
      value: "languages",
      label: "Languages & Linguistics",
      icon: "🈷️",
      description: "The study of language and its structure",
      code: "LL115",
    },
    {
      value: "psychology",
      label: "Psychology & Sociology",
      icon: "🧠",
      description: "Understanding the human mind and society",
      code: "PS116",
    },
    {
      value: "environment",
      label: "Environment & Ecology",
      icon: "🌍",
      description: "The science of ecosystems and sustainability",
      code: "EE117",
    },
    {
      value: "philosophy",
      label: "Philosophy & Ethics",
      icon: "🤔",
      description: "Exploring fundamental questions and morality",
      code: "PE118",
    },
    {
      value: "economics",
      label: "Economics & Finance",
      icon: "💹",
      description: "The world of money, markets, and trade",
      code: "EF119",
    },
    {
      value: "engineering",
      label: "Engineering & Mechanics",
      icon: "⚙️",
      description: "Solving problems with applied science",
      code: "EM120",
    },
  ]);
  const handleOptionChange = (newValue: string) => {
    setSelectedOption(newValue);
  };

  const handleUpdateOptions = (newOptions: MyOptionType[]) => {
    setOptions(newOptions);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[370px] items-center justify-between flex border p-2">
        <Combobox
          value={selectedOption}
          onChange={handleOptionChange}
          options={options}
          updateOptions={handleUpdateOptions}
          label="Choose a domain..."
        />
      </div>
      {selectedOption}
    </main>
  );
}
