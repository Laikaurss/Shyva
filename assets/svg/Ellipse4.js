import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const Ellipse4 = (props) => (
  <Svg
    width={602}
    height={607}
    viewBox="0 0 602 607"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M696 303.5C696 471.118 519.376 607 301.5 607C83.6237 607 -93 471.118 -93 303.5C-93 135.882 68.6237 -243 286.5 -243C504.376 -243 696 135.882 696 303.5Z"
      fill="url(#paint0_linear_84_60)"
      fillOpacity={0.7}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_84_60"
        x1={301}
        y1={2.50001}
        x2={301.609}
        y2={552.499}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" />
        <Stop offset={1} stopColor="#F7054F" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Ellipse4
