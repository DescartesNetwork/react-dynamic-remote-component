/* eslint-disable no-unreachable */
export const loadModule = (url: string, scope: string, module: string) => {
  return async () => {
    try {
      //@ts-expect-error
      await __webpack_init_sharing__("default");
      //@ts-expect-error
      const container = window[scope];

      if (!container.isInitialized) {
        container.isInitialized = true;
        //@ts-expect-error
        await container.init(__webpack_share_scopes__.default);
      }
      //@ts-expect-error
      const factory = await window[scope].get(module);

      const Module = factory();

      return Module;
    } catch (e: any) {
      const error = new Error(
        `There was a problem loading the remote module. Please check the parameters (url: ${url} scope: ${scope} module: ${module}). Details:\n\n${e.message}`
      );
      error.name = "RemoteModuleLoadingError";
      throw error;
    }
  };
};
