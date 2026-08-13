export function formatDate(iso) {
  if (!iso) return "—";
  if (iso instanceof Date) {
    const d = String(iso.getDate()).padStart(2, "0");
    const m = String(iso.getMonth() + 1).padStart(2, "0");
    const y = String(iso.getFullYear());
    return `${d}/${m}/${y}`;
  }
  if (typeof iso === "string" && iso.includes("-")) {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }
  return String(iso);
}
