const NoData = () => {
    return (
      <>
        <div className="flex flex-col h-full items-center ">
          <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <svg
              className="w-14 h-14 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" x2="2" y1="12" y2="12" />
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              <line x1="6" x2="6.01" y1="16" y2="16" />
              <line x1="10" x2="10.01" y1="16" y2="16" />
            </svg>
            <p className="mt-2 text-xl text-gray-800 dark:text-gray-300">
              No data to show
            </p>
          </div>
        </div>
      </>
    );
};
export default NoData;