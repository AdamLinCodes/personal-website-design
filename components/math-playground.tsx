'use client'

import { useEffect, useRef } from 'react'

type NodePoint = {
  x: number
  y: number
  phase: number
}

// ponytail: O(n^2) all-pairs link pass on each frame; fine at this n, cap it if n grows past ~120.
const nodePoints: NodePoint[] = Array.from({ length: 64 }, (_, index) => {
  const theta = index * 2.399963229728653
  const radius = Math.sqrt((index + 0.5) / 64)

  return {
    x: 0.5 + Math.cos(theta) * radius * 0.42,
    y: 0.5 + Math.sin(theta) * radius * 0.42,
    phase: index * 0.37,
  }
})

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function MathPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef({
    x: 0.62,
    y: 0.42,
    active: false,
    pressed: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      return
    }

    let width = 0
    let height = 0
    let frameId = 0
    let visibleX = pointerRef.current.x
    let visibleY = pointerRef.current.y
    let visiblePull = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current.x = clamp((event.clientX - rect.left) / rect.width, 0, 1)
      pointerRef.current.y = clamp((event.clientY - rect.top) / rect.height, 0, 1)
      pointerRef.current.active = true
    }

    const handlePointerDown = (event: PointerEvent) => {
      updatePointer(event)
      pointerRef.current.pressed = true
    }

    const handlePointerUp = () => {
      pointerRef.current.pressed = false
    }

    const handlePointerLeave = () => {
      pointerRef.current.active = false
      pointerRef.current.pressed = false
    }

    const drawField = (time: number) => {
      const pointer = pointerRef.current
      const idleX = 0.5 + Math.cos(time * 0.22) * 0.16
      const idleY = 0.5 + Math.sin(time * 0.29) * 0.12
      const targetX = pointer.active ? pointer.x : idleX
      const targetY = pointer.active ? pointer.y : idleY
      const targetPull = pointer.active ? (pointer.pressed ? 1 : 0.72) : 0.24

      visibleX += (targetX - visibleX) * 0.08
      visibleY += (targetY - visibleY) * 0.08
      visiblePull += (targetPull - visiblePull) * 0.06

      const attractorX = visibleX * width
      const attractorY = visibleY * height
      const minDimension = Math.min(width, height)
      const centerX = width * (0.5 + (visibleX - 0.5) * 0.18)
      const centerY = height * (0.5 + (visibleY - 0.5) * 0.16)

      context.clearRect(0, 0, width, height)

      const halo = context.createRadialGradient(attractorX, attractorY, 0, attractorX, attractorY, minDimension * 0.62)
      halo.addColorStop(0, `rgba(38, 92, 106, ${0.12 + visiblePull * 0.13})`)
      halo.addColorStop(0.42, 'rgba(140, 86, 41, 0.06)')
      halo.addColorStop(1, 'rgba(140, 86, 41, 0)')
      context.fillStyle = halo
      context.fillRect(0, 0, width, height)

      const projectedNodes = nodePoints.map((node) => {
        const waveX = Math.sin(time * 0.72 + node.phase) * 0.018
        const waveY = Math.cos(time * 0.61 + node.phase * 1.4) * 0.016
        const dx = visibleX - node.x
        const dy = visibleY - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const force = Math.exp(-distance * 7.2) * (0.09 + visiblePull * 0.17)

        return {
          x: (node.x + waveX + dx * force) * width,
          y: (node.y + waveY + dy * force) * height,
        }
      })

      context.save()
      context.lineWidth = 1

      for (let index = 0; index < projectedNodes.length; index += 1) {
        for (let next = index + 1; next < projectedNodes.length; next += 1) {
          const a = projectedNodes[index]
          const b = projectedNodes[next]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const limit = minDimension * 0.18

          if (distance < limit) {
            const midX = (a.x + b.x) / 2
            const midY = (a.y + b.y) / 2
            const cursorDistance = Math.hypot(midX - attractorX, midY - attractorY)
            const glow = clamp(1 - cursorDistance / (minDimension * 0.42), 0, 1)
            const opacity = (1 - distance / limit) * (0.16 + glow * 0.26)
            context.strokeStyle = `rgba(38, 96, 110, ${opacity})`
            context.lineWidth = 1 + glow * 0.8
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(b.x, b.y)
            context.stroke()
          }
        }
      }

      context.restore()

      for (let ring = 0; ring < 4; ring += 1) {
        const radiusX = minDimension * (0.2 + ring * 0.055)
        const radiusY = minDimension * (0.13 + ring * 0.043)
        const wobble = 8 + ring * 4 + visiblePull * 18

        context.beginPath()

        for (let step = 0; step <= 300; step += 1) {
          const theta = (step / 300) * Math.PI * 2
          const x =
            centerX +
            Math.cos(theta + time * (0.08 + ring * 0.015)) * radiusX +
            Math.sin(theta * 3 + time * 0.82 + visibleX * 4 + ring) * wobble
          const y =
            centerY +
            Math.sin(theta * (1.03 + ring * 0.01) - time * 0.07) * radiusY +
            Math.cos(theta * 2 - time * 0.68 + visibleY * 5) * wobble

          if (step === 0) {
            context.moveTo(x, y)
          } else {
            context.lineTo(x, y)
          }
        }

        context.strokeStyle = ring % 2 === 0 ? 'rgba(33, 75, 86, 0.44)' : 'rgba(136, 82, 38, 0.3)'
        context.lineWidth = ring === 0 ? 1.5 : 0.9
        context.stroke()
      }

      projectedNodes.forEach((node, index) => {
        const cursorDistance = Math.hypot(node.x - attractorX, node.y - attractorY)
        const glow = clamp(1 - cursorDistance / (minDimension * 0.32), 0, 1)
        const base = index % 7 === 0 ? 2.7 : 1.8
        const radius = base + glow * (2.6 + visiblePull * 1.8)
        context.beginPath()
        context.arc(node.x, node.y, radius, 0, Math.PI * 2)
        context.fillStyle =
          index % 7 === 0
            ? `rgba(23, 57, 64, ${0.5 + glow * 0.35})`
            : `rgba(${91 - glow * 55}, ${66 + glow * 30}, ${38 + glow * 62}, ${0.38 + glow * 0.4})`
        context.fill()
      })

      context.save()
      context.strokeStyle = 'rgba(23, 57, 64, 0.28)'
      context.lineWidth = 1.2
      context.setLineDash([5, 8])
      context.beginPath()
      context.arc(attractorX, attractorY, 22 + visiblePull * 18, 0, Math.PI * 2)
      context.stroke()
      context.restore()
    }

    const animate = (timeStamp: number) => {
      drawField(timeStamp / 1000)
      frameId = window.requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    resize()

    window.addEventListener('pointermove', updatePointer)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
    window.addEventListener('blur', handlePointerLeave)
    frameId = window.requestAnimationFrame(animate)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      window.removeEventListener('blur', handlePointerLeave)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-label="Interactive mathematical field"
        className="absolute inset-0 h-full w-full touch-none"
      />
    </div>
  )
}
