import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function AboutSVG({width, height, style, color}) {
  return (
    <Svg
      width={width || '30'}
      height={height || '30'}
      style={style}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M256 512c-68.38 0-132.667-26.628-181.02-74.98S0 324.38 0 256 26.628 123.333 74.98 74.98 187.62 0 256 0s132.667 26.628 181.02 74.98S512 187.62 512 256s-26.628 132.667-74.98 181.02S324.38 512 256 512zm0-480C132.486 32 32 132.486 32 256s100.486 224 224 224 224-100.486 224-224S379.514 32 256 32z"
        fill={color || '#010002'}
      />
      <Path
        d="M256 368c-8.836 0-16-7.164-16-16 0-40.386 15.727-78.354 44.285-106.912C302.157 227.215 312 203.453 312 178.177 312 150.509 289.491 128 261.823 128h-3.646C230.509 128 208 150.509 208 178.177V184c0 8.836-7.164 16-16 16s-16-7.164-16-16v-5.823C176 132.864 212.864 96 258.177 96h3.646C307.136 96 344 132.864 344 178.177c0 33.823-13.171 65.622-37.088 89.539C284.398 290.229 272 320.162 272 352c0 8.836-7.164 16-16 16zM256.02 432c-8.836 0-16.005-7.164-16.005-16s7.158-16 15.995-16h.01c8.836 0 16 7.164 16 16s-7.164 16-16 16z"
        fill={color || '#010002'}
      />
    </Svg>
  );
}