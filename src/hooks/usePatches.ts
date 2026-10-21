"use client";

export interface PatchDot {
  c: number;          // relative col inside patch (0 .. cols-1)
  r: number;          // relative row inside patch (0 .. rows-1)
  size: number;       // 1.2px (tiny), 3px (medium), 5px (large)
  baseAlpha: number;  // 0.35 to 0.50
  phase: number;
  speed: number;
  isEdge: boolean;
  alive: boolean;
}

export interface BoxPatch {
  id: number;
  colStart: number;
  cols: number;       // 3 to 12 cells
  rows: number;       // 3 to 10 cells
  pixelY: number;     // continuous Y position (moves upward)
  speed: number;      // 25 to 60 px/s
  bandOffset: number;
  bandSpeed: number;
  lastRaggedTime: number;
  dots: PatchDot[];
}

export function createProceduralPatch(
  id: number,
  width: number,
  height: number,
  cellSize: number,
  initialY?: number
): BoxPatch {
  const totalCols = Math.max(6, Math.floor(width / cellSize));

  // Width: 3 to 12 cells
  const cols = Math.floor(3 + Math.random() * 10);
  // Height: 3 to 10 cells
  const rows = Math.floor(3 + Math.random() * 8);

  // Bias column position toward middle and lower-right area (blue zone) as in reference screenshot
  // 30% to 95% of screen width, occasionally in left-center
  const minCol = Math.floor(totalCols * 0.22);
  const maxCol = Math.max(minCol + 1, totalCols - cols);
  const colStart = Math.floor(minCol + Math.random() * (maxCol - minCol));

  // Upward speed: 25 to 55 px/s
  const speed = 26 + Math.random() * 32;

  // Y position: either distributed initially or spawned below the bottom edge
  const spawnY = initialY !== undefined ? initialY : height + 20 + Math.random() * 100;

  // Density: 55% to 90% of dots present
  const density = 0.55 + Math.random() * 0.35;

  const dots: PatchDot[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isEdge = r === 0 || r === rows - 1 || c === 0 || c === cols - 1;
      const threshold = isEdge ? density * 0.8 : density;
      if (Math.random() > threshold) {
        continue;
      }

      // Dot sizes matching reference screenshot:
      // - Most are tiny (1 to 1.5px) at 35% to 50% white
      // - A few medium (3px) at ~45% white
      // - Rare larger dots (5px) solid white at 45%, with NO blur and NO glow
      const rand = Math.random();
      let size = 1.3;
      let baseAlpha = 0.40;

      if (rand < 0.05) {
        // Rare larger dot: 5px, solid white at 45%
        size = 5.0;
        baseAlpha = 0.45;
      } else if (rand < 0.20) {
        // Medium dot: 3px
        size = 3.0;
        baseAlpha = 0.46;
      } else {
        // Tiny dot: 1 to 1.5px
        size = 1.2 + Math.random() * 0.3;
        baseAlpha = 0.35 + Math.random() * 0.15;
      }

      dots.push({
        c,
        r,
        size,
        baseAlpha,
        phase: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 1.4,
        isEdge,
        alive: true,
      });
    }
  }

  return {
    id,
    colStart,
    cols,
    rows,
    pixelY: spawnY,
    speed,
    bandOffset: Math.random(),
    bandSpeed: 0.6 + Math.random() * 0.5,
    lastRaggedTime: 0,
    dots,
  };
}

export function initPatchesList(
  width: number,
  height: number,
  cellSize: number,
  count: number
): BoxPatch[] {
  const list: BoxPatch[] = [];
  for (let i = 0; i < count; i++) {
    // Initial distribution across the hero height from top to below bottom
    const initY = -20 + (i / count) * (height + 150) + (Math.random() - 0.5) * 60;
    list.push(createProceduralPatch(i, width, height, cellSize, initY));
  }
  return list;
}

export function updatePatchesList(
  patches: BoxPatch[],
  dt: number,
  currentTime: number,
  width: number,
  height: number,
  cellSize: number,
  prefersReducedMotion: boolean
): void {
  const len = patches.length;
  for (let i = 0; i < len; i++) {
    const patch = patches[i];
    const patchHeightPx = patch.rows * cellSize;

    if (!prefersReducedMotion) {
      // Continuous upward motion
      patch.pixelY -= patch.speed * dt;

      // Randomly drop and re-add edge dots every second
      if (currentTime - patch.lastRaggedTime > 1.2) {
        patch.lastRaggedTime = currentTime;
        const dotLen = patch.dots.length;
        for (let d = 0; d < dotLen; d++) {
          const dot = patch.dots[d];
          if (dot.isEdge && Math.random() < 0.1) {
            dot.alive = !dot.alive;
          }
        }
      }
    }

    // Respawn at bottom when patch moves above top edge
    if (patch.pixelY + patchHeightPx < -40) {
      patches[i] = createProceduralPatch(patch.id, width, height, cellSize);
    }
  }
}

export const updateBoxPatches = updatePatchesList;
export const initBoxPatches = initPatchesList;

