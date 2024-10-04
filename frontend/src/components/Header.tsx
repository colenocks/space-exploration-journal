type IProps = {
  title: string;
};

const Header = ({ title }: IProps) => {
  const today = new Date().toDateString();
  return (
    <header className='border-b font-semibold border-neutral-700 relative mb-6'>
      <span className='neutral-400 uppercase text-sm text-neutral-400'>{today}</span>
      <h2 className='font-bold text-white mt-1.5 mb-3 text-2xl'>{title}</h2>
    </header>
  );
};

export default Header;
