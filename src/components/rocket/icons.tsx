const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function ServiceIcon({ name }: { name: string }) {
  switch (name) {
    case "wash":
      return (
        <svg viewBox="0 0 48 48" className="rk-service__icon" aria-hidden="true">
          <path {...common} d="M6 30h36l-4-9a4 4 0 0 0-3.7-2.5H13.7A4 4 0 0 0 10 21L6 30Zm0 0v6h5v-3m31-3v6h-5v-3" />
          <circle {...common} cx="14" cy="31" r="2" /><circle {...common} cx="34" cy="31" r="2" />
          <path {...common} d="M14 6v6m10-8v8m10-6v6M11 13h26" />
        </svg>
      );
    case "wax":
      return (
        <svg viewBox="0 0 48 48" className="rk-service__icon" aria-hidden="true">
          <circle {...common} cx="24" cy="28" r="12" /><circle {...common} cx="24" cy="28" r="5" />
          <path {...common} d="M24 16V8m-6 2 3 4m9-4-3 4M36 10l2-3m-1 7 3-1" />
        </svg>
      );
    case "coat":
      return (
        <svg viewBox="0 0 48 48" className="rk-service__icon" aria-hidden="true">
          <path {...common} d="M8 34h32M10 34c2-8 7-12 14-12s12 4 14 12" />
          <path {...common} d="M6 40c6-3 12-3 18 0s12 3 18 0M24 6l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L14 13l6-1 4-6Z" />
        </svg>
      );
    case "interior":
      return (
        <svg viewBox="0 0 48 48" className="rk-service__icon" aria-hidden="true">
          <path {...common} d="M16 8h8a4 4 0 0 1 4 4v16H14l-2-16a4 4 0 0 1 4-4ZM12 28h20l2 8H10l2-8Zm4 8v4m12-4v4" />
          <path {...common} d="M36 10c2 2 2 6 0 8m4-12c4 4 4 12 0 16" />
        </svg>
      );
    case "tyre":
      return (
        <svg viewBox="0 0 48 48" className="rk-service__icon" aria-hidden="true">
          <circle {...common} cx="24" cy="24" r="17" /><circle {...common} cx="24" cy="24" r="8" />
          <path {...common} d="M24 7v9m0 16v9M7 24h9m16 0h9M12 12l6 6m12 12 6 6m0-24-6 6M18 30l-6 6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" className="rk-service__icon" aria-hidden="true">
          <path {...common} d="M24 5 9 11v12c0 9 6.5 16.5 15 20 8.5-3.5 15-11 15-20V11L24 5Z" />
          <path {...common} d="m17 24 5 5 9-10" />
        </svg>
      );
  }
}
