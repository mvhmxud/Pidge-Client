export const normalize = (text: string) =>
  text.replace(/\r\n|\r/g, "\n").trim();
