import { Howl } from "howler"

export function playJumpSound() {
    const howl = new Howl({
        src: ["/assets/sounds/jump.wav"]
    });

    howl.play();
}

export function playCollisionSound() {
    const howl = new Howl({
        src: ["/assets/sounds/collision.wav"]
    });

    howl.play();
}

export function playScoreMilestone() {
    const howl = new Howl({
        src: ["/assets/sounds/score-milestone.wav"]
    });

    howl.play();
}