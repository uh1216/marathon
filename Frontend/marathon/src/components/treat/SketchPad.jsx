import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import style from "./SketchPad.module.css";
import {
  Pencil,
  TOOL_PENCIL,
  Line,
  TOOL_LINE,
  Ellipse,
  TOOL_ELLIPSE,
  Rectangle,
  TOOL_RECTANGLE,
} from "./tools";

export const toolsMap = {
  [TOOL_PENCIL]: Pencil,
  [TOOL_LINE]: Line,
  [TOOL_RECTANGLE]: Rectangle,
  [TOOL_ELLIPSE]: Ellipse,
};

export default class SketchPad extends Component {
  tool = null;
  interval = null;

  static defaultProps = {
    width: 500,
    height: 500,
    color: "#000",
    size: 5,
    fillColor: "",
    canvasClassName: "canvas",
    debounceTime: 1000,
    animate: true,
    tool: TOOL_PENCIL,
    toolsMap,
  };

  constructor(props) {
    super(props);
    this.initTool = this.initTool.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDebouncedMove = this.onDebouncedMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    this.canvas = findDOMNode(this.canvasRef);
    this.ctx = this.canvas.getContext("2d");
    this.initTool(this.props.tool);
  }

  componentWillReceiveProps({ tool, items }) {
    items
      .filter((item) => {
        return this.props.items.indexOf(item) === -1;
      })
      .forEach((item) => {
        this.initTool(item.tool);
        this.tool.draw(item, this.props.animate);
      });
    this.initTool(tool);
  }

  initTool(tool) {
    this.tool = this.props.toolsMap[tool](this.ctx);
  }

  onMouseDown(e) {
    const data = this.tool.onMouseDown(
      ...this.getCursorPosition(e),
      this.props.color,
      this.props.size,
      this.props.fillColor
    );
    data &&
      data[0] &&
      this.props.onItemStart &&
      this.props.onItemStart.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      this.interval = setInterval(
        this.onDebouncedMove,
        this.props.debounceTime
      );
    }
  }

  onDebouncedMove() {
    if (
      typeof this.tool.onDebouncedMouseMove == "function" &&
      this.props.onDebouncedItemChange
    ) {
      this.props.onDebouncedItemChange.apply(
        null,
        this.tool.onDebouncedMouseMove()
      );
    }
  }

  onMouseMove(e) {
    const data = this.tool.onMouseMove(...this.getCursorPosition(e));
    data &&
      data[0] &&
      this.props.onEveryItemChange &&
      this.props.onEveryItemChange.apply(null, data);
  }

  onMouseUp(e) {
    const data = this.tool.onMouseUp(...this.getCursorPosition(e));
    data &&
      data[0] &&
      this.props.onCompleteItem &&
      this.props.onCompleteItem.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  getCursorPosition(e) {
    const { top, left } = this.canvas.getBoundingClientRect();
    return [e.clientX - left, e.clientY - top];
  }

  render() {
    const { width, height, canvasClassName } = this.props;
    return (
      <canvas
        ref={(canvas) => {
          this.canvasRef = canvas;
        }}
        className={`${canvasClassName} ${style.white_board}`}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseUp}
        onMouseUp={this.onMouseUp}
        width={width}
        height={height}
      />
    );
  }
}
