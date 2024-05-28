import React from "react";

import Input from "../components/Input";

const Home: React.FC = () => {
  return (
    <div>
      <Input type="password" placeholder="Text" title="title" required />
    </div>
  );
};

export default Home;
