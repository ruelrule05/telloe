<link rel="stylesheet" href="{{ mix('css/vendor.css') }}">

<style>
      #telloe-widget button[data-v-cb0d81fe] {
        cursor: pointer !important;
      }

      #telloe-widget #widget[data-v-cb0d81fe] {
        bottom: 20px;
        left: 20px;
        position: fixed;
        z-index: 555555;
      }

      #telloe-widget .widget-body[data-v-cb0d81fe] {
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 0 2rem rgba(92, 101, 112, 0.35) !important;
        height: 80vh;
        overflow: hidden;
        width: 350px;
      }

      #telloe-widget .fade-enter-active[data-v-cb0d81fe],
      #telloe-widget .fade-leave-active[data-v-cb0d81fe] {
        transition: opacity 0.15s !important;
      }

      #telloe-widget .fade-enter[data-v-cb0d81fe],
      #telloe-widget .fade-leave-to[data-v-cb0d81fe] {
        opacity: 0;
      }

      #telloe-widget iframe[data-v-cb0d81fe] {
        border: none;
        height: 100%;
        width: 100%;
      }

      #telloe-widget .telloe-widget-close button[data-v-cb0d81fe] {
        background-color: #fff;
        border: 0;
        border-radius: 50%;
        box-shadow: 0 0 2rem rgba(92, 101, 112, 0.35) !important;
        float: right;
        height: 30px;
        margin-bottom: 5px;
        outline: 0 !important;
        padding: 10px;
        position: relative;
        width: 30px;
      }

      #telloe-widget .telloe-widget-close button svg[data-v-cb0d81fe] {
        fill: #555;
        left: 50%;
        line-height: 0;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -40%);
      }

      #telloe-widget .telloe-widget-btn[data-v-cb0d81fe] {
        align-items: center;
        background-color: #fff;
        border: 0;
        border-radius: 10px;
        bottom: 20px;
        box-shadow: 0 0 2rem rgba(92, 101, 112, 0.35) !important;
        color: #000;
        display: inline-flex;
        font-size: 15px;
        left: 20px;
        outline: 0;
        padding: 8px 12px;
        position: fixed;
        z-index: 555555;
      }

      #telloe-widget .telloe-widget-btn img[data-v-cb0d81fe] {
        margin-right: 5px;
      }

      #telloe-widget .telloe-widget-btn.hidden[data-v-cb0d81fe] {
        display: none !important;
      }

      #telloe-widget .telloe-by[data-v-cb0d81fe] {
        color: #555;
        font-size: 12px;
        font-weight: 300;
        margin-top: 5px;
        text-align: center;
      }
    </style>
    <style>
      .range-slider {
        display: inline-block;
        height: 20px;
        padding: 0 10px;
        width: 130px;
      }

      .range-slider.disabled {
        opacity: 0.5;
      }

      .range-slider-inner {
        display: inline-block;
        height: 100%;
        position: relative;
        width: 100%;
      }

      .range-slider-fill,
      .range-slider-rail {
        border-radius: 2px;
        display: block;
        height: 4px;
        left: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      .range-slider-rail {
        background-color: #e2e2e2;
        width: 100%;
      }

      .range-slider-fill {
        background-color: #21fb92;
      }

      .range-slider-knob {
        background-color: #fff;
        border: 1px solid #f5f5f5;
        border-radius: 50%;
        box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        cursor: pointer;
        display: block;
        height: 20px;
        left: 0;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
      }

      .range-slider-hidden {
        display: none;
      }
    </style>
    <style>
      [data-v-0d8ff2c5] [data-has-error] {
        --tw-ring-opacity: 1;
        --tw-ring-color: rgba(220, 38, 38, var(--tw-ring-opacity));
      }
    </style>
    <style>
      .checkbox[data-v-5c3fc94e] {
        display: inline-block;
        overflow: hidden;
        vertical-align: bottom;
      }

      .checkbox label[data-v-5c3fc94e] {
        cursor: pointer;
        line-height: 20px;
      }

      .checkbox label span[data-v-5c3fc94e] {
        transition-duration: 0.15s;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      .checkbox label[data-v-5c3fc94e]:after {
        clear: both;
        content: "";
        display: table;
      }

      .checkbox .cr[data-v-5c3fc94e] {
        border: 1px solid #ddd;
        border-radius: 0.43em;
        float: left;
        height: 1.6em;
        position: relative;
        width: 1.6em;
      }

      .checkbox .cr[data-v-5c3fc94e],
      .checkbox .cr svg[data-v-5c3fc94e] {
        transition-duration: 0.15s;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      .checkbox .cr svg[data-v-5c3fc94e] {
        left: 50%;
        line-height: 0;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .checkbox label input[type="checkbox"][data-v-5c3fc94e] {
        display: none;
      }

      .checkbox label input[type="checkbox"]+.cr>svg[data-v-5c3fc94e] {
        opacity: 0;
      }

      .checkbox label input[type="checkbox"]:checked+.cr>svg[data-v-5c3fc94e] {
        opacity: 1;
      }

      .checkbox label input[type="checkbox"]:checked+.cr[data-v-5c3fc94e] {
        background-color: #3167e3;
        border-color: #3167e3;
      }

      .checkbox label input[type="checkbox"]:disabled+.cr[data-v-5c3fc94e] {
        opacity: 0.5;
      }

      .checkbox.disabled[data-v-5c3fc94e] {
        pointer-events: none !important;
      }

      .checkbox.disabled span[data-v-5c3fc94e] {
        opacity: 0.3;
      }

      .checkbox.disabled .cr[data-v-5c3fc94e] {
        --tw-bg-opacity: 1;
        background-color: rgba(209, 213, 219, var(--tw-bg-opacity));
      }
    </style>
    <style>
      .select[data-v-39e9e60e] {
        --tw-border-opacity: 1;
        --tw-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
        align-items: center;
        border-color: rgba(209, 213, 219, var(--tw-border-opacity));
        border-radius: 0.375rem;
        border-width: 1px;
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
          var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        overflow: hidden;
        padding: 0.5rem 0.75rem;
        white-space: nowrap;
        width: 100%;
      }

      .select[data-v-39e9e60e]:focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
      }

      .select[data-v-39e9e60e] {
        --tw-ring-opacity: 1;
        --tw-ring-color: rgba(49, 103, 227, var(--tw-ring-opacity));
        --tw-ring-offset-width: 1px;
        transition-duration: 0.15s;
        transition-property: background-color, border-color, color, fill, stroke,
          opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
        transition-property: background-color, border-color, color, fill, stroke,
          opacity, box-shadow, transform, filter, backdrop-filter;
        transition-property: background-color, border-color, color, fill, stroke,
          opacity, box-shadow, transform, filter, backdrop-filter,
          -webkit-backdrop-filter;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      .select.show[data-v-39e9e60e] {
        --tw-border-opacity: 1;
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        border-color: rgba(107, 114, 128, var(--tw-border-opacity));
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
          var(--tw-shadow, 0 0 #0000);
      }

      .select[data-v-39e9e60e]:disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      .select-menu[data-v-39e9e60e] {
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        --tw-scale-x: 0.95;
        --tw-scale-y: 0.95;
        --tw-bg-opacity: 1;
        --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        --tw-ring-opacity: 1;
        --tw-ring-color: rgba(0, 0, 0, var(--tw-ring-opacity));
        --tw-ring-opacity: 0.05;
        background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
        border-radius: 0.375rem;
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
          var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
          var(--tw-shadow, 0 0 #0000);
        margin-top: 0.5rem;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        right: 0;
        top: 2.25rem;
        transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
        transform-origin: top;
        transition-duration: 0.15s;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        white-space: nowrap;
        z-index: -1;
      }

      .select-menu>div[data-v-39e9e60e] {
        max-height: 190px;
      }

      .select-menu.open[data-v-39e9e60e] {
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        opacity: 1;
        z-index: 50;
      }

      .select-menu.top[data-v-39e9e60e] {
        bottom: 2.75rem;
        top: auto;
        transform-origin: bottom;
      }

      .select-menu.bottom-right[data-v-39e9e60e] {
        left: 0;
        right: auto;
      }

      .search-input[data-v-39e9e60e] {
        --tw-ring-opacity: 0;
        font-size: 15px;
        font-weight: 500;
        padding: 0.25rem 0.75rem;
      }

      .select-item[data-v-39e9e60e] {
        cursor: pointer;
        display: block;
      }

      .select-item[data-v-39e9e60e]:hover {
        --tw-bg-opacity: 1;
        background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
      }

      .select-item[data-v-39e9e60e] {
        --tw-text-opacity: 1;
        color: rgba(55, 65, 81, var(--tw-text-opacity));
        font-size: 0.875rem;
        line-height: 1.25rem;
        padding: 0.5rem 1rem;
      }

      .select-item[data-v-39e9e60e]:hover {
        --tw-text-opacity: 1;
        color: rgba(17, 24, 39, var(--tw-text-opacity));
      }

      .select-item[data-v-39e9e60e] {
        transition-duration: 0.15s;
        transition-property: background-color, border-color, color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      .select-item.active[data-v-39e9e60e]:not(.multiple) {
        --tw-bg-opacity: 1;
        --tw-text-opacity: 1;
        background-color: rgba(49, 103, 227, var(--tw-bg-opacity));
        color: rgba(255, 255, 255, var(--tw-text-opacity));
      }

      .select-item.active .checkbox .cr[data-v-39e9e60e] {
        background-color: #3167e3;
        border-color: #3167e3;
      }

      .select-item.active .checkbox .cr svg[data-v-39e9e60e] {
        opacity: 1;
      }

      .checkbox .cr[data-v-39e9e60e] {
        border: 1px solid #ddd;
        border-radius: 0.43em;
        cursor: pointer;
        float: left;
        height: 1.4em;
        margin-right: 0.5rem;
        position: relative;
        width: 1.4em;
      }

      .checkbox .cr[data-v-39e9e60e],
      .checkbox .cr svg[data-v-39e9e60e] {
        transition-duration: 0.15s;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      .checkbox .cr svg[data-v-39e9e60e] {
        left: 50%;
        line-height: 0;
        opacity: 0;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    </style>
    <style>
      .dropdown-menu[data-v-00fdcb01] {
        max-height: 250px;
      }

      [data-v-00fdcb01] .dropdown-w-full .dropdown {
        width: 100% !important;
      }

      [data-v-00fdcb01] .time-picker {
        display: block;
        position: relative;
      }

      [data-v-00fdcb01] .time-picker input {
        cursor: pointer;
      }

      [data-v-00fdcb01] .time-picker .controls {
        display: none;
        line-height: 0;
        padding: 0;
        position: absolute;
        right: 0.25rem;
        top: 50%;
      }

      [data-v-00fdcb01] .time-picker .controls .clear-btn {
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        --tw-translate-y: -50%;
        --tw-bg-opacity: 1;
        background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
        border-radius: 9999px;
        cursor: pointer;
        display: block;
        line-height: 1;
        transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      }

      [data-v-00fdcb01] .time-picker .controls .clear-btn:focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
      }

      [data-v-00fdcb01] .time-picker .controls .clear-btn {
        padding: 0 6px;
      }

      [data-v-00fdcb01] .time-picker .controls .clear-btn .char {
        font-size: 22px;
        line-height: 1;
      }

      [data-v-00fdcb01] .time-picker.has-controls .controls {
        display: block;
      }

      [data-v-00fdcb01] .time-picker .dropdown {
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        --tw-scale-x: 0.95;
        --tw-scale-y: 0.95;
        --tw-bg-opacity: 1;
        --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        --tw-ring-opacity: 1;
        --tw-ring-color: rgba(0, 0, 0, var(--tw-ring-opacity));
        --tw-ring-opacity: 0.05;
        background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
        border-radius: 0.375rem;
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
          var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
          var(--tw-shadow, 0 0 #0000);
        height: 150px;
        margin-top: 0.5rem;
        min-width: 150px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        right: 0;
        transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
        transform-origin: top;
        transition-duration: 0.15s;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        z-index: -1;
      }

      [data-v-00fdcb01] .time-picker:focus-within .dropdown {
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        opacity: 1;
        z-index: 50;
      }

      [data-v-00fdcb01] .time-picker .select-list {
        display: flex;
        height: 100%;
        justify-content: space-between;
        outline: 2px solid transparent;
        outline-offset: 2px;
      }

      [data-v-00fdcb01] .time-picker .select-list>ul {
        overflow: auto;
        position: relative;
        width: 100%;
      }

      [data-v-00fdcb01] .time-picker .select-list>ul:not(:last-child) {
        border-right: 1px solid #e5e7eb;
      }

      [data-v-00fdcb01] .time-picker .select-list>ul li {
        cursor: pointer;
        display: block;
      }

      [data-v-00fdcb01] .time-picker .select-list>ul li:hover {
        --tw-bg-opacity: 1;
        background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
      }

      [data-v-00fdcb01] .time-picker .select-list>ul li {
        --tw-text-opacity: 1;
        color: rgba(55, 65, 81, var(--tw-text-opacity));
        font-size: 0.875rem;
        line-height: 1.25rem;
        padding-bottom: 0.5rem;
        padding-top: 0.5rem;
        text-align: center;
      }

      [data-v-00fdcb01] .time-picker .select-list>ul li:hover {
        --tw-text-opacity: 1;
        color: rgba(17, 24, 39, var(--tw-text-opacity));
      }

      [data-v-00fdcb01] .time-picker .select-list>ul li {
        transition-duration: 0.15s;
        transition-property: background-color, border-color, color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      [data-v-00fdcb01] .time-picker .select-list>ul li.hint {
        --tw-text-opacity: 1;
        color: rgba(131, 142, 166, var(--tw-text-opacity));
        text-transform: uppercase;
      }

      [data-v-00fdcb01] .time-picker .select-list>ul li:first-child {
        pointer-events: none;
      }

      [data-v-00fdcb01] .time-picker .select-list>ul li.active {
        font-weight: 800;
      }

      [data-v-00fdcb01] .time-picker .select-list>ul li[disabled] {
        --tw-text-opacity: 1;
        color: rgba(209, 213, 219, var(--tw-text-opacity));
        pointer-events: none;
      }

      [data-v-00fdcb01] .time-picker .custom-icon {
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        --tw-translate-y: -50%;
        left: 0.75rem;
        position: absolute;
        top: 50%;
        transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      }

      [data-v-00fdcb01] .time-picker.clock-icon input {
        padding-left: 2.25rem !important;
      }
    </style>
    <style>
      .form-prefix[data-v-555c3d46] {
        --tw-border-opacity: 1;
        --tw-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
        --tw-ring-opacity: 1;
        --tw-ring-color: rgba(49, 103, 227, var(--tw-ring-opacity));
        --tw-ring-offset-width: 1px;
        align-items: center;
        border-color: rgba(209, 213, 219, var(--tw-border-opacity));
        border-radius: 0.375rem;
        border-width: 1px;
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
          var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        display: flex;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.25rem;
        outline: 2px solid transparent;
        outline-offset: 2px;
        overflow: hidden;
        padding: 0.5rem 0.75rem;
        transition-duration: 0.15s;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        width: 100%;
      }

      .form-prefix[data-v-555c3d46]:focus,
      .form-prefix[data-v-555c3d46]:focus-within {
        --tw-border-opacity: 1;
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        border-color: rgba(107, 114, 128, var(--tw-border-opacity));
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
          var(--tw-shadow, 0 0 #0000);
      }
    </style>
    <style>
      .auth-container[data-v-9be0bb0a] {
        --tw-bg-opacity: 1;
        background-color: rgba(250, 230, 226, var(--tw-bg-opacity));
        height: 100vh;
        left: 0;
        opacity: 0;
        overflow: hidden;
        padding-right: 5px;
        position: fixed;
        top: 0;
        transition-duration: 0.15s;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        width: 100vw;
        z-index: 999999;
      }

      .auth-container.open[data-v-9be0bb0a] {
        opacity: 1;
        overflow: auto;
        padding-right: 0;
      }

      .auth-card[data-v-9be0bb0a] {
        --tw-bg-opacity: 1;
        background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
        border-radius: 0.75rem;
        padding: 2rem;
      }

      @media (min-width: 1024px) {
        .auth-card[data-v-9be0bb0a] {
          padding: 3rem;
        }
      }

      .auth-card[data-v-9be0bb0a] {
        max-width: 90vw;
        width: 536px;
      }

      .auth-heading[data-v-9be0bb0a] {
        --tw-text-opacity: 1;
        color: rgba(49, 103, 227, var(--tw-text-opacity));
        font-family: Monument Extended, serif;
        font-size: 32px;
        font-weight: 700;
        letter-spacing: -1.75px !important;
        line-height: 32px;
        margin-bottom: 2rem;
        margin-top: 5rem;
        text-transform: uppercase;
      }
    </style>
    <style>
      .pageloader[data-v-6c36614a] {
        background: hsla(0, 0%, 100%, 0.75);
        height: 100vh;
        width: 100vw;
        z-index: 1000;
      }
    </style>
    <style>
      .helpcrunch-iframe-wrapper,
      [name="helpcrunch-iframe"] {
        animation: none;
        animation-delay: 0;
        animation-direction: normal;
        animation-duration: 0;
        animation-fill-mode: none;
        animation-iteration-count: 1;
        animation-name: none;
        animation-play-state: running;
        animation-timing-function: ease;
        backface-visibility: visible;
        background: 0;
        background-attachment: scroll;
        background-clip: border-box;
        background-color: transparent;
        background-image: none;
        background-origin: padding-box;
        background-position: 0 0;
        background-position-x: 0;
        background-position-y: 0;
        background-repeat: repeat;
        background-size: auto auto;
        border: 0;
        border-style: none;
        border-width: medium;
        border-color: inherit;
        border-bottom: 0;
        border-bottom-color: inherit;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-style: none;
        border-bottom-width: medium;
        border-collapse: separate;
        border-image: none;
        border-left: 0;
        border-left-color: inherit;
        border-left-style: none;
        border-left-width: medium;
        border-radius: 0;
        border-right: 0;
        border-right-color: inherit;
        border-right-style: none;
        border-right-width: medium;
        border-spacing: 0;
        border-top: 0;
        border-top-color: inherit;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top-style: none;
        border-top-width: medium;
        bottom: auto;
        box-shadow: none;
        box-sizing: content-box;
        caption-side: top;
        clear: none;
        clip: auto;
        color: inherit;
        columns: auto;
        column-count: auto;
        column-fill: balance;
        column-gap: normal;
        column-rule: medium none currentColor;
        column-rule-color: currentColor;
        column-rule-style: none;
        column-rule-width: none;
        column-span: 1;
        column-width: auto;
        content: normal;
        counter-increment: none;
        counter-reset: none;
        cursor: auto;
        direction: ltr;
        display: inline;
        empty-cells: show;
        flex: none;
        float: none;
        font: normal;
        font-family: inherit;
        font-size: medium;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        height: auto;
        hyphens: none;
        left: auto;
        letter-spacing: normal;
        line-height: normal;
        list-style: none;
        list-style-image: none;
        list-style-position: outside;
        list-style-type: disc;
        margin: 0;
        margin-bottom: 0;
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
        max-height: none;
        max-width: none;
        min-height: 0;
        min-width: 0;
        opacity: 1;
        orphans: 0;
        outline: 0;
        outline-color: invert;
        outline-style: none;
        outline-width: medium;
        overflow: visible;
        overflow-x: visible;
        overflow-y: visible;
        padding: 0;
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        padding-top: 0;
        page-break-after: auto;
        page-break-before: auto;
        page-break-inside: auto;
        perspective: none;
        perspective-origin: 50% 50%;
        position: static;
        quotes: none;
        right: auto;
        tab-size: 8;
        table-layout: auto;
        text-align: inherit;
        text-align-last: auto;
        text-decoration: none;
        text-decoration-color: inherit;
        text-decoration-line: none;
        text-decoration-style: solid;
        text-indent: 0;
        text-shadow: none;
        text-transform: none;
        top: auto;
        transform: none;
        transform-style: flat;
        transition: none;
        transition-delay: 0s;
        transition-duration: 0s;
        transition-property: none;
        transition-timing-function: ease;
        unicode-bidi: normal;
        user-select: none;
        vertical-align: baseline;
        visibility: visible;
        white-space: normal;
        widows: 0;
        width: auto;
        word-spacing: normal;
        z-index: auto;
      }
	</style>