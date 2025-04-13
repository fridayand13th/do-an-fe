export default function FilterCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative transition-all duration-300 bg-sky-700 text-white w-fit rounded-md py-2 pl-3 pr-12 cursor-pointer">
      {children}
    </div>
  );
}
