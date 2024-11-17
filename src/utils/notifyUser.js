const playNotificationSound = (mp3) => {
    const audio = new Audio(mp3);

    audio.play().catch((error) => {
        console.log('Playback blocked:', error);
    });
};

export const notifyUser = (mp3) => {
    if (Notification.permission === 'granted') {
        new Notification('You have a new message!');
        playNotificationSound(mp3);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification('You have a new message!');
                playNotificationSound(mp3);
            }
        });
    }
};