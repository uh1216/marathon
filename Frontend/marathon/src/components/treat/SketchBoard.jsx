import React, { useEffect, useState } from "react";
import SketchPad from "./SketchPad";
import { TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE } from "./tools";
import style from "./SketchBoard.module.css";
import Pencil from "img/icon/pencil.png";
import Line from "img/icon/line.png";
import Rentangle from "img/icon/rectangle.png";
import Ellipse from "img/icon/ellipse.png";

export default function SketchBoard({ channelId, stompClient, items }) {
  const [tool, setTool] = useState(TOOL_PENCIL);
  const [size, setSize] = useState(2);
  const [color, setColor] = useState("#000000");
  const [fill, setFill] = useState(false);
  const [fillColor, setFillColor] = useState("#444444");

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
        <div className={style.body}>
          <SketchPad
            width={540}
            height={285}
            animate={true}
            size={size}
            color={color}
            fillColor={fill ? fillColor : ""}
            items={items}
            tool={tool}
            onCompleteItem={(i) => {
              submit(i);
            }}
          />
          <div className={style.right_side}>
            <div className={style.tools}>
              <button
                style={
                  tool === TOOL_PENCIL ? { fontWeight: "bold" } : undefined
                }
                className={`${tool === TOOL_PENCIL ? "item-active" : "item"} ${
                  tool === TOOL_PENCIL ? style.icon : style.icon2
                }`}
                onClick={() => setTool(TOOL_PENCIL)}
              >
                <img class={style.icon_img} src={Pencil} alt="" />
              </button>
              <button
                style={tool === TOOL_LINE ? { fontWeight: "bold" } : undefined}
                className={`${tool === TOOL_LINE ? "item-active" : "item"} ${
                  tool === TOOL_LINE ? style.icon : style.icon2
                }`}
                onClick={() => setTool(TOOL_LINE)}
              >
                <img class={style.icon_img} src={Line} alt="" />
              </button>
              <button
                style={
                  tool === TOOL_ELLIPSE ? { fontWeight: "bold" } : undefined
                }
                className={`${tool === TOOL_ELLIPSE ? "item-active" : "item"} ${
                  tool === TOOL_ELLIPSE ? style.icon : style.icon2
                }`}
                onClick={() => setTool(TOOL_ELLIPSE)}
              >
                <img class={style.icon_img} src={Ellipse} alt="" />
              </button>
              <button
                style={
                  tool === TOOL_RECTANGLE ? { fontWeight: "bold" } : undefined
                }
                className={`${
                  tool === TOOL_RECTANGLE ? "item-active" : "item"
                } ${tool === TOOL_RECTANGLE ? style.icon : style.icon2}`}
                onClick={() => setTool(TOOL_RECTANGLE)}
              >
                <img class={style.icon_img} src={Rentangle} alt="" />
              </button>
            </div>
            <div className={style.options}>
              <div className={style.option + " " + style.option_div}>
                <label htmlFor="">두께</label>
                <input
                  className={style.input_range}
                  min="1"
                  max="50"
                  type="range"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                />
              </div>
              <div className={style.option + " " + style.option_span}>
                <label htmlFor="">색상 &nbsp;</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              {tool === TOOL_ELLIPSE || tool === TOOL_RECTANGLE ? (
                <div className={style.fill}>
                  <div className={style.option + " " + style.option_span}>
                    <label htmlFor="">채우기 &nbsp;</label>
                    <input
                      className={style.input_checkbox}
                      type="checkbox"
                      value={fill}
                      style={{ margin: "0 8" }}
                      onChange={(e) => setFill(e.target.checked)}
                    />
                  </div>
                  <div className={style.option}>
                    {fill ? (
                      <div className={style.option_span}>
                        <label htmlFor="">채우기 색 &nbsp;</label>
                        <input
                          type="color"
                          value={fillColor}
                          onChange={(e) => setFillColor(e.target.value)}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
