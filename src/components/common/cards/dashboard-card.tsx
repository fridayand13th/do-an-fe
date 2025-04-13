import { TDashboardCardProps } from '@@types/components/commons/cards/dashboard-card';

export default function DashboardCard({
  children,
  style,
}: TDashboardCardProps) {
  return (
    <div
      className={`flex items-center w-full h-16 rounded-full p-4 ${
        style && style
      }`}
    >
      {children}
    </div>
  );
}
