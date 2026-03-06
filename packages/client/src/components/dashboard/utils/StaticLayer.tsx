import { Layer, Path } from 'react-konva';
import { getStroke } from 'perfect-freehand';
import { useDrawingStore } from '@/store/useCanvasStore';
import { getSvgPathFromStroke } from '@/utils/svgPathFromStroke';


export const StaticLayer = () => {
  const lines = useDrawingStore((state) => state.lines);
  const strokeColor = useDrawingStore((state) => state.strokeColor);

  return (
    <Layer>
      {lines.map((line, i) => {
        const stroke = getStroke(line, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        });

        const pathData = getSvgPathFromStroke(stroke);

        return <Path key={i} data={pathData} fill={strokeColor} />;
      })}
    </Layer>
  );
};