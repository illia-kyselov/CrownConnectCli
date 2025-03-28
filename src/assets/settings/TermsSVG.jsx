import * as React from "react"
import Svg, { Path } from "react-native-svg"
const TermsSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <Path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5.333 5.334v21.333A2.667 2.667 0 0 0 8 29.334h16a2.667 2.667 0 0 0 2.667-2.667V11.123a2.668 2.668 0 0 0-.803-1.907l-5.92-5.789a2.667 2.667 0 0 0-1.864-.76H8a2.667 2.667 0 0 0-2.667 2.667Z"
        />
        <Path
            stroke="#fff"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.666 2.667V8a2.667 2.667 0 0 0 2.667 2.667h5.334"
        />
    </Svg>
)
export default TermsSVG
