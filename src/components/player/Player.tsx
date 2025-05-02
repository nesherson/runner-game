import {
	AnimatedSprite,
	Assets,
	Spritesheet,
	Text,
	type Texture,
	type TextureSource
} from "pixi.js";

import { useExtend } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import type { Player as PlayerType } from "../../types/types";
import { playerSpriteSheetData } from "./spritesheet";

interface IPlayerProps {
	player: PlayerType;
	isGamePlaying: boolean;
}

function Player({ player, isGamePlaying }: IPlayerProps) {
	useExtend({ AnimatedSprite, Text });

	const playerRef = useRef<AnimatedSprite>(null);
	const [animations, setAnimations] = useState<Texture<TextureSource<any>>[]>(
		[],
	);

	useEffect(() => {
		const loadSpriteSheet = async () => {
			const texture = await Assets.load(playerSpriteSheetData.meta.image);
			const spritesheet = new Spritesheet(texture, playerSpriteSheetData);

			await spritesheet.parse();

			setAnimations(spritesheet.animations.player);
		};

		loadSpriteSheet();
	}, []);

	useEffect(() => {
		if (!playerRef.current) return;

		if (isGamePlaying) {
			playerRef.current.play();
		} else {
			playerRef.current.stop();
		}
	}, [isGamePlaying]);

	return (
		<>
			{animations.length > 0 && (
				<pixiAnimatedSprite
					ref={playerRef}
					textures={animations}
					x={player.x}
					y={player.y}
					scale={2}
					animationSpeed={player.animationSpeed}
				/>
			)}
		</>
	);
}

export default Player;
