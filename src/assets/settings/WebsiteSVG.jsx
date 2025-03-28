import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const WebsiteSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <G
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#a)"
        >
            <Path d="M30.667 16a14.667 14.667 0 0 1-29.334 0m29.334 0a14.666 14.666 0 1 0-29.334 0m29.334 0H1.333" />
            <Path d="M21.641 16a25.317 25.317 0 0 1-5.64 14.666A25.317 25.317 0 0 1 10.358 16 25.317 25.317 0 0 1 16 1.333 25.317 25.317 0 0 1 21.641 16Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h32v32H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default WebsiteSVG
