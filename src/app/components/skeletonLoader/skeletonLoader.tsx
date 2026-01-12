export default function SkeletonLoader() {
  return [...Array(4)].map((_, i) => (
    <div
      key={i}
      className="bg-gray-100 p-1 pb-5 rounded-[10px] flex flex-col gap-y-4 shadow-lg border border-gray-100"
    >
      <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-200 animate-pulse">
        <div className="h-5 w-24 bg-gray-300 rounded"></div>
        <div className="flex justify-between text-sm mt-2">
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>

      <hr className="border-gray-200" />
    </div>
  ));
}
