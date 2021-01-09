import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function LogoutSVG({width, height, style, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '30'}
      height={height || '30'}
      style={style}
      viewBox="0 0 95 95">
      <Path
        d="M85 46.069v30.277H10V26.013h32.169l11.749-10H2a2 2 0 00-2 2v66.333a2 2 0 002 2h91a2 2 0 002-2V36.292l-10 9.777z"
        fill={color || '#010002'}
      />
      <Path
        d="M26.714 55.262a1.999 1.999 0 003.288 2.198c18.6-20.485 36.109-23.547 44.895-23.549v8.354a2 2 0 003.414 1.414l15.803-15.805a2 2 0 000-2.828L78.311 9.24a2 2 0 00-3.414 1.414v7.371c-28.988 2.854-43.353 26.992-48.183 37.237z"
        fill={color || '#010002'}
      />
    </Svg>
  );
}
