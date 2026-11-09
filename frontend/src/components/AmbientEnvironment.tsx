/** Decorative atmosphere only: kept mounted so changing themes never restarts its motion. */
function AmbientEnvironment() {
  return (
    <div className="environment" aria-hidden="true">
      <div className="environment__astral">
        <span className="nebula nebula--one" />
        <span className="nebula nebula--two" />
        <span className="nebula nebula--three" />
        <span className="cosmic-dust" />
        <span className="cosmic-dust cosmic-dust--near" />
        <svg className="constellations" viewBox="0 0 1000 700" preserveAspectRatio="none">
          <g className="constellation constellation--one">
            <path d="M60 180 118 144 157 205 218 171 254 231" />
            <circle cx="60" cy="180" r="2" /><circle cx="118" cy="144" r="2.4" /><circle cx="157" cy="205" r="2" /><circle cx="218" cy="171" r="2.2" /><circle cx="254" cy="231" r="1.8" />
          </g>
          <g className="constellation constellation--two">
            <path d="M754 120 807 166 864 143 921 203 965 186" />
            <circle cx="754" cy="120" r="1.8" /><circle cx="807" cy="166" r="2" /><circle cx="864" cy="143" r="2.3" /><circle cx="921" cy="203" r="1.8" /><circle cx="965" cy="186" r="2" />
          </g>
          <g className="constellation constellation--three"><path d="M326 390 372 352 412 378 458 323 501 346 548 294" /><circle cx="326" cy="390" r="2" /><circle cx="372" cy="352" r="2.6" /><circle cx="412" cy="378" r="1.8" /><circle cx="458" cy="323" r="2.5" /><circle cx="501" cy="346" r="1.8" /><circle cx="548" cy="294" r="2.4" /></g>
          <g className="constellation constellation--four"><path d="M640 480 682 447 711 470 744 426 784 444" /><circle cx="640" cy="480" r="2" /><circle cx="682" cy="447" r="2.4" /><circle cx="711" cy="470" r="1.8" /><circle cx="744" cy="426" r="2.6" /><circle cx="784" cy="444" r="2" /></g>
          <g className="constellation constellation--five"><path d="M80 540 123 509 166 526 205 486 239 504" /><circle cx="80" cy="540" r="1.8" /><circle cx="123" cy="509" r="2.2" /><circle cx="166" cy="526" r="2" /><circle cx="205" cy="486" r="2.5" /><circle cx="239" cy="504" r="1.8" /></g>
          <g className="constellation constellation--six"><path d="M812 580 850 546 897 559 934 521 975 534" /><circle cx="812" cy="580" r="1.9" /><circle cx="850" cy="546" r="2.4" /><circle cx="897" cy="559" r="1.8" /><circle cx="934" cy="521" r="2.4" /><circle cx="975" cy="534" r="1.8" /></g>
          <g className="constellation constellation--seven"><path d="M279 109 310 92 329 119 356 104 374 128" /><circle cx="279" cy="109" r="1.7" /><circle cx="310" cy="92" r="2.1" /><circle cx="329" cy="119" r="1.7" /><circle cx="356" cy="104" r="2.2" /><circle cx="374" cy="128" r="1.6" /></g>
          <g className="constellation constellation--eight"><path d="M604 220 632 194 658 208 677 178 704 188" /><circle cx="604" cy="220" r="1.6" /><circle cx="632" cy="194" r="2.1" /><circle cx="658" cy="208" r="1.7" /><circle cx="677" cy="178" r="2.3" /><circle cx="704" cy="188" r="1.6" /></g>
        </svg>
        <svg className="galaxy-atlas" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <defs>
            <radialGradient id="galaxy-core"><stop stopColor="#fff" stopOpacity=".9" /><stop offset=".2" stopColor="#d9d1ff" stopOpacity=".62" /><stop offset="1" stopColor="#8e7be8" stopOpacity="0" /></radialGradient>
            <linearGradient id="galaxy-arm" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#7a75dc" stopOpacity="0" /><stop offset=".5" stopColor="#c3baff" stopOpacity=".56" /><stop offset="1" stopColor="#8b9ce8" stopOpacity=".05" /></linearGradient>
          </defs>
          <g className="spiral-galaxy spiral-galaxy--one" transform="translate(138 260) rotate(-18)">
            <path className="galaxy-arm" d="M0 0C-28-42-13-78 28-79c50-1 70 47 42 80-23 27-62 15-63-10-1-15 13-24 25-17" />
            <path className="galaxy-arm galaxy-arm--reverse" d="M0 0C27 40 10 76-30 73c-47-3-64-49-34-78 25-25 60-10 59 12" />
            <ellipse className="galaxy-disc" rx="60" ry="12" /><circle className="galaxy-nucleus" r="13" />
            <circle className="galaxy-star" cx="43" cy="-37" r="2" /><circle className="galaxy-star" cx="-50" cy="39" r="1.5" />
          </g>
          <g className="spiral-galaxy spiral-galaxy--two" transform="translate(1280 335) rotate(22) scale(.72)">
            <path className="galaxy-arm" d="M0 0C-30-43-14-78 27-78c50 0 71 45 44 79-22 28-60 16-62-9-1-15 12-24 25-18" />
            <path className="galaxy-arm galaxy-arm--reverse" d="M0 0C28 41 12 77-28 74c-48-3-65-49-35-78 25-24 60-10 59 12" />
            <ellipse className="galaxy-disc" rx="61" ry="12" /><circle className="galaxy-nucleus" r="13" />
          </g>
          <g className="spiral-galaxy spiral-galaxy--three" transform="translate(1120 755) rotate(-31) scale(.48)">
            <path className="galaxy-arm" d="M0 0C-29-42-12-77 29-77c48 1 68 47 40 79-23 27-60 14-61-10" />
            <path className="galaxy-arm galaxy-arm--reverse" d="M0 0C27 40 9 76-31 72c-47-4-63-50-32-78 25-24 60-8 58 14" />
            <ellipse className="galaxy-disc" rx="60" ry="12" /><circle className="galaxy-nucleus" r="13" />
          </g>
          <g className="spiral-galaxy spiral-galaxy--four" transform="translate(598 162) rotate(12) scale(.34)">
            <path className="galaxy-arm" d="M0 0C-25-36-8-65 24-63c40 3 55 39 33 65-19 22-50 13-51-7-1-13 10-20 21-14" />
            <path className="galaxy-arm galaxy-arm--reverse" d="M0 0C24 34 7 64-25 61c-39-4-51-41-28-65 21-21 49-8 47 10" />
            <ellipse className="galaxy-disc" rx="52" ry="10" /><circle className="galaxy-nucleus" r="11" />
          </g>
        </svg>
        <span className="shooting-star shooting-star--one" />
        <span className="shooting-star shooting-star--two" />
      </div>

      <div className="environment__abyss">
        <span className="abyss-smoke abyss-smoke--one" />
        <span className="abyss-smoke abyss-smoke--two" />
        <span className="abyss-smoke abyss-smoke--three" />
        <svg className="abyss-fluid" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <defs>
            <linearGradient id="blood-current-left" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#4b0c20" stopOpacity="0" /><stop offset=".35" stopColor="#981a38" stopOpacity=".46" /><stop offset=".57" stopColor="#e34d68" stopOpacity=".24" /><stop offset="1" stopColor="#3b0917" stopOpacity="0" /></linearGradient>
            <linearGradient id="blood-current-right" x1="1" x2="0" y1="0" y2="1"><stop stopColor="#3b0917" stopOpacity="0" /><stop offset=".42" stopColor="#a51b37" stopOpacity=".4" /><stop offset=".62" stopColor="#ef667a" stopOpacity=".19" /><stop offset="1" stopColor="#4b0c20" stopOpacity="0" /></linearGradient>
          </defs>
          <path className="blood-ribbon blood-ribbon--left" d="M330 135C422 208 478 300 399 383c-68 74-54 149 43 188 80 34 112 106 62 238" />
          <path className="blood-current blood-current--left" d="M330 135C422 208 478 300 399 383c-68 74-54 149 43 188 80 34 112 106 62 238" />
          <path className="blood-glimmer blood-glimmer--left" d="M330 135C422 208 478 300 399 383c-68 74-54 149 43 188 80 34 112 106 62 238" />
          <path className="blood-ribbon blood-ribbon--right" d="M1510 136c-104 74-151 167-84 246 63 70 63 143-7 190-59 40-72 109-28 237" />
          <path className="blood-current blood-current--right" d="M1510 136c-104 74-151 167-84 246 63 70 63 143-7 190-59 40-72 109-28 237" />
          <path className="blood-glimmer blood-glimmer--right" d="M1510 136c-104 74-151 167-84 246 63 70 63 143-7 190-59 40-72 109-28 237" />
          <path className="blood-eddy" d="M321 568c-27 27-15 67 18 72 34 5 57-26 42-51-11-18-36-18-45-2-8 14 3 28 16 27" />
          <path className="blood-eddy blood-eddy--right" d="M1330 494c-27 27-15 67 18 72 34 5 57-26 42-51-11-18-36-18-45-2-8 14 3 28 16 27" />
          <path className="blood-ribbon blood-ribbon--tributary" d="M-28 330c150 90 222 80 275 26 54-55 104-55 158-14 51 39 88 37 139-4" />
          <path className="blood-current blood-current--tributary" d="M-28 330c150 90 222 80 275 26 54-55 104-55 158-14 51 39 88 37 139-4" />
          <path className="blood-glimmer blood-glimmer--tributary" d="M-28 330c150 90 222 80 275 26 54-55 104-55 158-14 51 39 88 37 139-4" />
          <path className="void-fault" d="m112 438 24 19-11 18 30 22-9 17 27 14m1062-246-23 19 12 19-28 22 7 18-24 14" />
          <path className="blood-ribbon blood-ribbon--deep" d="M-60 762c232-171 365-178 502-61s251 107 404 9 275-95 655 47" />
          <path className="blood-current blood-current--deep" d="M-60 762c232-171 365-178 502-61s251 107 404 9 275-95 655 47" />
        </svg>
        <span className="void-embers" />
      </div>
    </div>
  )
}

export default AmbientEnvironment
