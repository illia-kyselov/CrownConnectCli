import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
const EditSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={44}
        height={44}
        fill="none"
        {...props}
    >
        <G filter="url(#a)">
            <Path
                fill="#fff"
                d="M14 30v-3.778l11.733-11.71c.178-.164.375-.29.59-.379.215-.089.44-.133.677-.133.236 0 .466.044.689.133.223.09.415.223.578.4l1.222 1.245c.178.163.307.355.39.578a1.903 1.903 0 0 1 0 1.344c-.082.216-.212.412-.39.589L17.778 30H14Zm12.978-11.733 1.244-1.245-1.244-1.244-1.245 1.244 1.245 1.245Z"
            />
        </G>
        <Defs></Defs>
    </Svg>
)
export default EditSVG
