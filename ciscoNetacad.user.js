// ==UserScript==
// @name         CiscoNetacad Cheat: Show Answers
// @description  CiscoNetacad Hack show answers into the UI.
// @namespace    https://github.com/ByOscarPINE
// @version      1.0.0
// @author       byOscar
// @license      GPLv3
// @match        https://www.netacad.com/*
// @icon         https://www.netacad.com/favicon.ico
// @grant        none
// @run-at       document-start
// @allFrames    true

// ==/UserScript==

(function () {
    'use strict';
    let shadow = null;
    function toLoad() {

        try {
            const mainDocument = window.top.document;
            const iframe = mainDocument.querySelector('iframe');
            let html = null;
            let secondBody = null;

            if (iframe && iframe.contentDocument) {
                html = iframe.contentDocument.documentElement;
                html.style.setProperty('--color-picked-user', '#4579f2');
                html.style.setProperty('--color-cheat', 'currentColor');
                secondBody = iframe.contentDocument.body;
            } else {
                console.warn("Could not access the iframe");
            }

            const mainBody = mainDocument.body;

            const host = document.createElement('div');
            host.id = 'ciscoNetacad-host';
            if(secondBody) { secondBody.appendChild(host); }
            shadow = host.attachShadow({ mode: 'open' });
            shadow.innerHTML = `
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

                    :host {
                        --loader-size: 24px;
                        --jump-height: -30px;
                        --anim-dur: 1.4s;
                        position: fixed;
                        bottom: 10px;
                        right: 10px;
                        z-index: 99999;
                        pointer-events: none;
                    }

                    .menu {
                        fill: var(--icon-color);
                    }

                    .main {
                        --secondary-color: #292929;
                        --main-color: rgba(255, 255, 255, 0.596);
                        --icon-color: #292929;
                        display: grid;
                        grid-template-columns: repeat(12, 1fr);
                        gap: 0;
                        width: 280px;
                        align-items: center;
                        justify-content: center;
                        transition: gap 0.4s ease-in-out;
                        pointer-events: none;
                        position: relative;
                    }

                    .text {
                        opacity: 0;
                        transition: 0.2s ease-in-out;
                        font-family: "Poppins", sans-serif;
                        font-weight: 500;
                        font-size: 16px;
                        color: var(--secondary-color);
                        margin: 0;
                    }

                    .subtext {
                        transition: 0.2s ease-in-out;
                        color: var(--secondary-color);
                        margin: 0;
                        font-size: 12px;
                        opacity: 0.6;
                        font-family: 'Poppins', sans-serif;
                    }

                    .main_back {
                        position: absolute;
                        justify-self: center;
                        transition: 0.2s ease-in-out, 0.1s background-color ease-in-out, 0.1s background-image ease-in-out;
                    }

                    .cardBa {
                        display: flex;
                        background: transparent;
                        align-items: center;
                        justify-content: center;
                        width: 60px;
                        height: 60px;
                        backdrop-filter: blur(5px);
                        -webkit-backdrop-filter: blur(5px);
                        border-radius: 10px;
                        pointer-events: auto;
                    }

                    .card, .card-track {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 70px;
                        height: 70px;
                        border-top-left-radius: 10px;
                        border: 1px solid transparent;
                        gap: 3px;
                        will-change: transform;
                        transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s ease-in-out, background-color 0.2s ease, background-image 0.2s ease-in-out;
                    }

                    .card-track:hover {
                        background-color: var(--secondary-color);
                        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
                    }

                    .card-track:hover .text {
                        color: var(--main-color) !important;
                    }

                    .card .title {
                        opacity: 0;
                        transition: 0.2s ease-in-out;
                        background: #f5e642;
                    }

                    .card:nth-child(1) {
                        grid-column: span 12;
                        width: 100%;
                    }

                    .card:nth-child(2) {
                        grid-column: span 12;
                        width: 100%;
                        flex-direction: column;
                        border-top-right-radius: 10px;
                        border-top-left-radius: 0px;
                    }

                    .card:nth-child(2) .toggleAns {
                        opacity: 0;
                        transition: 0.2s ease-in-out;
                        fill: var(--secondary-color);
                    }

                    .card:nth-child(3) {
                        grid-column: span 4;
                        width: 100%;
                        border-radius: 0px;
                    }

                    .card:nth-child(3) .greasy {
                        opacity: 0;
                        transition: 0.2s ease-in-out;
                        fill: var(--secondary-color);
                    }

                    .card:nth-child(4) {
                        grid-column: span 4;
                        width: 100%;
                        border-bottom-left-radius: 10px;
                        border-top-left-radius: 0px;
                    }

                    .card:nth-child(4) .github {
                        opacity: 0;
                        transition: 0.2s ease-in-out;
                        fill: var(--secondary-color);
                    }

                    .card:nth-child(5) {
                        grid-column: span 4;
                        width: 100%;
                        border-bottom-left-radius: 10px;
                        border-top-left-radius: 0px;
                    }

                    .card:nth-child(5) .settings {
                        opacity: 0;
                        transition: 0.2s ease-in-out;
                        fill: var(--secondary-color);
                    }


                    .main:hover {
                        gap: 0.4em;
                        cursor: pointer;
                        pointer-events: auto;
                    }

                    .main:hover .words { opacity: 1; }
                    .main:hover .text { opacity: 1; }
                    .main:hover .main_back { opacity: 0;display: none; }
                    .main:hover .menu { opacity: 0; display: none; }
                    .main:hover .card {
                        margin: 0;
                        border-radius: 10px;
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        background: var(--main-color);
                    }

                    .main:hover .card:nth-child(6) { border: transparent; }
                    .main:hover .title { opacity: 1; }
                    .main:hover .toggleAns { opacity: 1; }
                    .main:hover .greasy { opacity: 1; }
                    .main:hover .github { opacity: 1; }
                    .main:hover .settings { opacity: 1; }
                    .card:hover {
                        transform: scale(1.02);
                    }

                    .card:nth-child(1):hover {
                        border-bottom: 5px solid #0a0a0a;
                        position: relative;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        background-color: #f5e642;
                        background-image: repeating-linear-gradient(45deg, transparent 0px, transparent 8px, rgba(0, 0, 0, 0.12) 8px, rgba(0, 0, 0, 0.12) 10px);
                    }

                    .card:nth-child(1):hover .text { color: #292929; }
                    .card:nth-child(2):hover { border-bottom: 5px solid #0a0a0a; background: #adb5bd; }
                    .card:nth-child(2):hover .text { color: #292929; }
                    .card:nth-child(2):hover .toggleAns { fill: #292929; }
                    .card:nth-child(3):hover { border-bottom: 5px solid #0a0a0a; background-color: var(--secondary-color); }
                    .card:nth-child(3):hover .greasy { fill: var(--main-color); }
                    .card:nth-child(3):hover .svgIcon { transform: rotate(250deg); transition-duration: 1.5s; }
                    .card:nth-child(4):hover { border-bottom: 5px solid #0a0a0a; background-color: var(--secondary-color); }
                    .card:nth-child(4):hover .github { fill: var(--main-color); }
                    .card:nth-child(4):hover .text { color: var(--main-color); }
                    .card:nth-child(5):hover { border-bottom: 5px solid #0a0a0a; background-color: var(--secondary-color); }
                    .card:nth-child(5):hover .settings { fill: var(--main-color); }

                    .loader-container {
                        position: relative;
                        width: var(--loader-size);
                        height: var(--loader-size);
                    }

                    .loader-shadow {
                        position: absolute;
                        bottom: -6px;
                        left: calc(var(--loader-size) * -0.2);
                        width: calc(var(--loader-size) * 1.4);
                        height: 4px;
                        background: rgba(0, 0, 0, 0.15);
                        border-radius: 50%;
                        animation: shadowScale var(--anim-dur) infinite;
                        transform-origin: center center;
                    }

                    .loader-box-wrap {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        transform-origin: bottom center;
                        animation: squash var(--anim-dur) infinite;
                    }

                    .loader-box {
                        width: 100%;
                        height: 100%;
                        animation: jumpRotate var(--anim-dur) infinite;
                        transform-origin: center center;
                    }

                    .loader-box svg {
                        width: 100%;
                        height: 100%;
                        display: block;
                    }

                    @keyframes squash {
                        0% { transform: scaleX(1.05) scaleY(0.95); animation-timing-function: ease-in-out; }
                        15% { transform: scaleX(0.95) scaleY(1.05); animation-timing-function: ease-out; }
                        50% { transform: scaleX(1) scaleY(1); animation-timing-function: ease-in; }
                        84.9% { transform: scaleX(0.95) scaleY(1.05); }
                        85% { transform: scaleX(1.15) scaleY(0.85); animation-timing-function: ease-in-out; }
                        100% { transform: scaleX(1.05) scaleY(0.95); }
                    }

                    @keyframes jumpRotate {
                        0% { transform: translateY(0) rotate(0deg); animation-timing-function: ease-in-out; }
                        15% { transform: translateY(0) rotate(0deg); animation-timing-function: ease-out; }
                        50% { transform: translateY(var(--jump-height)) rotate(45deg); animation-timing-function: ease-in; }
                        84.9% { transform: translateY(0) rotate(90deg); }
                        85% { transform: translateY(0) rotate(90deg); animation-timing-function: ease-in-out; }
                        100% { transform: translateY(0) rotate(90deg); }
                    }

                    @keyframes shadowScale {
                        0% { transform: scaleX(1.05); opacity: 0.15; animation-timing-function: ease-in-out; }
                        15% { transform: scaleX(0.9); opacity: 0.1; animation-timing-function: ease-out; }
                        50% { transform: scaleX(0.5); opacity: 0.05; animation-timing-function: ease-in; }
                        84.9% { transform: scaleX(0.9); opacity: 0.1; }
                        85% { transform: scaleX(1.15); opacity: 0.2; animation-timing-function: ease-in-out; }
                        100% { transform: scaleX(1.05); opacity: 0.15; }
                    }

                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }

                    #pause { display: none; }

                    .card:nth-child(5) > svg { animation: spin 4s linear infinite; transform-origin: center; }

                    .words {
                        display: inline-block;
                        opacity: 0;
                        height: 1.5em;
                        overflow: hidden;
                        position: relative;
                    }

                    .word {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        padding-left: 6px;
                        color: #956afa;
                        animation: spin_words 4s infinite ease-in-out;
                    }

                    @keyframes spin_words {
                        20% { transform: translateY(-102%); }
                        33% { transform: translateY(-100%); }
                        53% { transform: translateY(-202%); }
                        66% { transform: translateY(-200%); }
                        86% { transform: translateY(-302%); }
                        100% { transform: translateY(-300%); }
                    }

                    .switch {
                        font-size: 17px;
                        position: relative;
                        display: inline-block;
                        width: 40px;
                        height: 22px;
                        opacity: 0;
                    }

                    .main:hover .switch {
                        opacity: 1;
                    }

                    .switch input {
                        opacity: 0;
                        width: 0;
                        height: 0;
                    }

                    .slider {
                        position: absolute;
                        cursor: pointer;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: #fff;
                        border: 1px solid #adb5bd;
                        transition: .4s;
                        border-radius: 22px;
                    }

                    .slider:before {
                        position: absolute;
                        content: "";
                        height: 16px;
                        width: 16px;
                        border-radius: 50%;
                        left: 2px;
                        bottom: 2px;
                        background-color: #adb5bd;
                        transition: .4s;
                    }

                    input:checked + .slider {
                        background-color: #39be44;
                        border: 1px solid #39be44;
                    }

                    input:focus + .slider {
                        box-shadow: 0 0 1px #39be44;
                    }

                    input:checked + .slider:before {
                        transform: translateX(18px);
                        background-color: #fff;
                    }

                    .settings_menu, .terms_menu {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        min-height: 100%;
                        height: max-content;
                        background: var(--main-color);
                        border-radius: 10px;
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                        backdrop-filter: blur(5px);
                        -webkit-backdrop-filter: blur(5px);
                        filter: blur(0px);

                        opacity: 0;
                        filter: blur(10px);
                        pointer-events: none;
                        visibility: hidden;
                        max-height: 100%;
                        overflow: hidden;
                        transition: opacity 0.3s ease-in-out, filter 0.3s ease-in-out, max-height 0.4s ease-in-out, visibility 0.3s;

                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-start;
                        padding: 20px;
                        box-sizing: border-box;
                        z-index: 100;
                        gap: 15px;
                    }

                    .settings-item {
                        border-radius: 8px; border: 1px solid rgba(150, 150, 150, 0.2);
                        padding: 10px 15px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        box-sizing: border-box;
                    }

                    #close-settings, #close-terms {
                        cursor: pointer;
                        fill: var(--secondary-color);
                        transition: transform 0.2s;
                    }

                    #close-settings:hover, #close-terms:hover {
                        transform: scale(1.2);
                    }

                    .settings_menu.open, .terms_menu.open {
                        opacity: 1;
                        filter: blur(0px);
                        max-height: 600px;
                        pointer-events: auto;
                        visibility: visible;
                        border-bottom: 5px solid #0a0a0a;
                        background-color: var(--main-color);
                    }

                    .settings_menu.open > div:first-child > .text, .terms_menu.open > div:first-child > .text {
                        color: var(--secondary-color);
                    }

                    .settings_menu.open > div:first-child > #close-settings, .terms_menu.open > div:first-child > #close-terms {
                        fill: var(--secondary-color);
                    }

                    .settings_menu .settings-item .text {
                        color: var(--secondary-color) !important;
                    }

                    .main:has(.settings_menu.open, .terms_menu.open) .card {
                        filter: blur(8px) !important;
                        pointer-events: none !important;
                        transition: filter 0.3s ease-in-out;
                    }

                    .menu-header {
                        width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;
                    }

                    .menu-title-wrapper {
                        display: flex; align-items: baseline; gap: 8px;
                    }

                    .menu-title {
                        opacity: 1; margin: 0; font-size: 18px; font-weight: bold;
                    }

                    .badge-version {
                        font-size: 11px; background: #4579f2; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-family: 'Poppins', sans-serif;
                    }

                    .settings-item-col {
                        display: flex; flex-direction: column;
                    }

                    .settings-item-title {
                        opacity: 1; font-size: 14px; color: var(--secondary-color);
                    }

                    .color-picker-input {
                        width: 40px; height: 22px; border: none; border-radius: 4px; cursor: pointer;
                    }

                    .btn-outline {
                        width: 90%; height: 40px; margin: 10px auto 0 auto; border-radius: 8px; border: 1px solid rgba(150, 150, 150, 0.2); cursor: pointer;
                    }

                    .btn-outline .text {
                        opacity: 1; font-size: 13px; font-weight: bold; color: var(--secondary-color); transition: color 0.2s ease;
                    }

                    .terms-content {
                        overflow-y: auto; max-height: 400px; font-size: 12px; color: var(--secondary-color); font-family: 'Poppins', sans-serif; text-align: left; padding-right: 5px;
                    }
                </style>

                <div class="main">
                <div class="card card-wide title">
                    <div style="display: flex; align-items: center;">
                    <p class="text">CiscoNetacad Cheat</p>
                        <div class="words">
                            <span class="word text">auto</span>
                            <span class="word text">simple</span>
                            <span class="word text">easy</span>
                            <span class="word text" aria-hidden="true">auto</span>
                        </div>
                    </div>
                </div>

                <div id="toggleAns" class="card">
                    <p class="text" style="margin-left: 5px;">Show Answers</p>
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider"></span>
                        </label>
                </div>

                <a id="greasy" href="https://greasyfork.org/es/scripts/587797-cisconetacad-cheat-show-answers" class="card" target="_blank" rel="noopener noreferrer">
                    <svg class="greasy" height="30px" width="30px" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.89 2.227a.28.28 0 0 1 .266.076l5.063 5.062c.54.54.509 1.652-.031 2.192l8.771 8.77c1.356 1.355-.36 3.097-1.73 1.728l-8.772-8.77c-.54.54-1.651.571-2.191.031l-5.063-5.06c-.304-.304.304-.911.608-.608l3.714 3.713L7.59 8.297 3.875 4.582c-.304-.304.304-.911.607-.607l3.715 3.714 1.067-1.066L5.549 2.91c-.228-.228.057-.626.342-.683ZM12 0C5.374 0 0 5.375 0 12s5.374 12 12 12c6.625 0 12-5.375 12-12S18.625 0 12 0Z"/>
                    </svg>
                </a>

                <a id="github" href="https://github.com/ByOscarPINE/CiscoNetacad-Cheat" class="card" target="_blank" rel="noopener noreferrer">
                    <svg height="30px" width="30px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" class="github">
                        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                    </svg>
                </a>

                <div id="config" class="card">
                    <svg class="settings" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
                </div>

                <div class="settings_menu">
                    <div class="menu-header">
                        <div class="menu-title-wrapper">
                            <p class="text menu-title">Settings</p>
                            <span id="script-version" class="badge-version">VERSION 1.0.0</span>
                        </div>
                        <svg id="close-settings" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </div>

                    <div id="dark-mode" class="settings-item">
                        <div class="settings-item-col">
                            <span class="text settings-item-title">Dark Mode</span>
                            <span class="subtext">Force the dark theme.</span>
                        </div>
                        <label class="switch" style="opacity: 1;">
                            <input type="checkbox">
                            <span class="slider"></span>
                        </label>
                    </div>

                    <div class="settings-item">
                        <div class="settings-item-col">
                            <span class="text settings-item-title">Answer Color</span>
                            <span class="subtext">Choose a custom color.</span>
                        </div>
                        <input id="color-picker" class="color-picker-input" type="color" value="#4579f2">
                    </div>

                    <div id="btn-terms" class="card-track btn-outline">
                        <span class="text">Terms & Conditions</span>
                    </div>
                </div>

                <div class="terms_menu">
                    <div class="menu-header">
                        <p class="text menu-title">Terms & Conditions</p>
                        <svg id="close-terms" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </div>
                    <div class="terms-content">
                        <p><strong>1. Educational Use:</strong> This script is a proof of concept for research purposes only.</p>
                        <p><strong>2. No Warranty:</strong> It is provided "as is", without any warranty of any kind.</p>
                        <p><strong>3. Privacy:</strong> No user information is stored or transmitted to external servers. Everything works entirely locally.</p>
                        <p><strong>4. Liability:</strong> The user assumes all risks associated with the use of this script.</p>
                    </div>
                </div>

                <div class="main_back">
                    <div class="cardBa">
                        <div class="loader-container">
                            <div class="loader-shadow"></div>
                            <div class="loader-box-wrap">
                                <div class="loader-box">
                                    <svg class="menu" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            `;

            const configBtn = shadow.querySelector('#config');
            const closeSettings = shadow.querySelector('#close-settings');
            const settingsMenu = shadow.querySelector('.settings_menu');
            const cards = shadow.querySelectorAll('.card, .card-track');
            const colorPicker = shadow.querySelector('#color-picker');
            const termsBtn = shadow.querySelector('#btn-terms');
            const closeTerms = shadow.querySelector('#close-terms');
            const termsMenu = shadow.querySelector('.terms_menu');
            const toggleMenu = (open) => settingsMenu?.classList.toggle('open', open);
            const toggleTerms = (open) => termsMenu?.classList.toggle('open', open);

            let isDragging = false;
            let startX, startY;
            const dragTarget = typeof shadow !== 'undefined' && shadow.host ? shadow.host : shadow.querySelector('.main');

            if (dragTarget && (!dragTarget.style.position || dragTarget.classList.contains('main'))) {
                dragTarget.style.position = 'fixed';
                dragTarget.style.bottom = '10px';
                dragTarget.style.right = '10px';
                dragTarget.style.zIndex = '99999';
            }

            let initialRight, initialBottom;

            dragTarget?.addEventListener('mousedown', (e) => {
                if (e.target.closest('.settings_menu, .terms_menu, input, label, a')) return;

                startX = e.clientX;
                startY = e.clientY;

                const computed = window.getComputedStyle(dragTarget);
                initialRight = parseInt(computed.right) || 0;
                initialBottom = parseInt(computed.bottom) || 0;

                function onMouseMove(moveEvent) {
                    const dx = startX - moveEvent.clientX;
                    const dy = startY - moveEvent.clientY;

                    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                        isDragging = true;
                        dragTarget.style.right = (initialRight + dx) + 'px';
                        dragTarget.style.bottom = (initialBottom + dy) + 'px';
                        dragTarget.style.cursor = 'grabbing';
                    }
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                    dragTarget.style.cursor = '';
                    setTimeout(() => { isDragging = false; }, 50);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });

            dragTarget?.addEventListener('click', (e) => {
                if (isDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);

            configBtn?.addEventListener('click', () => toggleMenu(true));
            closeSettings?.addEventListener('click', () => toggleMenu(false));
            settingsMenu?.addEventListener('mouseleave', () => toggleMenu(false));
            termsBtn?.addEventListener('click', () => {
                toggleMenu(false);
                toggleTerms(true);
            });
            closeTerms?.addEventListener('click', () => toggleTerms(false));
            termsMenu?.addEventListener('mouseleave', () => toggleTerms(false));

            function UpdateAnsColor() {
                if (html) {
                    html.style.setProperty('--color-picked-user', colorPicker.value);
                } else {
                    console.warn("Could not determine the background color because the element is null.");
                }
                localStorage.setItem("ansColor", colorPicker.value);
            }

            const ansColorSaved = localStorage.getItem("ansColor") || '#4579f2';
            colorPicker.value = ansColorSaved;
            UpdateAnsColor();
            colorPicker.oninput = UpdateAnsColor;

            const main = shadow.querySelector('.main');
            const menuIcon = shadow.querySelector('.menu');
            const checkbox = shadow.querySelector('#toggleAns input[type="checkbox"]');
            const checkboxDark = shadow.querySelector('#dark-mode input[type="checkbox"]');

            function verifyBackgroundColor() {
                const colorBackground = window.getComputedStyle(mainBody).backgroundColor;
                const rgb = colorBackground.match(/\d+/g);

                if (rgb && rgb.length >= 3) {
                    const r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);
                    const bright = (r * 299 + g * 587 + b * 114) / 1000;
                    return bright;
                } else {
                    console.log("Could not determine the background color.");
                }
            }

            function setTheme(isDark) {
                const props = isDark
                    ? ['#292929', '#ffffff']
                    : ['#ffffff', '#292929'];

                main.style.setProperty('--main-color', props[0]);
                main.style.setProperty('--secondary-color', props[1]);
                checkboxDark.checked = isDark
                const bright = verifyBackgroundColor();
                if(bright < 128) {
                    main.style.setProperty('--icon-color', '#ffffff');
                } else {
                    main.style.setProperty('--icon-color', '#292929');
                }
            }

            function verifyColorMode() {
                    const bright = verifyBackgroundColor();
                    setTheme(bright < 128);
            }

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'style' || mutation.attributeName === 'data-theme') {
                        verifyColorMode();
                    }
                });
            });

            observer.observe(mainBody, {
                attributes: true,
                attributeFilter: ['style', 'data-theme']
            });

            verifyColorMode();

            cards.forEach((card) => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const cardCenterX = rect.left + rect.width / 2;
                    const cardCenterY = rect.top + rect.height / 2;

                    const deltaX = e.clientX - cardCenterX;
                    const deltaY = e.clientY - cardCenterY;

                    const strength = 0.35;
                    const moveX = deltaX * strength;
                    const moveY = deltaY * strength;

                    card.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });

            function toggleAnswers() {
                if(html) {
                    if (checkbox.checked) {
                        html.style.setProperty('--color-cheat', 'var(--color-picked-user)');
                    } else {
                        html.style.setProperty('--color-cheat', 'currentColor');
                    }
                }
                localStorage.setItem("ansEnabled", checkbox.checked);
            };

            function changeColorMode() {
                setTheme(checkboxDark.checked);
                localStorage.setItem("darkMode", checkboxDark.checked);
            };

            checkbox.addEventListener('change', toggleAnswers);
            const ansEnabled = localStorage.getItem("ansEnabled") === 'true';
            checkbox.checked = ansEnabled;

            checkboxDark.addEventListener('change', changeColorMode);
            const darkModeSaved = localStorage.getItem("darkMode") === 'true';
            checkboxDark.checked = darkModeSaved;
            toggleAnswers();
            changeColorMode();

            const versionBadge = shadow.querySelector('#script-version');
            if (versionBadge && typeof GM_info !== 'undefined') {
                versionBadge.textContent = "VERSION " + GM_info.script.version;
            }

        } catch (e) {
            console.error("Error injecting the shadow DOM", e);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', toLoad);
    } else {
        toLoad();
    }

    const TARGET_URL_FRAGMENT = 'components.json';
    const originalFetch = window.fetch;

    window.fetch = async function(...args) {
        const response = await originalFetch.apply(window, args);
        const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;

        if (!url || !url.includes(TARGET_URL_FRAGMENT)) {
            return response;
        }

        try {
            const data = await response.json();

            if (Array.isArray(data)) {
                data.forEach(component => {

                    if (component._component === 'mcq') {
                        component._items = component._items.map(subItem => {
                            if (subItem._shouldBeSelected === true) {
                                subItem.text = `
                                <span class="ansText" style="color: var(--color-cheat) !important; filter: var(--blur-cheat) !important; transition: color 0.5s ease, filter 0.5s ease-in-out; display: inline;">
                                    <style>
                                        .ansText, .ansText * {
                                        color: var(--color-cheat) !important;
                                            filter: var(--blur-cheat) !important;
                                            transition: color 0.5s ease !important;
                                        }
                                    </style>
                                    ${subItem.text}
                                </span>
                                `.trim();
                            }
                            return subItem;
                        });

                    } else if (component._component === 'fillBlanks') {
                        component._items = component._items.map(subItem => {
                            subItem._options = subItem._options.map(option => {
                                if (option._isCorrect === true) {
                                    return {
                                        ...option,
                                        text: `${option.text} [answer]`
                                    }
                                }
                                return option;
                            })
                            return subItem;
                        });
                    } else if (component._component === 'stacker') {
                        component._items = component._items.map(subItem => {
                            subItem._options = subItem._options = {
                                ...subItem._options,
                                text: `[Pos: ${subItem.position[0]}] ${subItem._options.text}`
                            }
                            return subItem;
                        });
                    } else if (component._component === 'slider') {
                        const body = component.body || "";
                        component.body = `
                        ${body} <p dir=\"ltr\" style='color:var(--color-cheat); transition: color 0.5s ease;'><strong>[Answer: ${component._correctAnswer}]</strong></p>
                        <img src="x" onerror="(function(img){
                            let currentNode = img;
                            let baseView = null;

                            while (currentNode) {
                                if (currentNode instanceof ShadowRoot) { currentNode = currentNode.host; }
                                else { currentNode = currentNode.parentNode; }
                                if (currentNode && currentNode.tagName === 'BASE-VIEW') { baseView = currentNode; break; }
                            }

                            if (baseView && baseView.parentElement) {
                                const commonContainer = baseView.parentElement.parentElement;
                                if (!commonContainer) return;


                                const evaluateAndMarkSlider = () => {
                                    const siblingWidget = commonContainer.querySelector('.slider__widget');
                                    if (!siblingWidget) return;

                                    const scaleNumbers = siblingWidget.querySelectorAll('.js-slider-number');
                                    const numberSlider = siblingWidget.querySelector('.slider__highlighter');
                                    if (scaleNumbers.length === 0) return;

                                    const correctNumber = Array.from(scaleNumbers).find(function(numElement) {
                                        return parseInt(numElement.dataset.id) === parseInt(${component._correctAnswer});
                                    });

                                    if (correctNumber) {
                                        scaleNumbers.forEach(function(numElement) {
                                            numElement.style.removeProperty('color');
                                            numElement.style.removeProperty('font-weight');
                                        });

                                        correctNumber.style.setProperty('color', 'var(--color-cheat)', 'important');
                                        correctNumber.style.setProperty('font-weight', 'bold', 'important');
                                    } else {
                                        console.warn('No element found with dataset.id equal to ' + ${component._correctAnswer});
                                    }

                                    if (numberSlider) {
                                        const currentSliderValue = numberSlider.innerText.trim();

                                        if (parseInt(currentSliderValue) === parseInt(${component._correctAnswer})) {
                                            numberSlider.style.setProperty('color', 'var(--color-cheat)', 'important');
                                            numberSlider.style.setProperty('font-weight', 'bold', 'important');
                                        } else {
                                            numberSlider.style.removeProperty('color');
                                            numberSlider.style.removeProperty('font-weight');
                                        }
                                    }
                                };

                                const sliderObserver = new MutationObserver(function() { evaluateAndMarkSlider(); });
                                sliderObserver.observe(commonContainer, { childList: true, subtree: true, characterData: true });

                                evaluateAndMarkSlider();
                            }
                            img.remove();
                        })(this)" style="display:none;">
                        `
                    } else if (component._component === 'matching') {
                        component._items = component._items.map(subItem => {
                            subItem._options = subItem._options.map(option => {
                                if (option._isCorrect === true) {
                                    return {
                                        ...option,
                                        text: `<p style='color:var(--color-cheat); transition: color 0.5s ease;'>${option.text}</p>`
                                    }
                                }
                                return option;
                            })
                            return subItem;
                        });
                    } else if (component._component === 'gmcq') {
                        component._items = component._items.map(subItem => {
                            if (subItem._shouldBeSelected === true) {
                                subItem.text = `<p style='color:var(--color-cheat); transition: color 0.5s ease;'>${subItem.text} [Answer]</p>`;
                            }
                            return subItem;
                        });
                    } else if (component._component === 'yesNo') {
                        const answers = [];
                        component._items = component._items.map(subItem => {
                            const fullPath = subItem._graphic.src;
                            const pureIdSrc = fullPath.split('/').pop();
                            answers.push({
                                _id: pureIdSrc,
                                _shouldBeSelected: subItem._shouldBeSelected
                            });
                            return subItem;
                        });
                        const answersSafeString = JSON.stringify(answers).replace(/"/g, "'");
                        component.body = `
                        ${component.body}
                        <img src="x" onerror="(function(img){
                            const answerMap = ${answersSafeString};
                            let currentNode = img;
                            let baseView = null;
                            while (currentNode) {
                                if (currentNode instanceof ShadowRoot) { currentNode = currentNode.host; }
                                else { currentNode = currentNode.parentNode; }
                                if (currentNode && currentNode.tagName === 'BASE-VIEW') { baseView = currentNode; break; }
                            }

                            if (baseView && baseView.parentElement) {
                                const parentContainer = baseView.parentElement.parentElement;
                                if (!parentContainer) return;

                                const evaluateAndStyle = () => {
                                    const imgQuestion = parentContainer.querySelector('.img_question');

                                    const btnYesText = parentContainer.querySelector('.user_selects_yes .yesno-btn-text');
                                    const btnNoText = parentContainer.querySelector('.user_selects_no .yesno-btn-text');

                                    if (!imgQuestion || !btnYesText || !btnNoText) return;

                                    const fullSrc = imgQuestion.getAttribute('src') || '';
                                    const imageName = fullSrc.substring(fullSrc.lastIndexOf('/') + 1);

                                    btnNoText.style.removeProperty('color');
                                    btnYesText.style.removeProperty('color');

                                    const foundAnswer = answerMap.find(function(item) {
                                        return item._id === imageName;
                                    });

                                    if (foundAnswer) {
                                        if (foundAnswer._shouldBeSelected) {
                                            btnYesText.style.setProperty('color', 'var(--color-cheat)', 'important');
                                        } else {
                                            btnNoText.style.setProperty('color', 'var(--color-cheat)', 'important');
                                        }
                                    }
                                };

                                const observer = new MutationObserver(function() { evaluateAndStyle(); });
                                observer.observe(parentContainer, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });

                                evaluateAndStyle();
                            }
                            img.remove();
                        })(this)" style="display:none;">
                        `;
                    } else if (component._component === 'narrative') {
                        console.log("Nothing detected");
                    }
                });
            }
            return new Response(JSON.stringify(data), {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            });

        } catch (e) {
            console.error("Error intercepting/modifying the body", e);
            return response;
        }
    };
})();