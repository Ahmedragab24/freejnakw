export default function splitUniqueArrays(inputArray) {
  // Count occurrences of each number
  const countMap = {};
  inputArray.forEach((num) => {
    countMap[num] = (countMap[num] || 0) + 1;
  });

  const uniqueNumbers = Object.keys(countMap).map(Number);

  // Validate the array
  if (
    uniqueNumbers.length > 3 ||
    Object.values(countMap).some((count) => count > 2)
  ) {
    throw new Error(
      "Invalid array: More than 3 unique numbers or a number repeated more than twice."
    );
  }

  // Split into two arrays
  const firstArray = [...uniqueNumbers]; // Unique numbers
  const secondArray = uniqueNumbers.filter((num) => countMap[num] === 2); // Repeated numbers

  return [firstArray, secondArray];
}
