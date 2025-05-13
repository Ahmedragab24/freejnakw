export default function getTimeDifference(futureDateStr) {
  // Replace space with 'T' to make it compatible with Date() parsing
  const futureDate = new Date(futureDateStr.replace(" ", "T"));

  const now = new Date();
  let diffInMs = futureDate - now;

  if (diffInMs < 0) {
    return "Time has already passed!";
  }

  const minutes = Math.floor((diffInMs / 1000 / 60) % 60);
  const hours = Math.floor((diffInMs / 1000 / 60 / 60) % 24);
  const days = Math.floor(diffInMs / 1000 / 60 / 60 / 24);

  return `${days}d : ${hours}h : ${minutes}m`;
}
