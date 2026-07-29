import { useEffect, useRef } from "react"
import * as THREE from "three"

const AZURE = 0x8fb3ff
const IRIS = 0xb28cf0

const NODE_COUNT = 46
const MAX_LINK_DISTANCE = 3.4

export function SceneBackground({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.z = 9

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const nodes: THREE.Vector3[] = []
    const positions = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      )
      nodes.push(v)
      positions.set([v.x, v.y, v.z], i * 3)
    }

    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const pointsMaterial = new THREE.PointsMaterial({
      color: AZURE,
      size: 0.09,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    group.add(points)

    const linePositions: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < MAX_LINK_DISTANCE) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3))
    const lineMaterial = new THREE.LineBasicMaterial({ color: IRIS, transparent: true, opacity: 0.16 })
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    group.add(lines)

    let targetTiltX = 0
    let targetTiltY = 0
    let currentTiltX = 0
    let currentTiltY = 0
    let autoRotationY = 0

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      targetTiltY = x * 0.5
      targetTiltX = y * 0.3
    }
    window.addEventListener("mousemove", onMouseMove)

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener("resize", onResize)

    let isVisible = true
    const onVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    let frameId: number
    const timer = new THREE.Timer()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (!isVisible) return

      timer.update()
      const delta = timer.getDelta()
      if (!prefersReducedMotion) autoRotationY += delta * 0.05

      currentTiltX += (targetTiltX - currentTiltX) * 0.04
      currentTiltY += (targetTiltY - currentTiltY) * 0.04
      group.rotation.x = currentTiltX
      group.rotation.y = autoRotationY + currentTiltY

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className={className} aria-hidden="true" />
}

export default SceneBackground
