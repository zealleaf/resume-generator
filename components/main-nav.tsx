"use client"

import { useState } from "react"
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"

import { siteConfig } from "@/config/site"
import { bungeeSpice } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export function MainNav() {
  const [finishStatus, setFinishStatus] = useState(false)

  return (
    <div className="flex gap-6">
      <Link href="/" className="flex items-center">
        {finishStatus ? (
          <span className={cn("text-lg font-bold", bungeeSpice.className)}>
            {siteConfig.name}
          </span>
        ) : (
          <TypeAnimation
            sequence={[
              "resume",
              1000,
              siteConfig.name,
              1000,
              () => {
                setFinishStatus(true)
              },
            ]}
            wrapper="span"
            cursor={!finishStatus}
            repeat={1}
            className={cn("text-lg font-bold", bungeeSpice.className)}
          />
        )}
      </Link>
    </div>
  )
}
