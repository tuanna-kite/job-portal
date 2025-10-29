import clsx from "clsx";

interface ITitleProps {
  label: string;
  title: string;
  subTitle: string;
  containerClass?: string;
}

export function Title({ label, title, subTitle, containerClass }: ITitleProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-2 lg:w-[60%]",
        containerClass,
      )}
    >
      <div className="text-primary-main w-fit text-lg font-semibold">
        {label}
      </div>
      <div className="w-full text-center text-2xl leading-9 font-bold text-[#212B36] lg:text-3xl lg:leading-12">
        {title}
      </div>
      <div className="text-center text-base text-[#212B36]">{subTitle}</div>
    </div>
  );
}
