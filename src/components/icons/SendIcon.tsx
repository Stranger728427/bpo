 type IconProps = {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
};

const SendIcon = ({
  size = 20,
  width,
  height,
  className,
}: IconProps) => (
  <svg
    width={width ?? size}
    height={height ?? size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="" />
  </svg>
);

export default SendIcon;
