export const bindColor = (name: string, value: string) => {
  const root = document.documentElement;
  root.style.setProperty(name, value);
};
