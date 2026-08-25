import { useEffect, useRef } from "react"
import { Mesh, Program, Renderer, Triangle, Vec2 } from "ogl"

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * vnoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = vec2(uv.x * aspect, uv.y);
    vec2 m = vec2(uMouse.x * aspect, uMouse.y);
    float t = uTime * 0.035;

    // Domain-warped flow field
    vec2 q = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 + vec2(5.2, 1.3) - t));
    vec2 r = vec2(
      fbm(p * 1.3 + q * 1.6 + vec2(1.7, 9.2) + 0.15 * t),
      fbm(p * 1.3 + q * 1.6 + vec2(8.3, 2.8) - 0.12 * t)
    );
    float f = fbm(p * 1.3 + r * 1.4);

    // Gentle cursor influence
    float md = exp(-2.6 * length(p - m));
    f += 0.10 * md;

    // Palette: warm paper neutrals, a whisper of ink-blue in the valleys
    vec3 paper = vec3(0.984, 0.980, 0.972);
    vec3 warm  = vec3(0.945, 0.925, 0.895);
    vec3 blue  = vec3(0.106, 0.165, 0.290);

    vec3 col = mix(paper, warm, smoothstep(0.18, 0.82, f));
    col = mix(col, blue, 0.07 * smoothstep(0.5, 0.95, r.x + 0.25 * md));

    // Keep it subtle — bias back toward paper
    col = mix(paper, col, 0.9);

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new Renderer({
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.75),
    })
    const gl = renderer.gl
    gl.canvas.style.width = "100%"
    gl.canvas.style.height = "100%"
    gl.canvas.style.display = "block"
    mount.appendChild(gl.canvas)

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(1, 1) },
        uMouse: { value: new Vec2(0.5, 0.55) },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      program.uniforms.uResolution.value.set(w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    const target = new Vec2(0.5, 0.55)
    const onMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      target.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height,
      )
    }
    window.addEventListener("pointermove", onMove, { passive: true })

    let inView = true
    let hidden = false
    let running = true
    const sync = () => {
      running = inView && !hidden
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        sync()
      },
      { threshold: 0 },
    )
    io.observe(mount)
    const onVis = () => {
      hidden = document.hidden
      sync()
    }
    document.addEventListener("visibilitychange", onVis)

    const start = performance.now()
    let raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!running) return
      const u = program.uniforms
      u.uTime.value = (performance.now() - start) / 1000
      const cur = u.uMouse.value as Vec2
      cur.x += (target.x - cur.x) * 0.045
      cur.y += (target.y - cur.y) * 0.045
      renderer.render({ scene: mesh })
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("visibilitychange", onVis)
      if (gl.canvas.parentNode === mount) mount.removeChild(gl.canvas)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" />
}
