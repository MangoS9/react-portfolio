import React, { useState, useEffect, useRef } from 'react';
import './style/Loading_SCR.scss';

interface LoadingSCRProps {
    duration?: number;
}

function Loading_SCR({ duration = 4500 }: LoadingSCRProps) {
    const [count, setCount] = useState<number>(0);
    const [shakeIntensity, setShakeIntensity] = useState<number>(2);
    const [isShaking, setIsShaking] = useState<boolean>(true); // Track if shaking
    const startTime = useRef<number | null>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null); // Ref for h1

    useEffect(() => {
        const updateCounter = (timestamp: number) => {
            if (startTime.current === null) startTime.current = timestamp;

            const elapsed = timestamp - startTime.current;
            const percentage = Math.min((elapsed / duration) * 100, 100);
            setCount(Math.floor(percentage));

            if (elapsed >= duration) {
                setIsShaking(false); // Stop shaking when duration completes
            } else {
                requestAnimationFrame(updateCounter);
            }
        };

        const animationFrameId = requestAnimationFrame(updateCounter);
        return () => cancelAnimationFrame(animationFrameId);
    }, [duration]);

    useEffect(() => {
        if (isShaking) {
            const intervalId = setInterval(() => {
                setShakeIntensity((prev) => Math.min(prev + 1, 20));
            }, 1000);
            return () => clearInterval(intervalId);
        } else {
            setShakeIntensity(0); // Reset intensity to stop shaking
        }
    }, [isShaking]);

    useEffect(() => {
        if (logoRef.current) {
            logoRef.current.style.setProperty('--shake-intensity', `${shakeIntensity}px`);
        }

        if (!isShaking && h1Ref.current) {
            h1Ref.current.classList.add('stopped'); // Add the 'stopped' class to h1
        }
    }, [shakeIntensity, isShaking]);

    return (
        <div id="logo-container">
            <div id="logo-wrapper">
                <div id="logo" data-text="峁" ref={logoRef}>
                    <h1 ref={h1Ref}>峁</h1>
                </div>
                <div id="loading-count">{count}%</div>
            </div>
        </div>
    );
}

export default Loading_SCR;
