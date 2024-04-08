//Class in JS: https://chat.openai.com/c/6eed3309-ade9-497e-bbc2-43871606d05a

// this is  a Class Based component similar to User.js

import React from "react";

// React.Component is a class which is inside react package
class UserClass extends React.Component {
  // recieving  the props from About.js

  constructor(props) {
    super(props);
    // console.log(props);

    // creating a state variable, which we are doing with help of useState
    this.state = {
      userInfo: {
        name: "dummy",
        location: "location",
      },
      //   count: 0,
      //   count2: 1,
    };

    // console.log("Child Constructor: from UserClass.js");
  }

  async componentDidMount() {
    // console.log("Component did mount, it is called after constructor and rendering" );
    // API calls are made here
    // refer to 06 notes.md i.e., loads the skeleton of page => Render => API => Render the data which we got through api

    const data = await fetch(
      " https://api.github.com/users/priyanshu-ranjan-00"
    );
    const userJson = await data.json();
    // console.log(userJson);

    this.setState({
      userInfo: userJson,
    });
  }

  componentDidUpdate() {
    // console.log("Compound Did Updated: from UserClass.js");
  }

  componentWillUnmount() {
    // console.log("Component Will Unmount");
    // moving to some another end point or page, it will be consoled
  }

  render() {
    // destructuring props
    // const { name, location } = this.props;
    // const { count, count2 } = this.state;

    const { name, location, login, avatar_url } = this.state.userInfo;

    // console.log("Child Render: from UserClass.js");

    return (
      <div className="user-card">
        <div anout-user-image>
          <img src={avatar_url} style={{ width: 50 }}></img>
        </div>
        <h2>Name: {name}</h2>
        <h3>Location: {location || "India"}</h3>
        <h3>@{login}</h3>
      </div>
    );
  }
}

export default UserClass;
