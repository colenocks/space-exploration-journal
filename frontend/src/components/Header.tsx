import { formatDate } from "@/lib/utils";
import Avatar from "boring-avatars";

type IProps = {
  title: string;
  className?: string;
};

const Header = ({ title, className }: IProps) => {
  const today = new Date().toDateString();
  return (
    <header
      className={`border-b flex flex-col-reverse gap-6 md:flex-row items-center justify-between font-semibold border-neutral-700 relative mb-6 ${className}`}>
      <div>
        <span className='neutral-400 uppercase text-sm text-neutral-400'>{formatDate(today)}</span>
        <h2 className='font-bold text-white mt-1.5 mb-3 text-3xl'>{title}</h2>
      </div>
      <div className='bg-neutral-700 rounded-[50%] w-fit bottom-3 right-0'>
        <Avatar name='Avatar beam' size={52} variant='beam' />
      </div>
    </header>
  );
};

export default Header;
