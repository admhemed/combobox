import { Combobox } from "@/components/combobox/combobox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[370px] items-center justify-between flex border p-2">
        <Combobox />
      </div>
    </main>
  );
}
