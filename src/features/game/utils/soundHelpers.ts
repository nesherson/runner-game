import { Howl } from "howler"

export function playJumpSound() {
    const howl = new Howl({
        src: ["/sounds/jump.wav"]
    });

    howl.play();
}

export function playCollisionSound() {
    const howl = new Howl({
        src: ["/sounds/collision.wav"]
    });

    howl.play();
}

export function playScoreMilestone() {
    const howl = new Howl({
        src: ["/sounds/score-milestone.wav"]
    });

    howl.play();
}