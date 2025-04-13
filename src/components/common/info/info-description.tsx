import { FaInfoCircle } from 'react-icons/fa';

export default function InfoDescription({
  text,
  textClass,
  iconClass,
}: {
  text: string;
  textClass?: string;
  iconClass?: string;
}) {
  return (
    <div className="flex items-center gap-2 justify-start">
      <span
        className={`w-6 h-8 flex justify-start items-center ${
          iconClass ? iconClass : ''
        }`}
      >
        <FaInfoCircle className="text-success-500" />
      </span>
      <span className={`flex-1 ${textClass ? textClass : ''}`}>{text}</span>
    </div>
  );
}
