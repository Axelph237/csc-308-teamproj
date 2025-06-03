import {ComponentProps} from 'react';

interface LineProps extends ComponentProps<"line"> {
    vertical?: boolean;
    strokeWidth: number,
}

export default function SvgLine({ vertical = false, strokeWidth, ...lineProps }: LineProps) {
    const x1 = vertical ? strokeWidth / 2 + "px" : "0%";
    const y1 = vertical ? "0%" : strokeWidth / 2 + "px";
    const x2 = vertical ? strokeWidth / 2 + "px" : "100%";
    const y2 = vertical ? "100%" : strokeWidth / 2 + "px";

    return (
        <svg style={vertical ? { width: strokeWidth } : { height: strokeWidth }}>
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={strokeWidth}
                {...lineProps} />
        </svg>
    );
};