export const formatDuration = (duration) => {
  const [hours, minutes] = duration.split(":").map(Number)
  if (minutes === 0) {
    return `${hours} Jam`
  }
  return `${hours} Jam ${minutes} Menit`
}
