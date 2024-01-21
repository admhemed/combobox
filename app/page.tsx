"use client";
import { Combobox } from "@/components/combobox/combobox";
import { useState } from "react";

interface MyOptionType {
  value: string;
  label: string;
  description?: string; // Optional additional property
  code?: string; // Optional additional property
}
export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [options, setOptions] = useState<MyOptionType[]>([
    {
      value: "art",
      label: "Art & Design",
      description: "Exploring creativity and aesthetics",
      code: "AD101",
    },
    {
      value: "technology",
      label: "Technology & Innovation",
      description: "Advancements in tech and gadgets",
      code: "TI102",
    },
    {
      value: "science",
      label: "Science & Research",
      description: "The world of scientific discoveries",
      code: "SR103",
    },
    {
      value: "music",
      label: "Music & Performing Arts",
      description: "Rhythms, melodies, and performances",
      code: "MP104",
    },
    {
      value: "travel",
      label: "Travel & Adventure",
      description: "Discovering new places and cultures",
      code: "TA105",
    },
    {
      value: "sports",
      label: "Sports & Fitness",
      description: "Physical activity and competitive games",
      code: "SF106",
    },
    {
      value: "gaming",
      label: "Gaming & Esports",
      description: "Digital entertainment and competitions",
      code: "GE107",
    },
    {
      value: "literature",
      label: "Literature & Writing",
      description: "The art of written works",
      code: "LW108",
    },
    {
      value: "cooking",
      label: "Cooking & Culinary Arts",
      description: "The craft of cooking and food presentation",
      code: "CC109",
    },
    {
      value: "photography",
      label: "Photography & Film",
      description: "Capturing moments and storytelling",
      code: "PF110",
    },
    {
      value: "fashion",
      label: "Fashion & Style",
      description: "Trends in clothing and lifestyle",
      code: "FS111",
    },
    {
      value: "gardening",
      label: "Gardening & Landscaping",
      description: "Cultivating plants and outdoor spaces",
      code: "GL112",
    },
    {
      value: "astronomy",
      label: "Astronomy & Space Exploration",
      description: "Studying celestial objects and the universe",
      code: "AE113",
    },
    {
      value: "history",
      label: "History & Archaeology",
      description: "Unearthing the past and its stories",
      code: "HA114",
    },
    {
      value: "languages",
      label: "Languages & Linguistics",
      description: "The study of language and its structure",
      code: "LL115",
    },
    {
      value: "psychology",
      label: "Psychology & Sociology",
      description: "Understanding the human mind and society",
      code: "PS116",
    },
    {
      value: "environment",
      label: "Environment & Ecology",
      description: "The science of ecosystems and sustainability",
      code: "EE117",
    },
    {
      value: "philosophy",
      label: "Philosophy & Ethics",
      description: "Exploring fundamental questions and morality",
      code: "PE118",
    },
    {
      value: "economics",
      label: "Economics & Finance",
      description: "The world of money, markets, and trade",
      code: "EF119",
    },
    {
      value: "engineering",
      label: "Engineering & Mechanics",
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
          label="Choose an Option"
        />
      </div>
    </main>
  );
}
