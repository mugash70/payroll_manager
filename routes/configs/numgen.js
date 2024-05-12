module.exports = generateRandomNumber = (StartAlphabet) => {
  const timestamp = Date.now().toString(); // Get current timestamp
  const randomNumberString = StartAlphabet + timestamp.slice(1); // Concatenate with StartAlphabet

  return randomNumberString;
}
