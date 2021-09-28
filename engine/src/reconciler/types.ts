import ReactReconciler from "react-reconciler";

/*
container = [
  {
    type: "Text",
    texts: [
      {type: "_text", value: "色なしテキスト"},
      {type: "Style", value: "色付きテキスト", color: "red"}
    ],
  }
  {
    type: "Goto",
    to: "チャプター2"
  }
]
*/
export type ADVXNode = TextNode | StyleTextNode | ActionNode;
export type TopLevelNode = TextNode | ActionNode;
export type LowLevelNode = PlainTextNode | StyleTextNode;

export type TextNode = {
  type: "Text";
  texts: LowLevelNode[];
};

export type PlainTextNode = {
  type: "Plain";
  value: string;
};

export type StyleTextNode = {
  type: "Style";
  value: string;
  props: any;
};

export type ActionNode = {
  type: "Action";
  action: () => void;
};

export type HostConfig = ReactReconciler.HostConfig<
  ADVXNode["type"], // Type
  any, // Props
  TopLevelNode[], // Container
  ADVXNode, // Instance
  PlainTextNode, // TextInstance
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  -1
>;
