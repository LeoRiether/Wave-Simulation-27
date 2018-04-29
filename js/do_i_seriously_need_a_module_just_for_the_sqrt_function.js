export function sqrt(x) {
  return Math.sign(x) * Math.sqrt(Math.sign(x)*x);
}