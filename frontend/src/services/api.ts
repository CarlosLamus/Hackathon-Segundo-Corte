const BASE = (import.meta as any).env?.VITE_API || 'http://localhost:4000/api';

let inFlight = 0;
const MAX = 4;
const queue: (() => void)[] = [];

function acquire(): Promise<void> {
  return new Promise((resolve) => {
    if (inFlight < MAX) { inFlight++; resolve(); }
    else queue.push(() => { inFlight++; resolve(); });
  });
}
function release() { inFlight = Math.max(0, inFlight - 1); const next = queue.shift(); if (next) next(); }

async function request(path: string, options: RequestInit & { timeoutMs?: number } = {}) {
  await acquire();
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), options.timeoutMs ?? 10000);
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  try {
    const res = await fetch(`${BASE}${path}`, { ...options, headers, signal: controller.signal });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || 'Error HTTP');
    return data;
  } finally { clearTimeout(t); release(); }
}

async function requestPublic(path: string, options: RequestInit & { timeoutMs?: number } = {}) {
  // Igual al anterior pero sin Authorization
  await acquire();
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), options.timeoutMs ?? 10000);
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  try {
    const res = await fetch(`${BASE}${path}`, { ...options, headers, signal: controller.signal });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || 'Error HTTP');
    return data;
  } finally { clearTimeout(t); release(); }
}

export const api = {
  get: (p: string) => request(p, { method: 'GET' }),
  post: (p: string, body?: any) => request(p, { method: 'POST', body: JSON.stringify(body) }),
  put: (p: string, body?: any) => request(p, { method: 'PUT', body: JSON.stringify(body) }),
  del: (p: string) => request(p, { method: 'DELETE' }),
  getPublic: (p: string) => requestPublic(p, { method: 'GET' })
};


export const apiPublicBase = {
  post: (p: string, body?: any) => requestPublic(p, { method: 'POST', body: JSON.stringify(body) }),
};
export const apiExt = { ...api, postPublic: (p:string, body?:any) => requestPublic(p, { method:'POST', body: JSON.stringify(body) }) };
// Back-compat:
(api as any).postPublic = (p:string, body?:any) => requestPublic(p, { method:'POST', body: JSON.stringify(body) });
