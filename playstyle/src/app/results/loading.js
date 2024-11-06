export default function ResultsLoading() {
  return (
    <main className="px-[12px] flex h-[100vh]">
      <div className="w-full my-auto text-center">
        {/* <div className="w-full relative border border-cw-2 border-white rounded-2xl text-center py-4 mb-4"> */}
        {/* <div className="p-[8px] absolute top-0 left-0 w-full h-full">
            <div className="w-full h-full rounded-lg z-[-10] bg-[#199647] border-cw-green border border-[#1fc25b]"></div>
          </div> */}
        {/* <div className="p-[8px] absolute top-0 left-0 h-full]">
            <div className="w-full h-full rounded-lg z-[-9] bg-red-300 border-black border-8 border-solid"></div>
          </div> */}
        {/* </div> */}
        <p className="text-[1.5rem]" id="LoadingDots">
          Loading
        </p>
      </div>
    </main>
  );
}
