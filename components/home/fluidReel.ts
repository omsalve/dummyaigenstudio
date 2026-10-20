/*
 * FluidReel: the hero's film, drawn as liquid.
 *
 * A GPU fluid (stable fluids: advect, vorticity, pressure projection) runs
 * under the frame, and the film on show is drawn through its velocity, so the
 * pointer ripples the footage like a hand through water. It is tuned viscous:
 * the ripple is slow and settles.
 *
 * A change of film is a choreographed liquid reveal: the next film spreads
 * out from a point (the chosen chapter) behind a soft, slowly flowing organic
 * edge. The edge bends the image like the rim of a liquid lens, catches a
 * little light, and trails a faint shadow in the incoming vertical's deep
 * tone; the incoming film settles from a slight push-in.
 *
 * WebGL2 with renderable half-float textures (EXT_color_buffer_float).
 * `FluidReel.create` returns null without them; the caller keeps its plain
 * fallback.
 */

// Tuning
/** Simulation grid (short side) and pressure solve. */
const SIM_RESOLUTION = 128;
const PRESSURE_ITERATIONS = 20;
/** Vorticity confinement: low keeps the ripple smooth rather than turbulent. */
const CURL = 6;
/** Velocity decay per second: how quickly a ripple settles. */
const VELOCITY_DECAY = 1.1;
/** Pointer: push per px of movement, splat radius (share of frame²), and how far velocity bends the film. */
const POINTER_FORCE = 5;
const POINTER_RADIUS = 0.006;
const DISPLACE = 0.01;
/** The reveal: seconds from first edge to full frame. */
const REVEAL_S = 1.9;

const BASE_VERTEX = `#version 300 es
precision highp float;
in vec2 aPos;
uniform vec2 uTexel;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
void main() {
  vUv = aPos * 0.5 + 0.5;
  vL = vUv - vec2(uTexel.x, 0.0);
  vR = vUv + vec2(uTexel.x, 0.0);
  vT = vUv + vec2(0.0, uTexel.y);
  vB = vUv - vec2(0.0, uTexel.y);
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const HEADER = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 outColor;
`;

const SPLAT = `${HEADER}
uniform sampler2D uTarget;
uniform float uAspect;
uniform vec3 uColor;
uniform vec2 uPoint;
uniform float uRadius;
void main() {
  vec2 p = vUv - uPoint;
  p.x *= uAspect;
  vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
  outColor = vec4(texture(uTarget, vUv).xyz + splat, 1.0);
}
`;

const ADVECT = `${HEADER}
uniform sampler2D uVelocity;
uniform vec2 uVelocityTexel;
uniform float uDt;
uniform float uDecay;
void main() {
  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * uVelocityTexel;
  outColor = texture(uVelocity, coord) / (1.0 + uDecay * uDt);
}
`;

const DIVERGENCE = `${HEADER}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x;
  if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y;
  if (vB.y < 0.0) B = -C.y;
  outColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}
`;

const CURL_SHADER = `${HEADER}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  outColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}
`;

const VORTICITY = `${HEADER}
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float uCurlStrength;
uniform float uDt;
void main() {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= uCurlStrength * C;
  force.y *= -1.0;
  vec2 velocity = texture(uVelocity, vUv).xy + force * uDt;
  outColor = vec4(clamp(velocity, -1000.0, 1000.0), 0.0, 1.0);
}
`;

const PRESSURE = `${HEADER}
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  outColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
}
`;

const GRADIENT = `${HEADER}
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  outColor = vec4(velocity, 0.0, 1.0);
}
`;

const SCALE = `${HEADER}
uniform sampler2D uTarget;
uniform float uValue;
void main() {
  outColor = uValue * texture(uTarget, vUv);
}
`;

