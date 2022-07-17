const randNum = (maxNum) => {
  return Math.floor(Math.random() * maxNum);
};

module.exports.randNum = randNum;

module.exports.randElem = (arr) => {
  return arr[randNum(arr.length)];
};

module.exports.capitalize = (str) => {
  return str.split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
};
