import React, { useState } from 'react';

export default function ImageZoom({ src, alt, style, className }) {
    const [isZoomed, setIsZoomed] = useState(false);

    if (!src) return null;

    return (
        <>
            {/* Standard Image Thumbnail */}
            <img
                src={src}
                alt={alt}
                className={`${className || ''}`}
                style={{ ...style, cursor: 'zoom-in' }}
                onClick={() => setIsZoomed(true)}
            />

            {/* Premium Fullscreen Zoom Overlay Modal */}
            {isZoomed && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'zoom-out',
                        animation: 'fadeIn 0.2s ease-out',
                        backdropFilter: 'blur(5px)', // Glassmorphism backdrop blur
                    }}
                    onClick={() => setIsZoomed(false)}
                >
                    {/* CSS Animation Keyframes */}
                    <style>{`
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes zoomIn {
                            from { transform: scale(0.92); opacity: 0; }
                            to { transform: scale(1); opacity: 1; }
                        }
                    `}</style>

                    <div 
                        style={{ 
                            position: 'relative', 
                            width: '90%', 
                            height: '90%', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center' 
                        }}
                    >
                        <img
                            src={src}
                            alt={alt}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                animation: 'zoomIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                                borderRadius: '6px',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                            }}
                        />

                        {/* Floating Close Button */}
                        <button
                            type="button"
                            onClick={() => setIsZoomed(false)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                border: 'none',
                                color: '#fff',
                                fontSize: '24px',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'background 0.2s, transform 0.1s',
                                backdropFilter: 'blur(3px)',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.4)';
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            &times;
                        </button>

                        {/* Caption Overlay */}
                        {alt && alt !== "Report" && alt !== "Process" && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    background: 'rgba(0, 0, 0, 0.6)',
                                    color: '#fff',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    backdropFilter: 'blur(3px)',
                                    pointerEvents: 'none',
                                }}
                            >
                                {alt}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
