import React, { Component } from "react";
import SketchPad from "./SketchPad";
import { TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE } from "./tools";
import style from "./SketchBoard.module.css";
import IO from "socket.io-client";

const wsClient = IO.connect(`localhost:3000`);

export default class SketchExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tool: TOOL_PENCIL,
      size: 2,
      color: "#000000",
      fill: false,
      fillColor: "#444444",
      items: [],
    };
  }

  componentDidMount() {
    wsClient.on("addItem", (item) => {
      this.setState({ items: this.state.items.concat([item]) });
    });
  }

  render() {
    const { tool, size, color, fill, fillColor, items } = this.state;
    return (
      <div className={style.container}>
        <div className={style.tool_menu}>
          <div className="tools">
            <button
              style={tool === TOOL_PENCIL ? { fontWeight: "bold" } : undefined}
              className={`${tool === TOOL_PENCIL ? "item-active" : "item"}`}
              onClick={() => this.setState({ tool: TOOL_PENCIL })}
            >
              연필
            </button>
            <button
              style={tool === TOOL_LINE ? { fontWeight: "bold" } : undefined}
              className={`${tool === TOOL_LINE ? "item-active" : "item"}`}
              onClick={() => this.setState({ tool: TOOL_LINE })}
            >
              선
            </button>
            <button
              style={tool === TOOL_ELLIPSE ? { fontWeight: "bold" } : undefined}
              className={`${tool === TOOL_ELLIPSE ? "item-active" : "item"}`}
              onClick={() => this.setState({ tool: TOOL_ELLIPSE })}
            >
              동그라미
            </button>
            <button
              style={
                tool === TOOL_RECTANGLE ? { fontWeight: "bold" } : undefined
              }
              className={`${tool === TOOL_RECTANGLE ? "item-active" : "item"}`}
              onClick={() => this.setState({ tool: TOOL_RECTANGLE })}
            >
              네모
            </button>
          </div>
          <div className={style.body}>
            <div className={style.white_board}>
              <SketchPad
                width={550}
                height={255}
                animate={true}
                size={size}
                color={color}
                fillColor={fill ? fillColor : ""}
                items={items}
                tool={tool}
                onCompleteItem={(i) => wsClient.emit("addItem", i)}
              />
            </div>
            <div className={style.option}>
              <div className="options" style={{ marginBottom: 20 }}>
                <label htmlFor="">size: </label>
                <input
                  min="1"
                  max="20"
                  type="range"
                  value={size}
                  onChange={(e) =>
                    this.setState({ size: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="options" style={{ marginBottom: 20 }}>
                <label htmlFor="">color: </label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => this.setState({ color: e.target.value })}
                />
              </div>
              {this.state.tool === TOOL_ELLIPSE ||
              this.state.tool === TOOL_RECTANGLE ? (
                <div>
                  <label htmlFor="">fill in:</label>
                  <input
                    type="checkbox"
                    value={fill}
                    style={{ margin: "0 8" }}
                    onChange={(e) => this.setState({ fill: e.target.checked })}
                  />
                  {fill ? (
                    <span>
                      <label htmlFor="">with color:</label>
                      <input
                        type="color"
                        value={fillColor}
                        onChange={(e) =>
                          this.setState({ fillColor: e.target.value })
                        }
                      />
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
