import { App } from "vue"
import { setupElemementplus } from "./element-plus"
import { setupFontawesome } from "./font-awesome"
import { setupTailwindcss } from "./tailwindcss"

export function setupPlugin(app:App){
    setupFontawesome()
    setupTailwindcss()
    setupElemementplus(app)
}