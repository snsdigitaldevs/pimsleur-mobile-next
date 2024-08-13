import * as React from "react";
import Svg, { Circle, G, Rect } from "react-native-svg";

export const IconPause = ({ hasBg = true }: { hasBg?: boolean }) => (
  <Svg viewBox="0 0 65 65" width="100%" height="100%">
    <G fill="none" fillRule="evenodd">
      {hasBg && <Circle fill="#FFF" cx={32.5} cy={32.5} r={32.5} />}
      <Rect fill="#000" x={23} y={19} width={7} height={28} rx={1} />
      <Rect fill="#000" x={35} y={19} width={7} height={28} rx={1} />
    </G>
  </Svg>
);
