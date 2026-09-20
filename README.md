# noto — Persistent Linux Workspace on GitHub Actions

A manually-dispatched workflow (`.github/workflows/main.yml`) that turns an
ephemeral `ubuntu-latest` runner into a temporary remote workspace:

- **SSH/SFTP** (`openssh-server`, user `runner`) — reachable only via Tailscale
- **WebSSH** (`ttyd` on loopback, Basic Auth) — exposed as HTTPS via `tailscale serve`
- **Persistence** across runs via `actions/cache` (`/home/runner` + apt archives,
  minus `*.log` / `*.sock` exclusions)

Single concurrency group (`workspace-host`), 120-minute cap per session.

## Required secrets

| Secret | Purpose | Constraint |
|---|---|---|
| `SFTP_PASS` | Password for `runner` (SSH/SFTP + ttyd Basic Auth) | Must be non-empty and must **not** contain `:` (fails fast otherwise). Avoid newlines. |
| `TAILSCALE_AUTH_KEY` | Joins the runner to your tailnet | Use an **ephemeral**, least-privilege key with tags/ACLs and short expiry. |

The workflow needs only `contents: read` on `GITHUB_TOKEN` (set in-file).

## Usage

1. **Start:** Actions → *Persistent Linux Ubuntu Workspace + SFTP & WebSSH Pro* → *Run workflow*.
   - Input `webssh` (default `true`): set to `false` to skip WebSSH (ttyd)
     and keep SSH/SFTP only.
2. Read the Tailscale IP from the step 6 logs (also posted to the run summary).
3. **SSH/SFTP:** connect to that IP as `runner` (VS Code Remote-SSH works).
4. **WebSSH:** `https://<machine-name>.<tailnet>.ts.net` (TLS via `tailscale serve`).
5. **Stop cleanly:** create `/home/runner/stop.txt` inside the session
   (or Cancel the run — the SIGTERM trap runs the same cleanup).

## Notes & limits

- **SSH keys recommended:** password auth is required by the current design and
  is scoped to your tailnet, but key-based auth is strictly better (future improvement).
- **Cache quota:** GitHub allows 10 GB of caches per repo (LRU-evicted); a fresh
  cache entry is saved on every run, so heavy `$HOME` usage churns quota.
- **Cancel-save:** the auto-save path assumes the cache post-step runs after a
  Cancel — verify on your first cancelled run (check the "Post ..." step logs).
- **Cost:** each session bills runner minutes up to the 120-minute timeout.
