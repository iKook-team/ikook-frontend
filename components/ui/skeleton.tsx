import clsx from "clsx";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={clsx("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
};

export default Skeleton;
