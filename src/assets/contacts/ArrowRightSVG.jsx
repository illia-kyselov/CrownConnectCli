import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ArrowRightSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={10}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            fill="#C9890B"
            fillRule="evenodd"
            d="M8.464 10.592 3.75 15.307l-1.178-1.179 4.125-4.125-4.125-4.125L3.75 4.7l4.714 4.714a.833.833 0 0 1 0 1.178Z"
            clipRule="evenodd"
        />
    </Svg>
)
export default ArrowRightSVG
