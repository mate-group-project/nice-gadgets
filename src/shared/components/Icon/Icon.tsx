import { icons, type IconName } from './Icons';

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

export const Icon = ({ name, size = 16, className }: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[name]}
    </svg>
  );
};
