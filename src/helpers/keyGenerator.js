export const keygen = () => {
  return (Math.random().toString(36).substring(6))
}