import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import style from "./UserVideoComponent.module.css";

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined && this.props.type === "you" ? (
          <div className={style.streamcomponent_you}>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
          </div>
        ) : null}
        {this.props.streamManager !== undefined && this.props.type === "me" ? (
          <div className={style.streamcomponent_me}>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
          </div>
        ) : null}
      </div>
    );
  }
}
