"use client"

import { useEffect, useState } from "react"

type Status = "idle" | "copied" | "failed"

export function CopyEmail({
  email,
  label,
  copiedLabel,
  failedLabel,
}: {
  email: string
  label: string
  copiedLabel: string
  failedLabel: string
}) {
  const [status, setStatus] = useState<Status>("idle")

  useEffect(() => {
    if (status === "idle") return
    const id = window.setTimeout(() => setStatus("idle"), 3000)
    return () => window.clearTimeout(id)
  }, [status])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setStatus("copied")
    } catch {
      setStatus("failed")
    }
  }

  return (
    <span className="inline-flex items-center gap-4">
      <button type="button" onClick={copy} className="btn btn-secondary min-h-11 px-4 text-sm">
        {label}
      </button>
      {/* <output> carries an implicit status role; aria-live is explicit for older screen readers. */}
      <output aria-live="polite" className="label text-blue">
        {status === "copied" ? copiedLabel : status === "failed" ? failedLabel : ""}
      </output>
    </span>
  )
}
