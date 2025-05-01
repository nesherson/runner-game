import {
	AnimatedSprite,
	Assets,
	type Texture,
	Text,
	type TextureSource,
	type ImageSource,
} from "pixi.js";

import type { Player as PlayerType } from "../types/types";
import { useExtend } from "@pixi/react";
import { useState, useEffect, useRef } from "react";

interface Props {
	player: PlayerType;
	isGamePlaying: boolean;
}

function Player({ player, isGamePlaying }: Props) {
	useExtend({ AnimatedSprite, Text });
	const playerRef = useRef<AnimatedSprite>(null);
	const [textures, setTextures] = useState<
		Texture<TextureSource<ImageSource>>[]
	>([]);

	useEffect(() => {
		if (textures.length === 0) {
			Assets.load(player.textures).then((result) => {
				const tempTextures = [];

				for (const [_, value] of Object.entries(result)) {
					tempTextures.push(value);
				}

				setTextures(tempTextures);
			});
		}
	}, [player.textures, textures]);

	useEffect(() => {
		if (isGamePlaying && playerRef.current) {
			playerRef.current.play();
		}
	}, [isGamePlaying]);

	return (
		<>
			{textures.length > 0 && (
				<pixiAnimatedSprite
					ref={playerRef}
					textures={textures}
					height={player.height}
					width={player.width}
					x={player.x}
					y={player.y}
					animationSpeed={player.animationSpeed}
				/>
			)}
		</>
	);
}

export default Player;
