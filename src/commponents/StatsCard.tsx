interface StatsCardProps {
  title: string;
  count: number;
  icon: string | React.ReactNode;
  color: string; 
}

function StatsCard({ title, count, icon, color }: StatsCardProps) {
  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{count}</h3>
        </div>
      </div>
    </>
  );
}

export default StatsCard;
