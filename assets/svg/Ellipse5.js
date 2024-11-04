import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const Ellipse5 = (props) => (
  <Svg
    width={602}
    height={83}
    viewBox="0 0 602 83"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M715 27.0007C715 87.752 530.376 207.501 312.5 207.501C94.6237 207.501 -88 87.7519 -88 27.0006C-88 -33.7507 94.6237 27.0006 312.5 27.0006C530.376 27.0006 715 -33.7507 715 27.0007Z"
      fill="url(#paint0_linear_84_218)"
      fillOpacity={0.65}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_84_218"
        x1={313.156}
        y1={-12.4994}
        x2={312}
        y2={142.501}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F9497D" />
        <Stop offset={0.557356} stopColor="#FFD7D7" />
        <Stop offset={1} stopColor="white" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Ellipse5;
