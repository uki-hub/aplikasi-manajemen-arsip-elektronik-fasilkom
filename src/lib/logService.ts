const logService = (function () {
  const logs: string[] = [];

  return {
    log: (value: unknown) => {
      const valueType = typeof value;

      if (["string", "number", "bigint", "boolean"].includes(valueType)) {
        logs.push(value as string);
      } else {
        logs.push(JSON.stringify(value));
      }
    },
    get: (): string[] => logs,
  };
})();

export default logService;
