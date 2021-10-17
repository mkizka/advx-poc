import type { ComponentProps } from "react";
import { PixiComponent, Text } from "@inlet/react-pixi";
import { HTMLText as PixiHTMLText } from "@pixi/text-html";
import { TextStyle } from "pixi.js";

type Style = ComponentProps<typeof Text>["style"];

function getTextStyle(style: Style) {
  return style instanceof TextStyle ? style : new TextStyle(style);
}

export const HTMLText = PixiComponent<
  { text: string; style?: ComponentProps<typeof Text>["style"] },
  PixiHTMLText
>("HTMLText", {
  create: (props) => {
    const { text, style } = props;
    return new PixiHTMLText(text, getTextStyle(style));
  },
  applyProps: (instance, _, newProps) => {
    const { text, style } = newProps;
    instance.text = text;
    instance.style = getTextStyle(style);
  },
});
