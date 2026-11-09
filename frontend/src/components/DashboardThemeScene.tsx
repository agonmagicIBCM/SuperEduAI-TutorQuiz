import type { Theme } from '../types/theme'
import './DashboardThemeScene.css'

type DashboardThemeSceneProps = {
  theme: Exclude<Theme, 'light' | 'dark'>
}

function AbyssScene() {
  return (
    <svg className="theme-art theme-art--abyss" viewBox="0 0 420 300" role="presentation">
      <defs>
        <radialGradient id="abyss-halo"><stop stopColor="var(--color-primary)" stopOpacity=".25" /><stop offset=".72" stopColor="var(--color-primary)" stopOpacity=".05" /><stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" /></radialGradient>
        <radialGradient id="abyss-core" cx="38%" cy="31%"><stop stopColor="#521b31" /><stop offset=".54" stopColor="#250f1a" /><stop offset="1" stopColor="#070609" /></radialGradient>
        <linearGradient id="abyss-current"><stop stopColor="var(--color-primary)" stopOpacity="0" /><stop offset=".48" stopColor="var(--color-primary)" stopOpacity=".9" /><stop offset="1" stopColor="var(--color-lavender)" stopOpacity="0" /></linearGradient>
        <filter id="abyss-glow"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>
      <ellipse className="abyss-aura" cx="224" cy="151" rx="180" ry="130" fill="url(#abyss-halo)" />
      <circle className="abyss-pulse abyss-pulse--one" cx="218" cy="151" r="63" />
      <circle className="abyss-pulse abyss-pulse--two" cx="218" cy="151" r="86" />
      <path className="abyss-gravity abyss-gravity--one" d="M81 142c20-68 94-107 177-86 49 13 88 48 99 91" />
      <path className="abyss-gravity abyss-gravity--two" d="M342 160c-24 72-101 107-182 82-46-14-76-44-87-76" />
      <ellipse className="abyss-ring abyss-ring--outer" cx="218" cy="151" rx="139" ry="57" transform="rotate(-18 218 151)" />
      <ellipse className="abyss-ring abyss-ring--inner" cx="218" cy="151" rx="100" ry="39" transform="rotate(24 218 151)" />
      <path className="abyss-stream abyss-stream--one" d="M91 196c32-54 65-74 116-52 35 15 48 37 89 15 23-13 40-31 58-52" />
      <path className="abyss-stream abyss-stream--two" d="M105 112c31 31 58 35 88 11 38-31 61-20 84 2 17 16 32 20 55 12" />
      <path className="abyss-stream abyss-stream--three" d="M55 176c42-20 68-20 92 1 27 24 52 30 81 7 26-21 52-25 82-7 22 13 42 15 62 5" />
      <path className="abyss-stream-glow" d="M91 196c32-54 65-74 116-52 35 15 48 37 89 15 23-13 40-31 58-52" />
      <path className="abyss-fracture" d="m120 222 14-10-2-13 15-9m124-102 11 11-4 12 15 8m37 80-13-8 2-12-12-7" />
      <circle cx="218" cy="151" r="47" fill="url(#abyss-core)" />
      <circle className="abyss-core-rim" cx="218" cy="151" r="47" />
      <ellipse className="abyss-lensing" cx="218" cy="151" rx="31" ry="48" transform="rotate(-24 218 151)" />
      <circle cx="218" cy="151" r="21" fill="#050407" />
      <circle cx="218" cy="151" r="13" fill="#020203" />
      <path className="abyss-fragment" d="m116 74 8-11 8 13-9 8Zm195 132 7-10 9 13-11 7Zm-34-116 5-7 7 9-8 5Z" />
      <circle className="theme-particle theme-particle--a" cx="123" cy="152" r="2" />
      <circle className="theme-particle theme-particle--b" cx="303" cy="84" r="1.8" />
      <circle className="theme-particle theme-particle--c" cx="321" cy="181" r="1.4" />
    </svg>
  )
}

