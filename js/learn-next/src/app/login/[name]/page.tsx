import React from "react";

var paramsOld;

const page = ({ params }: any) => {
  paramsOld = params.name;
  return (
    <div className="text-red-700 flex items-center justify-center h-screen">
      <h1>page no is {params.name}</h1>
    </div>
  );
};

export { paramsOld };
export default page;
