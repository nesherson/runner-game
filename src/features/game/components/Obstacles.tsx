import {
	AnimatedSprite as AnimatedSpriteType,
	Assets,
	ColorMatrixFilter,
	Container,
	type ImageSource,
	type Texture,
	type TextureSource,
} from "pixi.js";
import { useEffect, useRef, useState } from "react";
import type { Obstacle } from "../types/types";
import { useExtend } from "@pixi/react";

interface ObstaclesProps {
	obstacles: Obstacle[];
	isGamePlaying: boolean;
}

interface AnimatedSpriteWrapper {
	obstacle: Obstacle;
	isGamePlaying: boolean;
}

function Obstacles({ obstacles, isGamePlaying }: ObstaclesProps) {
	useExtend({ Container, AnimatedSpriteType });
	
	return obstacles.map((o) => (
		<AnimatedSpriteWrapper
			key={o.id}
			obstacle={o}
			isGamePlaying={isGamePlaying}
		/>
	));
}

function AnimatedSpriteWrapper({
	obstacle,
	isGamePlaying,
}: { obstacle: Obstacle; isGamePlaying: boolean }) {
	const spriteRef = useRef<null | AnimatedSpriteType>(null);
	const [textures, setTextures] = useState<
		Texture<TextureSource<ImageSource>>[]
	>([]);

	useEffect(() => {
		if (textures.length === 0) {
			Assets.load(obstacle.textures).then((result) => {
				const tempTextures = [];

				for (const [_, value] of Object.entries(result)) {
					tempTextures.push(value);
				}

				setTextures(tempTextures);
			});
		}
	}, [obstacle.textures, textures]);

	useEffect(() => {
		if (!spriteRef.current) return;

		if (isGamePlaying) {
			spriteRef.current.play();
		} else {
			spriteRef.current.stop();
		}
	}, [isGamePlaying]);

	return (
		<pixiContainer filters={[new ColorMatrixFilter()]}>
			{textures.length > 0 && (
				<pixiAnimatedSprite
					ref={spriteRef}
					textures={textures}
					height={obstacle.height}
					width={obstacle.width}
					x={obstacle.x}
					y={obstacle.y}
					animationSpeed={obstacle.animationSpeed}
				/>
			)}
		</pixiContainer>
	);
}

export default Obstacles;
