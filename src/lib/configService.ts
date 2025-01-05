type ConfigObject = {
  API_URL: string;
};

const configService = (function () {
  let config: ConfigObject;

  return {
    init: async (): Promise<ConfigObject> => {
      const response = await fetch("/config.json");
      config = await response.json();

      return config;
    },
    get: (): ConfigObject => config!,
  };
})();

export default configService;
