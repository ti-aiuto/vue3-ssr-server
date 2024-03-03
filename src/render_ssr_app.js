import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { rootComponents } from "./root_components.js";

function renderComponent({ rootComponentName, rootProps, provided }) {
  return new Promise(async (resolve, reject) => {
    try {
      const rootComponent = rootComponents[rootComponentName];
      if (!rootComponent) {
        return reject(`rootComponentName: ${rootComponentName}は未定義です`);
      }
      app.provide(provided || {});
      const app = createSSRApp(rootComponent, rootProps || {});
      app.config.errorHandler = reject;
      resolve(await renderToString(app));
    } catch (e) {
      reject(e);
    }
  });
}

// rootComponentName, rootProps, providedをグローバルに定義している前提で実装している
global.promise = renderComponent(global);
