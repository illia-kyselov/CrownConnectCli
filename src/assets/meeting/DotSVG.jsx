import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DotSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={8}
        height={14}
        fill="none"
        {...props}
    >
        <Path
            fill="#999"
            d="M4 5.667a1.333 1.333 0 1 0 0 2.666 1.333 1.333 0 0 0 0-2.667Z"
        />
    </Svg>
)
export default DotSVG
