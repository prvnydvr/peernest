import { cn } from "@/lib/utils"

/**
 * Constellation — PeerNest signature collaborative-graph visual.
 *
 * Animated SVG of nodes (students/builders) connected by breathing
 * lines, with signal pulses traveling along select edges using SMIL
 * animateMotion (same coordinate space as the SVG nodes).
 *
 * Variants:
 *  - "ambient" : low-density background watermark
 *  - "dense"   : richer, used behind hero
 *  - "rail"    : horizontal connector for between-section dividers
 */
type ConstellationVariant = "ambient" | "dense" | "rail"

export function Constellation({
  variant = "ambient",
  className,
}: {
  variant?: ConstellationVariant
  className?: string
}) {
  if (variant === "rail") {
    const railTop = "M 0 40 C 200 12, 400 64, 600 40 S 1000 12, 1200 40"
    const railBot = "M 0 40 C 240 60, 460 22, 700 48 S 980 60, 1200 36"
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        )}
      >
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="rail-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="oklch(0.52 0.22 280)" stopOpacity="0" />
              <stop offset="0.15" stopColor="oklch(0.52 0.22 280)" stopOpacity="0.5" />
              <stop offset="0.5" stopColor="oklch(0.6 0.2 290)" stopOpacity="0.7" />
              <stop offset="0.85" stopColor="oklch(0.52 0.22 280)" stopOpacity="0.5" />
              <stop offset="1" stopColor="oklch(0.52 0.22 280)" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="rail-pulse" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="oklch(0.6 0.22 290)" stopOpacity="1" />
              <stop offset="1" stopColor="oklch(0.6 0.22 290)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Two slightly-offset connecting paths for depth */}
          <path
            d={railTop}
            stroke="url(#rail-line)"
            strokeWidth="1.2"
            fill="none"
            className="animate-line-breathe"
          />
          <path
            d={railBot}
            stroke="url(#rail-line)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.55"
          />

          {/* Nodes */}
          {[
            [80, 36],
            [320, 32],
            [600, 40],
            [880, 44],
            [1120, 38],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="6" fill="oklch(0.52 0.22 280 / 0.18)" />
              <circle
                cx={cx}
                cy={cy}
                r="2.4"
                fill="oklch(0.52 0.22 280)"
                className="animate-node-twinkle"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
            </g>
          ))}

          {/* Signal pulses traveling the rail */}
          <circle r="8" fill="url(#rail-pulse)">
            <animateMotion dur="6s" repeatCount="indefinite" path={railTop} />
          </circle>
          <circle r="3" fill="oklch(0.6 0.22 290)">
            <animateMotion dur="6s" repeatCount="indefinite" path={railTop} />
          </circle>
          <circle r="6" fill="url(#rail-pulse)">
            <animateMotion
              dur="7.5s"
              begin="1.4s"
              repeatCount="indefinite"
              path={railBot}
            />
          </circle>
          <circle r="2.4" fill="oklch(0.6 0.22 290)">
            <animateMotion
              dur="7.5s"
              begin="1.4s"
              repeatCount="indefinite"
              path={railBot}
            />
          </circle>
        </svg>
      </div>
    )
  }

  // ambient / dense: 800 x 600 viewBox node graph
  const isDense = variant === "dense"

  // canonical node positions (intentional, not random)
  const nodes: Array<[number, number, number]> = [
    [120, 110, 1],
    [260, 70, 1],
    [410, 150, 1.4], // hub A
    [560, 90, 1],
    [700, 180, 1],
    [180, 260, 1],
    [340, 320, 1.4], // hub B
    [510, 280, 1],
    [640, 360, 1],
    [120, 430, 1],
    [280, 480, 1],
    [460, 470, 1.4], // hub C
    [620, 500, 1],
    [740, 430, 1],
  ]

  // edges between nodes (by index)
  const edges: Array<[number, number]> = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 2], [6, 7], [7, 3], [7, 8], [4, 8],
    [5, 9], [9, 10], [10, 6], [10, 11], [11, 7], [11, 12], [12, 8], [12, 13], [13, 4],
    [9, 11], [2, 6], [6, 11],
  ]

  // Signal flow paths between hubs (idx 2, 6, 11)
  const signalPaths = [
    "M 410 150 Q 380 230, 340 320 T 460 470",
    "M 120 110 Q 220 200, 340 320 T 620 500",
    "M 700 180 Q 580 320, 460 470 T 280 480",
  ]

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className={cn(
          "absolute inset-0 h-full w-full",
          isDense ? "opacity-90" : "opacity-60",
        )}
      >
        <defs>
          <radialGradient id="node-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="oklch(0.55 0.22 280)" stopOpacity="0.8" />
            <stop offset="0.5" stopColor="oklch(0.6 0.2 290)" stopOpacity="0.25" />
            <stop offset="1" stopColor="oklch(0.6 0.2 290)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="edge" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.52 0.22 280)" stopOpacity="0.45" />
            <stop offset="1" stopColor="oklch(0.6 0.2 290)" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="signal-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="oklch(0.65 0.22 290)" stopOpacity="1" />
            <stop offset="1" stopColor="oklch(0.65 0.22 290)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Edges */}
        <g>
          {edges.map(([a, b], i) => {
            const [ax, ay] = nodes[a]
            const [bx, by] = nodes[b]
            const breathe = i % 4 === 0
            return (
              <line
                key={`e-${i}`}
                x1={ax}
                y1={ay}
                x2={bx}
                y2={by}
                stroke="url(#edge)"
                strokeWidth={breathe ? 0.9 : 0.6}
                className={breathe ? "animate-line-breathe" : ""}
              />
            )
          })}
        </g>

        {/* Node glow halos */}
        <g>
          {nodes.map(([x, y, scale], i) => (
            <circle
              key={`g-${i}`}
              cx={x}
              cy={y}
              r={18 * scale}
              fill="url(#node-glow)"
            />
          ))}
        </g>

        {/* Node cores */}
        <g>
          {nodes.map(([x, y, scale], i) => (
            <circle
              key={`n-${i}`}
              cx={x}
              cy={y}
              r={2.6 * scale}
              fill={
                scale > 1.2
                  ? "oklch(0.6 0.22 290)"
                  : "oklch(0.52 0.22 280)"
              }
              className="animate-node-twinkle"
              style={{
                animationDelay: `${(i * 0.27) % 3.6}s`,
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            />
          ))}
        </g>

        {/* Signal pulses traveling between hubs */}
        {signalPaths.slice(0, isDense ? 3 : 2).map((path, i) => {
          const dur = [8, 10, 9][i]
          const begin = [0, 2.3, 1.1][i]
          return (
            <g key={`s-${i}`}>
              {/* outer halo */}
              <circle r="9" fill="url(#signal-glow)">
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${begin}s`}
                  repeatCount="indefinite"
                  path={path}
                />
              </circle>
              {/* core */}
              <circle r="2.6" fill="oklch(0.65 0.22 290)">
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${begin}s`}
                  repeatCount="indefinite"
                  path={path}
                />
              </circle>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
