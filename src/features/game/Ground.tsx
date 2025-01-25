import { useState } from "react";
import { useTick, Container, Sprite } from "@pixi/react";

import groundTile from "../../assets/ground/tile_ground.png";

function Ground({ appWidth, appHeight, startX }: { appWidth: number, appHeight: number, startX: number }) {
    const groundHeight = 36;
    const groundWidth = 80;
  
    const [xPos, setXPos] = useState(startX);
      
    const groundTiles = Array.from({ length: 11 }, (_, i) => {
      return {
        i: i,
        image: groundTile,
        x: xPos + i * groundWidth,
        y: appHeight - groundHeight,
        height: groundHeight,
        width: groundWidth
      };
    });
  
    useTick(d => {
      let tempXPos = xPos - 3;
  
      if (tempXPos <= -appWidth) {
        tempXPos = appWidth;
        setXPos(tempXPos);
      }
      else {
        setXPos(tempXPos);
      }
    });
  
    return (
      <Container>
        {groundTiles.map(gt => (
          <Sprite
            key={gt.i}
            image={gt.image}
            height={gt.height}
            width={gt.width}
            x={gt.x}
            y={gt.y}
          />
        ))
        }
      </Container>
    );
  }

  export default Ground;