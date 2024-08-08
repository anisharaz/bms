"use client";

import { useState } from "react";

function CreateForm() {
  const [data, setData] = useState();
  return (
    <div>
      <form action="">
        <label htmlFor="title" className="text-xl">
          Title
        </label>
        <input type="text" id="title" className="rounded-full p-2 m-1" />
      </form>
    </div>
  );
}

export default CreateForm;
