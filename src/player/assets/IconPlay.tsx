import * as React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";

export const IconPlay = ({ hasBg = true }: { hasBg?: boolean }) => (
  <Svg viewBox="0 0 65 65" width="100%" height="100%">
    <G fill="none" fillRule="evenodd">
      {hasBg && <Circle fill="#FFF" cx={32.5} cy={32.5} r={32.5} />}
      <Path
        d="M45.43 33.35l-18.914 11.4A1 1 0 0 1 25 43.894v-22.8a1 1 0 0 1 1.516-.856l18.914 11.4a1 1 0 0 1 0 1.713z"
        fill="#000"
      />
    </G>
  </Svg>
);
