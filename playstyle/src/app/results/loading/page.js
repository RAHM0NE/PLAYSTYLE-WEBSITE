import Image from "next/image";

export default function LoadingResults() {
  return (
    <div className="min-h-[100vh] flex items-center justify-center">
      <div className="p-10 px-30 rounded-3xl border-white border-4">
        <span className="text-6xl mt-[-20px]">YOUR PLAYSTYLE IS...</span>
        <Image />
      </div>
    </div>
  );
}
