import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CalendarSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={33}
        fill="none"
        {...props}
    >
        <Path fill="#fff" d="M23 9.5H9v3h14v-3Z" />
        <Path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 8.5h7c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-14c0-.55.45-1 1-1h7ZM11 8.5v-2m10 2v-2M11 15.5h10M11 19.5h7"
        />
    </Svg>
)
export default CalendarSVG
