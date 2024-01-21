"use client";
import { Combobox } from "@/components/combobox/Combobox";
import { sampleData } from "@/components/combobox/sampleData";
import { useState } from "react";

interface MyOptionType {
  value: string;
  label: string;
  description?: string; // Optional additional property
  code?: string; // Optional additional property
  icon?: string; // New field for icon
}
export default function Home() {
  const [selectedOption, setSelectedOption] = useState<MyOptionType | null>(
    null
  );
  const [options, setOptions] = useState<MyOptionType[]>(
    sampleData as MyOptionType[]
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[370px] items-center justify-between flex border p-2">
        <Combobox<MyOptionType>
          selectedOption={selectedOption}
          onChange={setSelectedOption}
          options={options}
          updateOptions={setOptions}
          label="Choose a domain..."
        />
      </div>
      <div>{JSON.stringify(selectedOption)}</div>
    </main>
  );
}
