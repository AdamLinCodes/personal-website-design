'use client'

import { useEffect, useRef } from 'react'

type NodePoint = {
  x: number
  y: number
  phase: number
}

const nodePoints: NodePoint[] = Array.from({ length: 54 }, (_, index) => {
  const theta = index * 2.399963229728653
  const radius = Math.sqrt((index + 0.5) / 54)

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
      canvas.setPointerCapture(event.pointerId)
    }

    const handlePointerUp = (event: PointerEvent) => {
      pointerRef.current.pressed = false

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
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
      halo.addColorStop(0, `rgba(38, 92, 106, ${0.08 + visiblePull * 0.1})`)
      halo.addColorStop(0.42, 'rgba(140, 86, 41, 0.04)')
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
            const opacity = (1 - distance / limit) * 0.14
            context.strokeStyle = `rgba(35, 73, 82, ${opacity})`
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

        context.strokeStyle = ring % 2 === 0 ? 'rgba(33, 75, 86, 0.34)' : 'rgba(136, 82, 38, 0.24)'
        context.lineWidth = ring === 0 ? 1.5 : 0.9
        context.stroke()
      }

      projectedNodes.forEach((node, index) => {
        const radius = index % 7 === 0 ? 2.7 : 1.8
        context.beginPath()
        context.arc(node.x, node.y, radius, 0, Math.PI * 2)
        context.fillStyle = index % 7 === 0 ? 'rgba(23, 57, 64, 0.5)' : 'rgba(91, 66, 38, 0.38)'
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

    canvas.addEventListener('pointermove', updatePointer)
    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointerup', handlePointerUp)
    canvas.addEventListener('pointercancel', handlePointerUp)
    canvas.addEventListener('pointerleave', handlePointerLeave)
    frameId = window.requestAnimationFrame(animate)

    return () => {
      resizeObserver.disconnect()
      canvas.removeEventListener('pointermove', updatePointer)
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointerup', handlePointerUp)
      canvas.removeEventListener('pointercancel', handlePointerUp)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="relative aspect-square w-full max-w-[460px] justify-self-center overflow-hidden rounded-full [mask-image:radial-gradient(circle_at_center,black_62%,transparent_84%)] sm:max-w-[520px]">
      <canvas
        ref={canvasRef}
        aria-label="Interactive mathematical field"
        className="absolute inset-0 h-full w-full touch-none"
      />
    </div>
  )
}
