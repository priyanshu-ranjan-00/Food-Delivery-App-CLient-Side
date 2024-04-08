// this is also class based component

import { Component } from "react";
// import User from './User';
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";

class About extends Component {
  constructor(props) {
    super(props);
    // console.log('Parent Constructor');
  }

  componentDidMount() {
    // console.log('Parent Component Did Mount');
  }

  render() {
    // console.log('Parent Render');
    return (
      <div className="p-3 m-3">
        <div className="about-page">
          <div>
            <UserContext.Consumer>
              {({ loggedInUser }) => (
                <h1 className="font-semibold">User: {loggedInUser}</h1>
              )}
            </UserContext.Consumer>
          </div>
          <UserClass name={"Priyanshu Ranjan"} location={"India"} />
        </div>
      </div>
    );
  }
}

export default About;