const DISPLAY = `${HEADER}
uniform sampler2D uFilmA;
uniform sampler2D uFilmB;
uniform sampler2D uVelocity;
uniform vec2 uSizeA;
uniform vec2 uSizeB;
uniform vec2 uRes;
uniform vec2 uVelocityTexel;
uniform float uDisplace;
uniform float uRevealing;  // 1 while a reveal runs
uniform float uProgress;   // 0 → 1, eased
uniform vec2 uOrigin;      // where the reveal starts, uv
uniform float uFarthest;   // distance to the farthest corner, in frame heights
uniform vec3 uTone;        // incoming vertical's deep tone, sRGB
uniform float uTime;

vec2 cover(vec2 uv, vec2 size) {
  float frame = uRes.x / uRes.y;
  float film = size.x / size.y;
  vec2 fit = frame > film ? vec2(1.0, film / frame) : vec2(frame / film, 1.0);
  return (uv - 0.5) * fit + 0.5;
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * noise(p);
    p = p * 2.03 + 11.7;
    amp *= 0.5;
  }
  return sum;
}

// Push-in about the reveal's origin: scale > 1 draws the film larger.
vec2 zoom(vec2 uv, vec2 origin, float scale) {
  return origin + (uv - origin) / scale;
}

void main() {
  vec2 flow = texture(uVelocity, vUv).xy * uVelocityTexel * uDisplace;
  vec2 uv = vUv - flow;

  if (uRevealing < 0.5) {
    outColor = vec4(texture(uFilmA, cover(uv, uSizeA)).rgb, 1.0);
    return;
  }

  // The front: distance from the origin, its edge shaped by slow, domain-warped noise.
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  vec2 fromOrigin = (vUv - uOrigin) * aspect;
  vec2 q = vUv * aspect * 1.6;
  float warp = fbm(q + vec2(uTime * 0.11, -uTime * 0.08) + 1.4 * fbm(q * 1.7 - uTime * 0.09));
  float reach = uProgress * (uFarthest + 0.45);
  float front = reach - length(fromOrigin) - (warp - 0.5) * 0.42;

  // Like the rim of a liquid lens: the image bends along the edge, out ahead of it and in behind it.
  float crest = exp(-pow(front / 0.075, 2.0));
  vec2 outward = normalize(fromOrigin + 1e-5) / aspect;
  vec2 bend = outward * crest * 0.03;

  float settle = 1.0 + 0.07 * (1.0 - uProgress);
  vec3 a = texture(uFilmA, cover(uv + bend, uSizeA)).rgb;
  vec2 uvB = cover(zoom(uv - bend * 0.7, uOrigin, settle), uSizeB);
  vec3 b = vec3(
    texture(uFilmB, uvB + outward * crest * 0.0025).r,
    texture(uFilmB, uvB).g,
    texture(uFilmB, uvB - outward * crest * 0.0025).b
  );

  float reveal = smoothstep(-0.006, 0.018, front);
  vec3 col = mix(a, b, reveal);
  // A thin catch of light on the crest, and the deep tone pooled just inside it.
  col += crest * 0.07;
  float trail = exp(-pow((front - 0.07) / 0.06, 2.0)) * reveal;
  col = mix(col, uTone, trail * 0.22);
  outColor = vec4(col, 1.0);
}
`;

type Program = { program: WebGLProgram; uniforms: Record<string, WebGLUniformLocation | null> };
type Target = { texture: WebGLTexture; framebuffer: WebGLFramebuffer; width: number; height: number };
type DoubleTarget = { read: Target; write: Target; swap: () => void; width: number; height: number };
export type FilmSource = () => TexImageSource | null;
type RGB = [number, number, number];

