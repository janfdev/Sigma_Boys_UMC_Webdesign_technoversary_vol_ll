// Match user-visible text even when a number is rendered inside an inline component.
export const visibleText = (pattern: RegExp) => (_: string, element: Element | null): boolean => {
  const matches = (node: Element) => pattern.test((node.textContent ?? "").replace(/\s+/g, " ").trim());
  return !!element && matches(element) && !Array.from(element.children).some(matches);
};
