export const playSound = () => {
    try {
        if (window.beepSoundPlaying) {
            return;
        }
        window.beepSoundPlaying = true;
        const audio = new Audio("/sfx/beep.mp3");
        audio.play();
        audio.onended = () => {
            setTimeout(() => {
                window.beepSoundPlaying = false;
            }, 3000);
        };
    } catch (error) {
        console.log(error);
    }
};
