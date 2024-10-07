const Home = () => {
  return (
    <div>
      <div className='lg:px-8 lg:pb-8 flex flex-col items-center justify-center'>
        <h2 className='text-2xl text-gray-200 text-center mb-8 max-w-2xl'>
          Explore the vast reaches of our solar system and gather information for your next big story.
        </h2>

        <div className='bg-gray-800 shadow-lg rounded-lg p-6 max-w-xl w-full'>
          <h2 className='text-2xl font-semibold text-white mb-4'>Planning Your Journey</h2>
          <ul className=' space-y-4 text-gray-300'>
            <li>
              <strong className='text-cyan-400'>Explore the Planets:</strong> You can begin your adventure by viewing a list of planets in our solar
              system.
            </li>
            <li>
              <strong className='text-cyan-400'>Make Your Selection:</strong> Once you've gathered enough information, you can select the planets you
              wish to visit.
            </li>
            <li>
              <strong className='text-cyan-400'>Visualise your data:</strong> You can visualize your data based on the trips to the planets you have
              visited and the items you have collected along the way.
            </li>
          </ul>
        </div>

        <p className='text-center text-gray-500 mt-12'>
          Prepare for an exciting journey through space as you explore and compare planets to find your ideal destination!
        </p>
      </div>
    </div>
  );
};

export default Home;
