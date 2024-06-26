import { describe, test, expect, beforeEach } from "vitest";

import { Lightbox } from "../src/lightbox";

describe("Lightbox", () => {

    let lightbox: Lightbox;

    beforeEach(() => {
        document.body.innerHTML = "";
        document.body.style.cssText = "";
        lightbox = new Lightbox();
    });

    test("Class members are all defined after construction", () => {
        expect(lightbox.body).toBeInstanceOf(Element);
        expect(lightbox.root).toBeInstanceOf(Element);
        expect(lightbox.holder).toBeInstanceOf(Element);
    });

    test("Root element is assigned to lightbox.root", () => {
        expect(lightbox.root.outerHTML).toEqual(`<div class="tebex-js-lightbox"><div class="tebex-js-lightbox__holder" role="dialog"></div></div>`);
    });

    test("Holder element is assigned to lightbox.holder", () => {
        expect(lightbox.holder.outerHTML).toEqual(`<div class="tebex-js-lightbox__holder" role="dialog"></div>`);
    });

    describe("show()", () => {

        test("Appends lightbox element to <body>", async () => {
            expect(document.body.querySelector('.tebex-js-lightbox')).toBeNull();
            await lightbox.show();
            expect(document.body.querySelector('.tebex-js-lightbox')).not.toBeNull();
        });

        test("Only resolves once transition has finished", async() => {
            const start = performance.now();
            await lightbox.show();
            const end = performance.now();
            expect(end - start).toBeGreaterThan(390); // default duration is 410ms, but test timing isn't super precise
        });

        test("CSS var --tebex-js-duration can be used to adjust the duration time", async() => {
            document.body.style.cssText += "--tebex-js-duration: 1s";
            const start = performance.now();
            await lightbox.show();
            const end = performance.now();
            expect(end - start).toBeGreaterThan(900);
        });
    });

    describe("hide()", () => {

        test("Removes lightbox element from <body>", async () => {
            await lightbox.show();
            expect(document.body.querySelector('.tebex-js-lightbox')).not.toBeNull();
            await lightbox.hide();
            expect(document.body.querySelector('.tebex-js-lightbox')).toBeNull();
        });

        test("Only resolves once transition has finished", async() => {
            await lightbox.show();
            const start = performance.now();
            await lightbox.hide();
            const end = performance.now();
            expect(end - start).toBeGreaterThan(390); // default duration is 410ms, but test timing isn't super precise
        });

        test("CSS var --tebex-js-duration can be used to adjust the duration time", async () => {
            await lightbox.show();
            document.body.style.cssText += "--tebex-js-duration: 1s";
            const start = performance.now();
            await lightbox.hide();
            const end = performance.now();
            expect(end - start).toBeGreaterThan(900);
        });

    });

    describe("destroy()", () => {

        test("Immediately removes lightbox element from <body>", async () => {
            await lightbox.show();
            expect(document.body.querySelector('.tebex-js-lightbox')).not.toBeNull();
            lightbox.destroy();
            expect(document.body.querySelector('.tebex-js-lightbox')).toBeNull();
        });
    });

});