function sizeOf(source: TexImageSource): [number, number] {
  if (source instanceof HTMLVideoElement) return [source.videoWidth, source.videoHeight];
  if (source instanceof HTMLImageElement) return [source.naturalWidth, source.naturalHeight];
  return [16, 9];
}

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export class FluidReel {
  private gl: WebGL2RenderingContext;
  private canvas: HTMLCanvasElement;
  private programs: Record<string, Program> = {};
  private buffer: WebGLBuffer;
  private velocity!: DoubleTarget;
  private pressure!: DoubleTarget;
  private divergence!: Target;
  private curl!: Target;
  private filmA: WebGLTexture;
  private filmB: WebGLTexture;
  private sizeA: [number, number] = [16, 9];
  private sizeB: [number, number] = [16, 9];
  private sourceA: FilmSource = () => null;
  private sourceB: FilmSource | null = null;
  private revealStart = 0;
  private origin: [number, number] = [0.5, 0];
  private tone: RGB = [0, 0, 0];
  private onLanded: (() => void) | null = null;
  private onFirstFrame: (() => void) | null;
  private pointerLast: [number, number] | null = null;
  private frame = 0;
  private last = 0;
  private clock = performance.now();
  private running = false;

  /** Null when the GPU can't host it. `onFirstFrame` fires once a real film frame is on the canvas. */
  static create(canvas: HTMLCanvasElement, onFirstFrame: () => void): FluidReel | null {
    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: false });
    if (!gl || !gl.getExtension("EXT_color_buffer_float")) return null;
    try {
      return new FluidReel(canvas, gl, onFirstFrame);
    } catch {
      return null;
    }
  }

  private constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, onFirstFrame: () => void) {
    this.canvas = canvas;
    this.gl = gl;
    this.onFirstFrame = onFirstFrame;

    const buffer = gl.createBuffer();
    if (!buffer) throw new Error("buffer");
    this.buffer = buffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const sources = { SPLAT, ADVECT, DIVERGENCE, CURL: CURL_SHADER, VORTICITY, PRESSURE, GRADIENT, SCALE, DISPLAY };
    for (const [name, source] of Object.entries(sources)) this.programs[name] = this.compile(source);

    this.filmA = this.filmTexture();
    this.filmB = this.filmTexture();
    this.resize();
  }

  private compile(fragmentSource: string): Program {
    const gl = this.gl;
    const shader = (type: number, source: string) => {
      const s = gl.createShader(type);
      if (!s) throw new Error("shader");
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "compile");
      return s;
    };
    const program = gl.createProgram();
    if (!program) throw new Error("program");
    gl.attachShader(program, shader(gl.VERTEX_SHADER, BASE_VERTEX));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragmentSource));
    gl.bindAttribLocation(program, 0, "aPos");
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "link");
    const uniforms: Program["uniforms"] = {};
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(program, i);
      if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }
    return { program, uniforms };
  }

  private filmTexture() {
    const gl = this.gl;
    const texture = gl.createTexture();
    if (!texture) throw new Error("texture");
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    return texture;
  }

  private target(width: number, height: number): Target {
    const gl = this.gl;
    const texture = gl.createTexture();
    const framebuffer = gl.createFramebuffer();
    if (!texture || !framebuffer) throw new Error("target");
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, width, height, 0, gl.RGBA, gl.HALF_FLOAT, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { texture, framebuffer, width, height };
  }

  private doubleTarget(width: number, height: number): DoubleTarget {
    const pair = {
      read: this.target(width, height),
      write: this.target(width, height),
      width,
      height,
      swap() {
        const read = pair.read;
        pair.read = pair.write;
        pair.write = read;
      },
    };
    return pair;
  }

  private freeTarget(target: Target | undefined) {
    if (!target) return;
    this.gl.deleteTexture(target.texture);
    this.gl.deleteFramebuffer(target.framebuffer);
  }

  /** Match the canvas to its CSS size and rebuild the grid. */
  resize() {
    const canvas = this.canvas;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width === width && canvas.height === height && this.velocity) return;
    canvas.width = width;
    canvas.height = height;

    const aspect = width / height;
    const sim: [number, number] =
      aspect >= 1 ? [Math.round(SIM_RESOLUTION * aspect), SIM_RESOLUTION] : [SIM_RESOLUTION, Math.round(SIM_RESOLUTION / aspect)];
    for (const pair of [this.velocity, this.pressure]) {
      this.freeTarget(pair?.read);
      this.freeTarget(pair?.write);
    }
    this.freeTarget(this.divergence);
    this.freeTarget(this.curl);
    this.velocity = this.doubleTarget(sim[0], sim[1]);
    this.pressure = this.doubleTarget(sim[0], sim[1]);
    this.divergence = this.target(sim[0], sim[1]);
    this.curl = this.target(sim[0], sim[1]);
  }

  private draw(program: Program, target: Target | null, setup: (u: Program["uniforms"]) => void, texel?: [number, number]) {
    const gl = this.gl;
    gl.useProgram(program.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    if (program.uniforms.uTexel) gl.uniform2f(program.uniforms.uTexel, texel?.[0] ?? 0, texel?.[1] ?? 0);
    setup(program.uniforms);
    if (target) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
      gl.viewport(0, 0, target.width, target.height);
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  private bind(unit: number, texture: WebGLTexture) {
    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    return unit;
  }

  private upload(texture: WebGLTexture, source: TexImageSource | null): [number, number] | null {
    if (!source) return null;
    const size = sizeOf(source);
    if (!size[0] || !size[1]) return null;
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    return size;
  }

  private step(dt: number) {
    const gl = this.gl;
    const v = this.velocity;
    const texel: [number, number] = [1 / v.width, 1 / v.height];

    this.draw(this.programs.CURL, this.curl, (u) => gl.uniform1i(u.uVelocity, this.bind(0, v.read.texture)), texel);
    this.draw(this.programs.VORTICITY, v.write, (u) => {
      gl.uniform1i(u.uVelocity, this.bind(0, v.read.texture));
      gl.uniform1i(u.uCurl, this.bind(1, this.curl.texture));
      gl.uniform1f(u.uCurlStrength, CURL);
      gl.uniform1f(u.uDt, dt);
    }, texel);
    v.swap();
    this.draw(this.programs.DIVERGENCE, this.divergence, (u) => gl.uniform1i(u.uVelocity, this.bind(0, v.read.texture)), texel);
    this.draw(this.programs.SCALE, this.pressure.write, (u) => {
      gl.uniform1i(u.uTarget, this.bind(0, this.pressure.read.texture));
      gl.uniform1f(u.uValue, 0.8);
    }, texel);
    this.pressure.swap();
    for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
      this.draw(this.programs.PRESSURE, this.pressure.write, (u) => {
        gl.uniform1i(u.uPressure, this.bind(0, this.pressure.read.texture));
        gl.uniform1i(u.uDivergence, this.bind(1, this.divergence.texture));
      }, texel);
      this.pressure.swap();
    }
    this.draw(this.programs.GRADIENT, v.write, (u) => {
      gl.uniform1i(u.uPressure, this.bind(0, this.pressure.read.texture));
      gl.uniform1i(u.uVelocity, this.bind(1, v.read.texture));
    }, texel);
    v.swap();
    this.draw(this.programs.ADVECT, v.write, (u) => {
      gl.uniform1i(u.uVelocity, this.bind(0, v.read.texture));
      gl.uniform2f(u.uVelocityTexel, texel[0], texel[1]);
      gl.uniform1f(u.uDt, dt);
      gl.uniform1f(u.uDecay, VELOCITY_DECAY);
    }, texel);
    v.swap();
  }

  private render(now: number) {
    const gl = this.gl;
    const dt = Math.min((now - this.last) / 1000, 1 / 30);
    this.last = now;
    const revealing = this.sourceB !== null;
    const progress = revealing ? Math.min((now - this.revealStart) / 1000 / REVEAL_S, 1) : 0;

    this.step(dt);

    const sizeA = this.upload(this.filmA, this.sourceA());
    if (sizeA) this.sizeA = sizeA;
    if (revealing) {
      const sizeB = this.upload(this.filmB, this.sourceB!());
      if (sizeB) this.sizeB = sizeB;
    }

    const aspect = this.canvas.width / this.canvas.height;
    const [ox, oy] = this.origin;
    const farthest = Math.max(
      Math.hypot(ox * aspect, oy),
      Math.hypot((1 - ox) * aspect, oy),
      Math.hypot(ox * aspect, 1 - oy),
      Math.hypot((1 - ox) * aspect, 1 - oy),
    );
    const v = this.velocity;
    this.draw(this.programs.DISPLAY, null, (u) => {
      gl.uniform1i(u.uFilmA, this.bind(0, this.filmA));
      gl.uniform1i(u.uFilmB, this.bind(1, this.filmB));
      gl.uniform1i(u.uVelocity, this.bind(2, v.read.texture));
      gl.uniform2f(u.uSizeA, this.sizeA[0], this.sizeA[1]);
      gl.uniform2f(u.uSizeB, this.sizeB[0], this.sizeB[1]);
      gl.uniform2f(u.uRes, this.canvas.width, this.canvas.height);
      gl.uniform2f(u.uVelocityTexel, 1 / v.width, 1 / v.height);
      gl.uniform1f(u.uDisplace, DISPLACE);
      gl.uniform1f(u.uRevealing, revealing ? 1 : 0);
      gl.uniform1f(u.uProgress, easeInOut(progress));
      gl.uniform2f(u.uOrigin, ox, oy);
      gl.uniform1f(u.uFarthest, farthest);
      gl.uniform3f(u.uTone, this.tone[0], this.tone[1], this.tone[2]);
      gl.uniform1f(u.uTime, (now - this.clock) / 1000);
    });

    if (sizeA && this.onFirstFrame) {
      const announce = this.onFirstFrame;
      this.onFirstFrame = null;
      announce();
    }
    if (revealing && progress >= 1) this.land();
  }

  private land() {
    // The next film fills the frame: it becomes film A, keeping its texture.
    const filmA = this.filmA;
    this.filmA = this.filmB;
    this.filmB = filmA;
    this.sizeA = this.sizeB;
    this.sourceA = this.sourceB ?? this.sourceA;
    this.sourceB = null;
    const done = this.onLanded;
    this.onLanded = null;
    done?.();
  }

  /** The film on show. Called every frame; return the clip once it has frames, else its poster. */
  setFilm(source: FilmSource) {
    this.sourceA = source;
  }

  get pouring() {
    return this.sourceB !== null;
  }

  /**
   * Reveal the next film. `origin` is where it spreads from, in canvas CSS
   * px. `tone` is the incoming vertical's deep tone, sRGB 0–1. `onLanded`
   * fires once the next film fills the frame.
   */
  pour(source: FilmSource, origin: { x: number; y: number }, tone: RGB, onLanded: () => void) {
    this.sourceB = source;
    this.origin = [origin.x / this.canvas.clientWidth, 1 - origin.y / this.canvas.clientHeight];
    this.tone = tone;
    this.onLanded = onLanded;
    this.revealStart = performance.now();
    this.start();
  }

  /** Stir the fluid at a pointer position (canvas CSS px). */
  stir(x: number, y: number) {
    const last = this.pointerLast;
    this.pointerLast = [x, y];
    if (!last) return;
    const dx = (x - last[0]) * POINTER_FORCE;
    const dy = -(y - last[1]) * POINTER_FORCE;
    if (Math.abs(dx) + Math.abs(dy) < 0.5) return;
    const gl = this.gl;
    const v = this.velocity;
    this.draw(this.programs.SPLAT, v.write, (u) => {
      gl.uniform1i(u.uTarget, this.bind(0, v.read.texture));
      gl.uniform1f(u.uAspect, this.canvas.width / this.canvas.height);
      gl.uniform2f(u.uPoint, x / this.canvas.clientWidth, 1 - y / this.canvas.clientHeight);
      gl.uniform3f(u.uColor, dx, dy, 0);
      gl.uniform1f(u.uRadius, POINTER_RADIUS);
    });
    v.swap();
  }

  endStir() {
    this.pointerLast = null;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    const loop = (now: number) => {
      if (!this.running) return;
      this.render(now);
      this.frame = requestAnimationFrame(loop);
    };
    this.frame = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.frame);
  }

  dispose() {
    this.stop();
    const gl = this.gl;
    for (const pair of [this.velocity, this.pressure]) {
      this.freeTarget(pair.read);
      this.freeTarget(pair.write);
    }
    this.freeTarget(this.divergence);
    this.freeTarget(this.curl);
    gl.deleteTexture(this.filmA);
    gl.deleteTexture(this.filmB);
    gl.deleteBuffer(this.buffer);
    for (const program of Object.values(this.programs)) gl.deleteProgram(program.program);
  }
}
