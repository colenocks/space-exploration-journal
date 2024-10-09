import Image from "@/components/Image";

interface IPlanet {
  [key: string]: string;
}

interface IJournal {
  planet: string;
  tripDate: string;
  images: { [key: string]: string }[];
  data?: IPlanet;
}

type IProps = {
  entries: { [key: string]: IJournal[] };
};

const JournalEntries = ({ entries }: IProps) => {
  return (
    <div>
      {Object.keys(entries).length > 0 && (
        <div className='w-full space-y-6 max-w-2xl'>
          <h2 className='mt-5 text-lg'>The Space trip journal data is ready for Visualizations. Go to Space Trips Charts!</h2>
          {Object.keys(entries).map((month, index) => {
            return (
              <div key={month + index} className='border-b border-gray-700 py-2'>
                <h2 className='text-lg font-bold text-cyan-700 mb-1'>{month} Trips</h2>
                <ul className='text-white'>
                  {entries[month].map((entry, i) => (
                    <li key={entry.planet + i} className='py-2'>
                      <div>
                        Trip to <strong>{entry.planet}</strong> - {entry.tripDate}
                      </div>
                      <div className='flex gap-2 flex-wrap ml-8'>
                        {entry.images?.map(entryImage => {
                          return (
                            <Image
                              key={entryImage.url + entryImage.title}
                              src={entryImage.url}
                              alt={entryImage.title}
                              className='rounded-sm border-2 border-neutral-500'
                              style={{ width: "40px", height: "40px", marginLeft: "-30px" }}
                            />
                          );
                        })}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JournalEntries;
