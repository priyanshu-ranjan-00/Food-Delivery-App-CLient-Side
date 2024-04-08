import { useState } from "react";

const User = (props) => {
  const [count] = useState(0);
  return (
    <div className="user-card">
      <h1>Count = {count}</h1>
      <h2>Name: {props.name}</h2>
      <h3>Location: Bihar</h3>
      <h3>@priyanshu_ranjan_00</h3>
    </div>
  );
};

export default User;
