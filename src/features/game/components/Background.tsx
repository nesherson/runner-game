import { extend, useTick } from "@pixi/react";
import { useEffect, useState } from "react";

import { Assets, Texture, TilingSprite } from "pixi.js";

extend({
	TilingSprite,
});

interface Props {
	isGamePlaying: boolean;
	appWidth: number;
	appHeight: number;
	backgroundSpeed: number;
}

function Background({
	appWidth,
	appHeight,
	backgroundSpeed,
	isGamePlaying,
}: Props) {
	const [xPos, setXPos] = useState(0);
	const [texture, setTexture] = useState(Texture.EMPTY);

	useEffect(() => {
		if (texture === Texture.EMPTY) {
			Assets.load("/assets/background/background.png").then((result) =>
				setTexture(result),
			);
		}
	}, [texture]);

	useTick((t) => {
		if (!isGamePlaying) return;

		setXPos((prev) => prev - backgroundSpeed * t.deltaTime);
	});

	return (
		<pixiTilingSprite
			texture={texture}
			scale={{ x: 1.5, y: 1.5 }}
			width={appWidth}
			height={appHeight}
			tilePosition={{ x: xPos, y: 0 }}
			tileScale={{ x: 0.5, y: 0.5 }}
		/>
	);
}

export default Background;
