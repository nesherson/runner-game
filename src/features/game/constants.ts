export const APP_WIDTH = 800;
export const APP_HEIGHT = 600;

export const ANIMATION_SPEED = 0.1;
export const BACKGROUND_SPEED = 0.7;
export const SIZE_SCALE = (APP_WIDTH / APP_HEIGHT);

export const GROUND_Y_SCALE = SIZE_SCALE * 1.5;
export const GROUND_HEIGHT = 18 * GROUND_Y_SCALE;
export const GROUND_SPEED = 2.95;

export const OBSTACLE_SIZE_SCALE = SIZE_SCALE * 1.5;
export const OBSTACLE_MIN_SPACING = 200;
export const OBSTACLE_MAX_SPACING = 650;
export const OBSTACLE_SPEED = 3.5;
export const OBSTACLE_COUNT = 7;

export const PLAYER_SIZE_SCALE = SIZE_SCALE * 1.5;
export const PLAYER_HEIGHT = 23 * PLAYER_SIZE_SCALE;
export const PLAYER_WIDTH = 20 * PLAYER_SIZE_SCALE;
export const PLAYER_JUMP_HEIGHT = 70 * PLAYER_SIZE_SCALE;
export const PLAYER_JUMP_STRENGTH = 5.4;
export const PLAYER_FALL_STRENGTH = 5.55;
export const PLAYER_ORIGINAL_Y_POS = APP_HEIGHT - GROUND_HEIGHT - PLAYER_HEIGHT;

export const SCORE_INCREASE_SPEED = 0.3;
export const X_COLLISION_OFFSET = 3;
export const Y_COLLISION_OFFSET = 3;