function AstralScene() {
  return (
    <svg className="theme-art theme-art--astral" viewBox="0 0 420 300" role="presentation">
      <defs>
        <radialGradient id="astral-core"><stop stopColor="#fff" /><stop offset=".16" stopColor="var(--color-lavender)" /><stop offset=".5" stopColor="#8d7bea" stopOpacity=".76" /><stop offset="1" stopColor="#6559c9" stopOpacity="0" /></radialGradient>
        <linearGradient id="astral-arm"><stop stopColor="#87a9ff" stopOpacity="0" /><stop offset=".48" stopColor="var(--color-lavender)" stopOpacity=".86" /><stop offset="1" stopColor="#b8a8ff" stopOpacity="0" /></linearGradient>
        <filter id="astral-blur"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <ellipse className="astral-nebula astral-nebula--one" cx="91" cy="85" rx="100" ry="45" />
      <ellipse className="astral-nebula astral-nebula--two" cx="348" cy="222" rx="108" ry="50" />
      <g className="astral-constellation astral-constellation--one"><path d="M32 76 62 57 92 68 115 43 145 53" /><circle cx="32" cy="76" r="2.2" /><circle cx="62" cy="57" r="2.5" /><circle cx="92" cy="68" r="1.8" /><circle cx="115" cy="43" r="2.4" /><circle cx="145" cy="53" r="2" /></g>
      <g className="astral-constellation astral-constellation--two"><path d="M294 48 320 68 348 55 374 81 402 72" /><circle cx="294" cy="48" r="2" /><circle cx="320" cy="68" r="2.3" /><circle cx="348" cy="55" r="1.9" /><circle cx="374" cy="81" r="2.6" /><circle cx="402" cy="72" r="1.8" /></g>
      <g className="astral-constellation astral-constellation--three"><path d="M36 233 61 212 84 224 102 202 128 211" /><circle cx="36" cy="233" r="1.8" /><circle cx="61" cy="212" r="2.2" /><circle cx="84" cy="224" r="1.7" /><circle cx="102" cy="202" r="2.4" /><circle cx="128" cy="211" r="1.8" /></g>
      <g className="astral-constellation astral-constellation--four"><path d="M304 256 326 232 353 245 376 220 399 230" /><circle cx="304" cy="256" r="1.8" /><circle cx="326" cy="232" r="2.3" /><circle cx="353" cy="245" r="1.8" /><circle cx="376" cy="220" r="2.5" /><circle cx="399" cy="230" r="1.8" /></g>
      <g className="astral-constellation astral-constellation--five"><path d="M157 107 176 91 195 104 208 83 229 91" /><circle cx="157" cy="107" r="1.4" /><circle cx="176" cy="91" r="1.8" /><circle cx="195" cy="104" r="1.5" /><circle cx="208" cy="83" r="1.9" /><circle cx="229" cy="91" r="1.4" /></g>
      <g className="astral-galaxy astral-galaxy--distant" transform="translate(82 155) scale(.5)"><path d="M0 0c-22-28-3-50 23-39 24 10 13 37-8 34-15-2-14-19-3-22M0 0c22 28 3 50-23 39-24-10-13-37 8-34" /><circle r="5" /></g>
      <g className="astral-galaxy astral-galaxy--near" transform="translate(350 153) scale(.44)"><path d="M0 0c-22-28-3-50 23-39 24 10 13 37-8 34-15-2-14-19-3-22M0 0c22 28 3 50-23 39-24-10-13-37 8-34" /><circle r="5" /></g>
      <g className="astral-galaxy astral-galaxy--far" transform="translate(163 178) scale(.25)"><path d="M0 0c-22-28-3-50 23-39 24 10 13 37-8 34-15-2-14-19-3-22M0 0c22 28 3 50-23 39-24-10-13-37 8-34" /><circle r="5" /></g>
      <ellipse className="astral-orbit astral-orbit--one" cx="211" cy="151" rx="116" ry="48" transform="rotate(-22 211 151)" />
      <ellipse className="astral-orbit astral-orbit--two" cx="211" cy="151" rx="89" ry="70" transform="rotate(38 211 151)" />
      <g className="astral-galaxy astral-galaxy--center" transform="translate(211 151)">
        <path d="M0 0c-31-39-5-71 32-55 34 15 18 52-12 47-20-3-19-27-4-31M0 0c31 39 5 71-32 55-34-15-18-52 12-47 20 3 19 27 4 31" />
        <path className="astral-arm-soft" d="M0 0c-46-57-7-101 44-79 51 23 28 78-14 71-29-5-27-39-6-45" />
        <circle className="astral-galaxy-glow" r="30" />
        <circle className="astral-galaxy-core" r="7" />
      </g>
      <circle className="astral-orbiting-star" cx="106" cy="108" r="4" />
      <circle className="astral-orbiting-star astral-orbiting-star--second" cx="298" cy="198" r="3" />
      <circle className="theme-particle theme-particle--a" cx="177" cy="36" r="1.4" />
      <circle className="theme-particle theme-particle--b" cx="272" cy="91" r="1.6" />
      <circle className="theme-particle theme-particle--c" cx="164" cy="260" r="1.5" />
    </svg>
  )
}

function DashboardThemeScene({ theme }: DashboardThemeSceneProps) {
  switch (theme) {
    case 'abyss': return <AbyssScene />
    case 'astral': return <AstralScene />
  }
}

export default DashboardThemeScene
