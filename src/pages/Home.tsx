import React from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import Button from "../components/Button";

const Home: React.FC = () => {
  return (
    <div className="w-full max-w-screen-2xl pt-5 flex flex-col gap-10 mx-auto">
      <h1 className="text-4xl font-bold text-gray-700">
        Get inspired to <span className="text-orange-400">cook more.</span>
      </h1>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-gray-700">Recently added</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card
            user="user"
            title="Very descriptive title"
            id="123"
            image="https://picsum.photos/200"
          />
          <Card
            user="user"
            title="Very descriptive title"
            id="234"
            image="https://picsum.photos/200"
          />
          <Card
            user="user"
            title="Very descriptive title"
            id="345"
            image="https://picsum.photos/200"
          />
        </div>
        <Link to="/recipes" className="self-end">
          <Button primary>Check out more</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-gray-700">Most liked</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card
            user="user"
            title="Very descriptive title"
            id="123"
            image="https://picsum.photos/200"
          />
          <Card
            user="user"
            title="Very descriptive title"
            id="234"
            image="https://picsum.photos/200"
          />
          <Card
            user="user"
            title="Very descriptive title"
            id="345"
            image="https://picsum.photos/200"
          />
        </div>
        <Link to="/recipes?most-liked" className="self-end">
          <Button primary>Check out more</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
