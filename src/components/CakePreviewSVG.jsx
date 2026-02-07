import { motion } from 'framer-motion';
import './CakePreviewSVG.css';

function CakePreviewSVG({ shape = 'round', tiers = 1, decoration = 'buttercream' }) {
    // Color schemes based on decoration type
    const decorationColors = {
        marzipan: { primary: '#FFE5B4', secondary: '#FFD700', accent: '#FFA500', shadow: '#E6AC00' },
        chocolate: { primary: '#8B4513', secondary: '#A0522D', accent: '#D2691E', shadow: '#5D4037' },
        fondant: { primary: '#FFB6C1', secondary: '#FF69B4', accent: '#FF1493', shadow: '#C2185B' },
        buttercream: { primary: '#FFF8DC', secondary: '#FFE4B5', accent: '#FFDAB9', shadow: '#D7CCC8' }
    };

    const colors = decorationColors[decoration] || decorationColors.buttercream;

    // Generate tiers array
    const tiersArray = Array.from({ length: tiers }, (_, i) => i);

    // SVG components for different shapes
    const renderTierSVG = (tierIndex, tierCount) => {
        const baseWidth = 180;
        const reduction = 35;
        const width = baseWidth - (tierIndex * reduction);
        const height = 40 + tierIndex * 6;
        const y = tierIndex * 45;

        // Common props for 3D effect
        const gradientId = `gradient-${tierIndex}`;

        switch (shape) {
            case 'round':
                const rx = width / 2;
                const ry = height / 4;
                // High Density Layering for smooth 3D sides
                const roundDepth = 15;
                const roundLayers = 20;

                return (
                    <g key={tierIndex}>
                        {/* 1. Side Walls (Dense Stacking) */}
                        {Array.from({ length: roundLayers }).map((_, i) => (
                            <ellipse
                                key={`side-${i}`}
                                cx="150"
                                cy={150 - y}
                                rx={rx}
                                ry={ry}
                                fill={colors.secondary}
                                stroke={colors.secondary}
                                strokeWidth="0.5"
                                transform={`translate(0, ${(roundLayers - i) * (roundDepth / roundLayers)})`}
                            />
                        ))}

                        {/* 2. Main Body (Just below top) */}
                        <ellipse
                            cx="150"
                            cy={150 - y}
                            rx={rx}
                            ry={ry}
                            fill={`url(#${gradientId})`}
                            stroke="none"
                            transform="translate(0, 1)"
                        />

                        {/* 3. Top Surface (Light & Clean) */}
                        <ellipse
                            cx="150"
                            cy={150 - y}
                            rx={rx}
                            ry={ry}
                            fill={colors.primary}
                            stroke="rgba(255, 255, 255, 0.4)"
                            strokeWidth="1"
                        />

                        {/* 4. Frosting / Decoration Lines */}
                        <ellipse
                            cx="150"
                            cy={150 - y}
                            rx={rx * 0.7}
                            ry={ry * 0.7}
                            fill="none"
                            stroke={colors.accent}
                            strokeWidth="1.5"
                            opacity="0.5"
                        />
                    </g>
                );

            case 'square':
                return (
                    <g key={tierIndex}>
                        <rect
                            x={150 - width / 2}
                            y={150 - y}
                            width={width}
                            height={height}
                            fill={`url(#${gradientId})`}
                            stroke="rgba(255, 255, 255, 0.5)"
                            strokeWidth="2"
                            rx="4"
                        />
                        <rect
                            x={150 - width / 2}
                            y={150 - y - 5}
                            width={width}
                            height={10}
                            fill={colors.primary}
                            opacity="0.8"
                            rx="4"
                        />
                        {[0, 1, 2].map((i) => (
                            <line
                                key={i}
                                x1={150 - width / 2 + 10}
                                y1={150 - y + (i * height / 3)}
                                x2={150 + width / 2 - 10}
                                y2={150 - y + (i * height / 3)}
                                stroke={colors.accent}
                                strokeWidth="2"
                                opacity="0.6"
                            />
                        ))}
                    </g>
                );

            case 'heart':
                const heartCenterX = 150;
                const heartCenterY = 150 - y;
                // Wider and rounder heart shape
                const heartWidth = width * 1.0;
                const heartHeight = height * 1.0;

                // Ultra Smooth Round Heart Path
                const heartPath = `
                    M ${heartCenterX} ${heartCenterY + heartHeight * 0.25}
                    C ${heartCenterX} ${heartCenterY - heartHeight * 0.1} 
                      ${heartCenterX - heartWidth / 2} ${heartCenterY - heartHeight * 0.4} 
                      ${heartCenterX - heartWidth / 2} ${heartCenterY - heartHeight * 0.1}
                    C ${heartCenterX - heartWidth / 2} ${heartCenterY + heartHeight * 0.3} 
                      ${heartCenterX - heartWidth / 4} ${heartCenterY + heartHeight * 0.5} 
                      ${heartCenterX} ${heartCenterY + heartHeight * 0.75}
                    C ${heartCenterX + heartWidth / 4} ${heartCenterY + heartHeight * 0.5} 
                      ${heartCenterX + heartWidth / 2} ${heartCenterY + heartHeight * 0.3} 
                      ${heartCenterX + heartWidth / 2} ${heartCenterY - heartHeight * 0.1}
                    C ${heartCenterX + heartWidth / 2} ${heartCenterY - heartHeight * 0.4} 
                      ${heartCenterX} ${heartCenterY - heartHeight * 0.1} 
                      ${heartCenterX} ${heartCenterY + heartHeight * 0.25}
                    Z
                `;

                // High Density Layering for smooth 3D sides
                const depth = 12;
                const layers = 20;

                return (
                    <g key={tierIndex}>
                        {/* 1. Deepest Shadow (Base) */}
                        <path
                            d={heartPath}
                            fill={colors.shadow}
                            stroke="none"
                            transform={`translate(0, ${depth})`}
                            opacity="0.5"
                            filter="blur(1px)"
                        />

                        {/* 2. Side Walls (Dense Stacking) */}
                        {Array.from({ length: layers }).map((_, i) => (
                            <path
                                key={`side-${i}`}
                                d={heartPath}
                                fill={colors.secondary} // Use secondary color for sides
                                stroke={colors.secondary} // Stroke helps fill gaps
                                strokeWidth="0.5"
                                transform={`translate(0, ${(layers - i) * (depth / layers)})`}
                                opacity="1"
                            />
                        ))}

                        {/* 3. Main Body Gradient (Just below top) */}
                        <path
                            d={heartPath}
                            fill={`url(#${gradientId})`}
                            stroke="none"
                            transform="translate(0, 1)"
                        />

                        {/* 4. Top Surface (Light & Clean) */}
                        <path
                            d={heartPath}
                            fill={colors.primary}
                            fillOpacity="1"
                            stroke="rgba(255,255,255,0.5)"
                            strokeWidth="1"
                            transform="translate(0, 0)"
                        />

                        {/* 5. Inner Decoration (Elegant Line) */}
                        <path
                            d={heartPath}
                            fill="none"
                            stroke={colors.accent}
                            strokeWidth="1.5"
                            transform="scale(0.8) translate(30, 20)"
                            opacity="0.6"
                        />
                    </g>
                );

            case 'rectangle':
                const rectWidth = width * 1.3;
                return (
                    <g key={tierIndex}>
                        <rect
                            x={150 - rectWidth / 2}
                            y={150 - y}
                            width={rectWidth}
                            height={height}
                            fill={`url(#${gradientId})`}
                            stroke="rgba(255, 255, 255, 0.5)"
                            strokeWidth="2"
                            rx="4"
                        />
                        <rect
                            x={150 - rectWidth / 2}
                            y={150 - y - 5}
                            width={rectWidth}
                            height={10}
                            fill={colors.primary}
                            opacity="0.8"
                            rx="4"
                        />
                    </g>
                );

            case 'hexagon':
                const hexRx = width / 2;
                const hexRy = height / 3.5; // Adjust perspective
                const hexDepth = 30; // Solid depth like the photo

                const cx = 150;
                const cy = 150 - y;

                // Vertices for Top Hexagon (Point-Forward Orientation for sharp front corner)
                // P0 is Front Center
                const p0 = { x: cx, y: cy + hexRy };
                const p1 = { x: cx + hexRx * 0.866, y: cy + hexRy * 0.5 };
                const p2 = { x: cx + hexRx * 0.866, y: cy - hexRy * 0.5 };
                const p3 = { x: cx, y: cy - hexRy };
                const p4 = { x: cx - hexRx * 0.866, y: cy - hexRy * 0.5 };
                const p5 = { x: cx - hexRx * 0.866, y: cy + hexRy * 0.5 };

                // Top Face Points
                const hexTopPoints = `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y} ${p5.x},${p5.y}`;

                return (
                    <g key={tierIndex}>
                        {/* 1. Left Front Face (P5 -> P0) - Medium Shade */}
                        <polygon
                            points={`${p5.x},${p5.y} ${p0.x},${p0.y} ${p0.x},${p0.y + hexDepth} ${p5.x},${p5.y + hexDepth}`}
                            fill={colors.secondary}
                            stroke={colors.secondary}
                            strokeWidth="0.5"
                        />

                        {/* 2. Right Front Face (P0 -> P1) - Shadow Shade */}
                        <polygon
                            points={`${p0.x},${p0.y} ${p1.x},${p1.y} ${p1.x},${p1.y + hexDepth} ${p0.x},${p0.y + hexDepth}`}
                            fill={colors.shadow}
                            stroke={colors.shadow}
                            strokeWidth="0.5"
                        />

                        {/* 3. Top Surface - Lightest */}
                        <polygon
                            points={hexTopPoints}
                            fill={colors.primary}
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="0.5"
                        />

                        {/* 4. Beading Decoration (Inspired by photo) */}
                        {/* Dotted lines along the visible faces */}
                        <polyline
                            points={`${p5.x},${p5.y + hexDepth * 0.5} ${p0.x},${p0.y + hexDepth * 0.5} ${p1.x},${p1.y + hexDepth * 0.5}`}
                            fill="none"
                            stroke={colors.accent}
                            strokeWidth="2"
                            strokeDasharray="3 3"
                            opacity="0.9"
                        />
                        <polyline
                            points={`${p5.x},${p5.y + hexDepth} ${p0.x},${p0.y + hexDepth} ${p1.x},${p1.y + hexDepth}`}
                            fill="none"
                            stroke={colors.accent}
                            strokeWidth="2"
                            strokeDasharray="3 3"
                            opacity="0.9"
                        />
                    </g>
                );

            default:
                return null;
        }
    };

    return (
        <div className="cake-preview-svg-container">
            <motion.svg
                width="100%"
                height="350"
                viewBox="20 -60 260 280"
                preserveAspectRatio="xMidYMid meet"
                initial={{ scale: 0, rotateY: 0 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="cake-svg"
            >
                {/* Gradient definitions */}
                {tiersArray.map((tierIndex) => (
                    <defs key={`defs-${tierIndex}`}>
                        <linearGradient id={`gradient-${tierIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={colors.primary} />
                            <stop offset="50%" stopColor={colors.secondary} />
                            <stop offset="100%" stopColor={colors.accent} />
                        </linearGradient>
                    </defs>
                ))}

                {/* Render tiers from bottom to top */}
                {tiersArray.reverse().map((tierIndex) => (
                    <motion.g
                        key={`tier-${tierIndex}`}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: tierIndex * 0.2, type: "spring" }}
                    >
                        {renderTierSVG(tierIndex, tiers)}
                    </motion.g>
                ))}
            </motion.svg>

            {/* Preview Label */}
            <motion.p
                className="preview-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Din tårta
            </motion.p>

            {/* Sparkles */}
            <div className="sparkles">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="sparkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                    >
                        ✨
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default CakePreviewSVG;
