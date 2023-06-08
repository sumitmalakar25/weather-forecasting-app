import React, { Component } from "react";
import loading from "./assets/gg.gif";
export default class Loader extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading} height={30} width={30} alt="load" />
      </div>
    );
  }
}