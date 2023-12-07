import React from "react";


interface ChatHeaderProps {
  name: string;
}

const ChatHeader = ({ name }: ChatHeaderProps) => {
  return (
    <div className="border-b border-b-[#E58E27] h-20 w-full py-3 px-6 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center space-x-1.5">
        <div>avatar</div>
        <div className="flex flex-col">
          <p className="text-xs text-gray-600">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;