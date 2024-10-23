import { useState, useEffect, useRef } from 'react';
import './style/Loading_SCR.scss';

interface LoadingSCRProps {
    duration?: number;
    onStart: () => void;
    onProgress: (progress: number) => void;
    loadingStarted: boolean;
}

function Loading_SCR({ duration = 1000, onStart, onProgress, loadingStarted }: LoadingSCRProps) {
    const [count, setCount] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false); // Control animation start
    const startTime = useRef<number | null>(null);
    const logoContainerRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (!loadingStarted) {
            onStart(); // Notify App that loading started
            setIsActive(true); // Enable animations
            logoContainerRef.current?.classList.add('start-animation'); // Start animation
        }
    };

    useEffect(() => {
        if (isActive && loadingStarted) { // Only start counter when active
            const updateCounter = (timestamp: number) => {
                if (startTime.current === null) startTime.current = timestamp;

                const elapsed = timestamp - startTime.current;
                const percentage = Math.min((elapsed / duration) * 100, 100);
                setCount(Math.floor(percentage));
                onProgress(Math.floor(percentage));

                if (elapsed >= duration) {
                    logoContainerRef.current?.classList.add('completed'); // Optional: Add completed class
                } else {
                    requestAnimationFrame(updateCounter);
                }
            };

            const animationFrameId = requestAnimationFrame(updateCounter);
            return () => cancelAnimationFrame(animationFrameId);
        }
    }, [isActive, loadingStarted, duration, onProgress]);

    return (
        <div
            id="logo-container"
            ref={logoContainerRef}
            className={`paused`}
            onClick={handleClick}
        >
            <div id="logo-wrapper">
                <div id="logo" data-text="峁">
                    <h1 className={count === 100 ? 'stopped' : ''}>峁</h1>
                </div>
                <div id="loading-count" className={count === 100 ? 'access-granted' : ''}>
                    {loadingStarted ? (count === 100 ? 'Access Granted' : `${count}%`) : 'Press me'}
                </div>
            </div>
        </div>
    );
}

export default Loading_SCR;
