import React from 'react';

const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
      <div className="relative mx-auto border-black dark:border-gray-800 bg-black border-[14px] rounded-[2.5rem] h-[800px] w-[400px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-y-auto w-full h-full bg-white dark:bg-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame; 