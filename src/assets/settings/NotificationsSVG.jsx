import * as React from "react"
import Svg, { Path } from "react-native-svg"
const NotificationsSVG = (props) => (
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
            d="M8 25.334v-12a8 8 0 0 1 16 0v12m-16 0h16m-16 0H5.333m18.667 0h2.667m-12 4h2.666"
        />
        <Path
            stroke="#fff"
            strokeWidth={1.5}
            d="M16 5.334a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667Z"
        />
    </Svg>
)
export default NotificationsSVG
