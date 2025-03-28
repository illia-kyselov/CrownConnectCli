import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CloseSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={33}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            d="M10.4 23.5 9 22.1l5.6-5.6L9 10.9l1.4-1.4 5.6 5.6 5.6-5.6 1.4 1.4-5.6 5.6 5.6 5.6-1.4 1.4-5.6-5.6-5.6 5.6Z"
        />
    </Svg>
)
export default CloseSVG
