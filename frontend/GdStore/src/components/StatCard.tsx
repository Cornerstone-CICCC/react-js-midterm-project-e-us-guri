import { MdTrendingUp } from "react-icons/md";

const StatCard = ({ title = "New Members", value = "124", trend = "+12%" }) => {
  return (
    <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 shadow-sm transition-all hover:shadow-md">
      {/* Title */}
      <p className="text-on-surface-variant font-label-bold uppercase text-[10px] tracking-[0.15em] mb-1">
        {title}
      </p>
      
      {/* Value and Trend */}
      <div className="flex items-center gap-3">
        <h3 className="font-headline-lg text-3xl text-on-surface italic uppercase tracking-tighter">
          {value}
        </h3>
        <div className="flex items-center gap-1 text-primary-container dark:text-primary text-xs font-bold">
          <MdTrendingUp size={14} />
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;