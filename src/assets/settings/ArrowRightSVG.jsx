import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ArrowRightSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            d="M8.355 5.642a1 1 0 0 0 0 1.414l4.95 4.95-4.95 4.95a1 1 0 0 0 1.414 1.414l5.657-5.657a1 1 0 0 0 0-1.414L9.769 5.642a1 1 0 0 0-1.414 0Z"
        />
    </Svg>
)
export default ArrowRightSVG
