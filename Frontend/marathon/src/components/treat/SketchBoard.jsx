import React, { useEffect, useState } from "react";
import SketchPad from "./SketchPad";
import { TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE } from "./tools";
import style from "./SketchBoard.module.css";

export default function SketchBoard({ channelId, stompClient, items }) {
  const [tool, setTool] = useState(TOOL_PENCIL);
  const [size, setSize] = useState(2);
  const [color, setColor] = useState("#000000");
  const [fill, setFill] = useState(false);
  const [fillColor, setFillColor] = useState("#444444");
  const [item, setItem] = useState(items);

  const submit = (item) => {
    if (!item) return;
    stompClient.send(
      "/sketch",
      {},
      JSON.stringify({
        channelId: channelId,
        content: JSON.stringify(item),
      })
    );
  };

  return (
    <div className={style.container}>
      <div className={style.tool_menu}>
        <div className="tools">
          <button
            style={tool === TOOL_PENCIL ? { fontWeight: "bold" } : undefined}
            className={`${tool === TOOL_PENCIL ? "item-active" : "item"}`}
            onClick={() => setTool(TOOL_PENCIL)}
          >
            연필
          </button>
          <button
            style={tool === TOOL_LINE ? { fontWeight: "bold" } : undefined}
            className={`${tool === TOOL_LINE ? "item-active" : "item"}`}
            onClick={() => setTool(TOOL_LINE)}
          >
            선
          </button>
          <button
            style={tool === TOOL_ELLIPSE ? { fontWeight: "bold" } : undefined}
            className={`${tool === TOOL_ELLIPSE ? "item-active" : "item"}`}
            onClick={() => setTool(TOOL_ELLIPSE)}
          >
            동그라미
          </button>
          <button
            style={tool === TOOL_RECTANGLE ? { fontWeight: "bold" } : undefined}
            className={`${tool === TOOL_RECTANGLE ? "item-active" : "item"}`}
            onClick={() => setTool(TOOL_RECTANGLE)}
          >
            네모
          </button>
        </div>
        <div className={style.body}>
          <div className={style.ducplicated}>{items.color}</div>
          <div className={style.white_board}>
            <SketchPad
              width={550}
              height={255}
              animate={true}
              size={items.size}
              color={items.color}
              fillColor={fill ? fillColor : ""}
              items={items.points}
              tool={items.tool}
              onCompleteItem={(i) => {
                submit(i);
              }}
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
                onChange={(e) => setSize(parseInt(e.target.value))}
              />
            </div>
            <div className="options" style={{ marginBottom: 20 }}>
              <label htmlFor="">color: </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            {tool === TOOL_ELLIPSE || tool === TOOL_RECTANGLE ? (
              <div>
                <label htmlFor="">fill in:</label>
                <input
                  type="checkbox"
                  value={fill}
                  style={{ margin: "0 8" }}
                  onChange={(e) => setFill(e.target.checked)}
                />
                {fill ? (
                  <span>
                    <label htmlFor="">with color:</label>
                    <input
                      type="color"
                      value={fillColor}
                      onChange={(e) => setFillColor(e.target.value)}
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
