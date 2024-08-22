"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    password: "",
  });

  const handleLogin = () => {
    console.log(data);
    router.push(`/login/${data.name}`);
    return alert("Login Successfully");
  };

  return (
    <div className="flex flex-col  items-center justify-center h-screen bg-gray-100">
      <h1>Hello this is the login page</h1>

      <input
        type="text"
        onChange={(e) => setData({ ...data, name: e.target.value })}
        placeholder="enter name"
        value={data.name}
      />
      <input
        type="text"
        onChange={(e) => setData({ ...data, password: e.target.value })}
        placeholder="enter password"
        value={data.password}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default page;
