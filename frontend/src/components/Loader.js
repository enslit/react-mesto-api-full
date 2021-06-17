import React from 'react';
import { number, string } from 'prop-types';

Part.propTypes = {
  step: number.isRequired,
  speed: number.isRequired,
  delay: number.isRequired,
  color: string.isRequired,
  size: number.isRequired,
  count: number.isRequired,
};

Loader.propTypes = {
  count: number,
  speed: number,
  color: string,
  size: number,
};

function Part({ step, speed, delay, color, size, count }) {
  const halfSize = size / 2;
  const width = (size / count) * 0.7;
  const height = halfSize * 0.6;

  return (
    <g transform={`rotate(${step} ${halfSize} ${halfSize})`}>
      <rect
        x={halfSize - width / 2}
        y="0"
        rx="3"
        ry="7"
        width={width}
        height={height}
        fill={color}
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur={`${speed}ms`}
          begin={`-${delay}ms`}
          repeatCount="indefinite"
        />
      </rect>
    </g>
  );
}

function Loader(props) {
  const { count = 10, speed = 1000, color = '#ffffff', size = 100 } = props;

  const buildParts = () => {
    const rotateStep = 360 / count;
    const delayStep = speed / count;
    const parts = [];

    for (let i = 0, j = speed; i < 360; i += rotateStep, j -= delayStep) {
      parts.push(
        <Part
          key={i}
          step={i}
          delay={j}
          speed={speed}
          color={color}
          size={size}
          count={count}
        />
      );
    }

    return parts;
  };

  return (
    <div className="loader">
      <svg
        className="loader__svg"
        width={`${size}px`}
        height={`${size}px`}
        preserveAspectRatio="xMidYMid"
      >
        {buildParts()}
      </svg>
    </div>
  );
}

export default Loader;
