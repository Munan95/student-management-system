// Small client-side helpers for calling the JSON API.
export async function request(url, options) {
  const res = await fetch(url, { cache: "no-store", ...options });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Request failed");
  return json.data;
}

export function jsonOptions(method, body) {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}