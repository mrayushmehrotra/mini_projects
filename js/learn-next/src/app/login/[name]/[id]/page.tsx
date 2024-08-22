import React from "react";
import { paramsOld } from "@/app/login/[name]/page";
const page = ({ params }: any) => {
  return (
    <div>
      <h1>
        `Your password is ${params.id}` and your name is {params}
      </h1>
    </div>
  );
};

export default page;
