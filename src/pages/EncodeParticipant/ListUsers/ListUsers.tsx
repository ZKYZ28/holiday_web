import data from './ListData.json';
import { FC } from 'react';

type ListProps = {
  input: string;
};

const List: FC<ListProps> = ({ input }) => {
  // create a new array by filtering the original array
  const filteredData = data.filter((el) => (input === '' ? el : el.text.toLowerCase().includes(input)));
  return (
    <ul className="h-60 overflow-y-scroll w-full mb-4">
      {filteredData.map((item) => (
        <li key={item.id} className="border-b-2 mb-2 mt-2">
          {item.text}
        </li>
      ))}
    </ul>
  );
};

export default List;
