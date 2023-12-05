import {MouseEventHandler} from "react";

const GroupChat = ({ text, holidayImagePath, onClick, isActive }: { text: string, holidayImagePath: string, onClick: MouseEventHandler, isActive: boolean}) => {
  const imagePath = `${import.meta.env.VITE_BASE_API}/${holidayImagePath}`;

  return (
    <button onClick={onClick} className={`${isActive ? 'bg-gray-100 rounded-xl p-2' : ''} flex flex-row items-center hover:bg-gray-100 rounded-xl p-2`}>
      <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
        <img src={imagePath} alt="GROUPE IMAGE" className="h-full w-full object-cover rounded-full" />
      </div>
      <div className="ml-2 text-sm font-semibold">{text}</div>
    </button>
  );
};
export default GroupChat;
