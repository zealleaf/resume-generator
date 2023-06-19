"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { bungeeSpice } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export function MainNav() {
  return (
    <div className="flex gap-6">
      <Link href="/" className="flex items-center">
        <span
          className={cn(
            "text-lg font-bold animate-in fade-in zoom-in-95 duration-500",
            bungeeSpice.className
          )}
        >
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
