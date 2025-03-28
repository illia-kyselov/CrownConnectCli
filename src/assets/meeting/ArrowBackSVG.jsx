import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ArrowBackSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={44}
        height={44}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            d="M20.731 30.331a1.6 1.6 0 0 1-2.262 0l-7.2-7.2a1.6 1.6 0 0 1 0-2.262l7.2-7.2a1.6 1.6 0 0 1 2.262 2.262l-4.33 4.47h15.2a1.6 1.6 0 0 1 0 3.2H16.4l4.33 4.468a1.6 1.6 0 0 1 0 2.262Z"
        />
    </Svg>
)
export default ArrowBackSVG
