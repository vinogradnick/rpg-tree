export async function loadScript<T>(filePath: string): Promise<T> {
  const { default: scriptClass } = await import(filePath);
  return new scriptClass();
}
