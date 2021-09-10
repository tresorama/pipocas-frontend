/*

How to import inside a codepen ?

Create a new Pen.
Go to settings => js => Add External Scripts/Pens

Paste this codepen link:
  https://codepen.io/tresorama/pen/KKmrMNz
  
Then in JS panel you can call :

ViewportDetailsBanner();

*/

function ViewportDetailsBanner() {
  // HOOK FOR STATE MANAGEMENT
  const fakeUseState = (initialState) => {
    let state = initialState;
    const setState = (newState) => {
      return new Promise((resolve, reject) => {
        // update state
        state = newState;
        // resolve so subscribed tasks can be exexcuted
        resolve(state);
      });
    };
    const getState = () => state;
    return [getState, setState];
  };

  // EXTENSION - REAL TIME DEVICE NAME AND BACKGROUND
  function ViewportDetailsBanner_showRealTimeDeviceName() {
    // 1) business logic
    //  - empty!!

    // 2) view logic
    const className = "ViewportDetailsBanner-ext-realTimeDevice";
    const selector = `.${className}`;
    const isVisibleClassName = "isVisible";
    const [isVisible, setIsVisible] = fakeUseState(false);

    //  - 2a - inject dom node into dom
    function injectDomNode() {
      const genColorScheme = ({ hue, sat = 100 }) => {
        const hs = `${hue}deg, ${sat}%`;
        return {
          10: `hsl(${hs}, 90%)`,
          20: `hsl(${hs}, 80%)`,
          30: `hsl(${hs}, 70%)`,
          40: `hsl(${hs}, 60%)`,
          50: `hsl(${hs}, 50%)`,
          60: `hsl(${hs}, 40%)`,
          70: `hsl(${hs}, 30%)`,
          80: `hsl(${hs}, 20%)`,
          90: `hsl(${hs}, 10%)`,
        };
      };
      const col = {
        grey: genColorScheme({ hue: 0, sat: 0 }),
        orange: genColorScheme({ hue: 30 }),
        blue: genColorScheme({ hue: 200 }),
      };

      const atMedia = (breakpoint, content) => `
    @media (min-width: ${breakpoint}px) {
      ${selector} {
       ${content}
      }
    }
    `;

      const domNode = `
  <div class="${className}">
    <div class="bg-layer"></div>
    <div class="details">
      <p><label></label></p>
    </div>
  </div>
  <style>
    ${selector} {
      z-index: 2000;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none !important;
    }
    ${selector}:not(.${isVisibleClassName}) {
        display: none;
    }
    ${selector} .bg-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--bg, white);
      opacity: 0.5;
      background-blend-mode: overlay;
    }
    ${selector} .details label:after {
      position: absolute;
      top: 0;
      right: 0;

      background-color: black;
      color: white;
      padding: .5em 1em;
      content: var(--label, "Not Working");
    }

    ${atMedia(0, `--bg: white;--label:"start"`)}
    ${atMedia(320, `--bg: ${col.orange["10"]};--label:" 5/5s/SE"`)}
    ${atMedia(360, `--bg: ${col.orange["20"]};--label:"12Mini"`)}
    ${atMedia(375, `--bg: ${col.orange["30"]};--label:"6/7/8/X/11Pro/SE2020"`)}
    ${atMedia(390, `--bg: ${col.orange["40"]};--label:"12/12Pro"`)}
    ${atMedia(
      414,
      `--bg: ${col.orange["50"]};--label:"Plus/XR/11/11ProMax/XSMax"`
    )}
    ${atMedia(428, `--bg: ${col.orange["60"]};--label:"12ProMax"`)}
    ${atMedia(768, `--bg: ${col.blue["20"]};--label:"iPad-Mini"`)}
    ${atMedia(810, `--bg: ${col.blue["30"]};--label:"iPad-10.2"`)}
    ${atMedia(820, `--bg: ${col.blue["40"]};--label:"iPad-Air2020"`)}
    ${atMedia(834, `--bg: ${col.blue["50"]};--label:"iPad-Air-Pro11"`)}
    ${atMedia(1024, `--bg: ${col.blue["60"]};--label:"iPad-Pro12.9"`)}
    ${atMedia(1280, `--bg: ${col.grey["20"]};--label:"MacBook13"`)}
    ${atMedia(1440, `--bg: ${col.grey["40"]};--label:"MacBook15"`)}
    ${atMedia(1536, `--bg: ${col.blue["60"]};--label:"MacBook16"`)}
  
  </style>
  `;

      document.body.insertAdjacentHTML("beforeend", domNode);
    }
    injectDomNode();
    injectDomNode = null; // never recall

    //  - 2b - save el referernces
    const el = document.querySelector(selector);

    //  - 2c -visibility state
    function onVisibilityChange() {
      if (isVisible()) {
        el.classList.add(isVisibleClassName);
      } else {
        el.classList.remove(isVisibleClassName);
      }
    }
    function toggleVisibility() {
      setIsVisible(!isVisible()).then(onVisibilityChange);
    }

    // 3) first time only initialization
    onVisibilityChange(); // ensure view match initial state

    // 4) RETURN STUFF
    return { isVisible, toggleVisibility };
  }
  const ext_realTimeDevice = ViewportDetailsBanner_showRealTimeDeviceName();

  // MAIN COMPONENT
  function showViewportDetailsBanner(extensions = []) {
    // 1) business logic
    function updateBannerData() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = width / height;
      const aspect_ratio = {
        base_2: ratio * 2,
        base_3: ratio * 3,
        base_4: ratio * 4,
        base_5: ratio * 5,
        base_6: ratio * 6,
        base_7: ratio * 7,
        base_8: ratio * 8,
        base_9: ratio * 9,
        base_10: ratio * 10,
        base_11: ratio * 11,
      };
      updateView({
        width,
        height,
        ratio,
        aspect_ratio,
      });
    }

    // 2) view logic

    //   - 2a - Inject dom node into dom
    function injectDomNode() {
      document.body.insertAdjacentHTML(
        "beforeend",
        `
    <div class="ViewportDetailsBanner value-to-left">
      <div class="left-side">
        <div class="details">
          <p><label>Width</label><span data-vdb-width></span></p>
          <p><label>Height</label><span data-vdb-height></span></p>
          <p><label>Ratio - w/h</label><span data-vdb-ratio></span></p>
          <p><label>Aspect Ratio</label><span data-vdb-asp-ratio-2></spa></p>
          <p><label></label><span data-vdb-asp-ratio-3></span></p>
          <p><label></label><span data-vdb-asp-ratio-4></span></p>
          <p><label></label><span data-vdb-asp-ratio-5></span></p>
          <p><label></label><span data-vdb-asp-ratio-6></span></p>
          <p><label></label><span data-vdb-asp-ratio-7></span></p>
          <p><label></label><span data-vdb-asp-ratio-8></span></p>
          <p><label></label><span data-vdb-asp-ratio-9></span></p>
          <p><label></label><span data-vdb-asp-ratio-10></span></p>
          <p><label></label><span data-vdb-asp-ratio-11></span></p>
          <p><label>Ratio Raw</label><span data-vdb-ratio-raw></span></p>
        </div>
        <div class="credit">
          <p>Created by Jacopo Marrone </p>
          <p>
            <a href="https://codepen.io/tresorama/pen/KKmrMNz">CodePen</a>
            <a href="https://github.com/tresorama">GitHub</a>
          </p>
        </div>
      </div>
      <div class="right-side">
        <div class="extensions"></div>
        <span data-vdb-toggler>OPEN</span>
      </div>
    </div>

    <style>
      [class*=ViewportDetailsBanner],
      [class*=ViewportDetailsBanner] *
      [class*=ViewportDetailsBanner-ext],
      [class*=ViewportDetailsBanner-ext] *{
        font-family: monospace;
        border-radius: 1px;
        box-sizing: border-box;
      }
      
      .ViewportDetailsBanner {
        z-index: 2000;
        --bg-color: hsl(0,0%,5%);
        --bg-color-soft: hsl(0,0%,10%);
        --text-color: hsl(0,0%,95%);
        position: fixed;
        max-width: 95%;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1000;
        background-color: var(--bg-color);
        color: var(--text-color);
        display: flex;
        align-items: stretch;
      }
      .ViewportDetailsBanner:not(.isOpen) .left-side {
        display: none;
      }

      .ViewportDetailsBanner .left-side,
      .ViewportDetailsBanner .right-side {
        min-width: 0;
        max-height: 85vh;
        overflow: scroll;
      }

      .ViewportDetailsBanner .right-side {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1.3vmax;
      }
      
      .ViewportDetailsBanner .details {
        margin: 2.3vw 1.3vw;
        background: var(--bg-color-soft);
        overflow: scroll;
      }

      .ViewportDetailsBanner .details > p {
        padding-inline-start: 1.5vmin;
        padding-inline-end: 3vmin;
        margin-block-start: 1vmin;
        margin-block-end: 0vmin;
        width: 20em;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .ViewportDetailsBanner .details label:not(:empty):after {
        content: " :";
      }
      
      .ViewportDetailsBanner.value-to-left .details > p {
        flex-direction: row-reverse;
      }
      .ViewportDetailsBanner.value-to-left .details label:not(:empty):after {
        content: none;
      }
      
      .ViewportDetailsBanner .extensions {
      }
      .ViewportDetailsBanner .extensions p {
        margin-block-start: 1.5vmin;
        margin-block-end: 3vmin;
      }
      
      .ViewportDetailsBanner .extensions input {
        vertical-align: middle;
        margin: 0;
      }

      .ViewportDetailsBanner [data-vdb-toggler] {
        background-color: var(--text-color);
        color: var(--bg-color);
        display: inline-block;
        text-align: center;
        padding: 0.35em 0.7em;
      }
      
      .ViewportDetailsBanner .credit  {
        margin: 1.3vw 1.3vw;
        color: inherit;
        
      }
      .ViewportDetailsBanner a  {
        color: inherit;
      }

      </style>
    `
      );
    }
    injectDomNode();
    injectDomNode = null; // never recall

    //   - 2b - save el refernces
    const bannerNode = document.querySelector(".ViewportDetailsBanner");
    const bannerTogglerNode = bannerNode.querySelector("[data-vdb-toggler]");
    const bannerExtensionsNode = bannerNode.querySelector(".extensions");

    //   - 2c - visibility state
    const [isOpen, setIsOpen] = fakeUseState(false);

    function onVisibilityChange() {
      if (isOpen()) {
        bannerNode.classList.add("isOpen");
        bannerTogglerNode.innerHTML = "CLOSE";
      } else {
        bannerNode.classList.remove("isOpen");
        bannerTogglerNode.innerHTML = "OPEN";
      }
    }
    function toggleBannerVisibility() {
      setIsOpen(!isOpen()).then(onVisibilityChange);
    }

    //   - 2d - update view from business logic data
    function updateView({ width, height, ratio, aspect_ratio }) {
      const cleanNumber = (num) => Number(num).toFixed(2);

      bannerNode.querySelector("[data-vdb-width]").innerHTML = `${width} px`;
      bannerNode.querySelector("[data-vdb-height]").innerHTML = `${height} px`;
      bannerNode.querySelector("[data-vdb-ratio-raw]").innerHTML = `${ratio}`;
      bannerNode.querySelector("[data-vdb-ratio]").innerHTML = `${cleanNumber(
        ratio
      )}`;
      bannerNode.querySelector(
        "[data-vdb-asp-ratio-2]"
      ).innerHTML = `${cleanNumber(aspect_ratio.base_2)} / 2`;
      bannerNode.querySelector(
        "[data-vdb-asp-ratio-3]"
      ).innerHTML = `${cleanNumber(aspect_ratio.base_3)} / 3`;
      bannerNode.querySelector(
        "[data-vdb-asp-ratio-4]"
      ).innerHTML = `${cleanNumber(aspect_ratio.base_4)} / 4`;
      bannerNode.querySelector(
        "[data-vdb-asp-ratio-5]"
      ).innerHTML = `${cleanNumber(aspect_ratio.base_5)} / 5`;
      bannerNode.querySelector(
        "[data-vdb-asp-ratio-6]"
      ).innerHTML = `${cleanNumber(aspect_ratio.base_6)} / 6`;
      bannerNode.querySelector(
        "[data-vdb-asp-ratio-7]"
      ).innerHTML = `${cleanNumber(aspect_ratio.base_7)} / 7`;
      bannerNode.querySelector(
        "[data-vdb-asp-ratio-8]"
      ).innerHTML = `${cleanNumber(aspect_ratio.base_8)} / 8`;
      bannerNode.querySelector(
        "[data-vdb-asp-ratio-9]"
      ).innerHTML = `${cleanNumber(aspect_ratio.base_9)} / 9`;
      bannerNode.querySelector(
        "[data-vdb-asp-ratio-10]"
      ).innerHTML = `${cleanNumber(aspect_ratio.base_10)} / 10`;
      bannerNode.querySelector(
        "[data-vdb-asp-ratio-11]"
      ).innerHTML = `${cleanNumber(aspect_ratio.base_11)} / 12`;
    }

    //   - 2e - dom event listener
    bannerTogglerNode.addEventListener("click", () => toggleBannerVisibility());
    window.addEventListener("resize", () => updateBannerData());

    // 3) init extensions
    extensions.forEach((extension, index) => {
      const { key, displayedText, initialState, onClick } = extension;

      const htmlFor = `extension-${index}-${key}`;

      bannerExtensionsNode.insertAdjacentHTML(
        "beforeend",
        `
    <p>
      <input name="${htmlFor}" type="checkbox"/>
      <label for="${htmlFor}">${displayedText}</label>
    </p>
    `
      );
      const domNode = bannerExtensionsNode.querySelector(
        `input[name="${htmlFor}"]`
      );
      domNode.checked = initialState;
      domNode.addEventListener("click", onClick);
    });

    // 4) first time only initialization
    updateBannerData(); //run to populate initial data
  }
  showViewportDetailsBanner([
    {
      key: "realTimeDevice",
      displayedText: "Device",
      initialState: ext_realTimeDevice.isVisible(),
      onClick: ext_realTimeDevice.toggleVisibility,
    },
  ]);
}
export default ViewportDetailsBanner;
