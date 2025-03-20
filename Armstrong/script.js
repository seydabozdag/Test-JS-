function isArmstrongNumber(num) {
  const digits = num.toString().split('');
  const n = digits.length;
  
  const sum = digits.reduce((acc, digit) => {
      return acc + Math.pow(parseInt(digit), n);
  }, 0);
  
  return sum === num;
}

function findArmstrongNumbers(start, end) {
  const armstrongNumbers = [];
  
  for (let i = start; i <= end; i++) {
      if (isArmstrongNumber(i)) {
          armstrongNumbers.push(i);
      }
  }
  
  return armstrongNumbers;
}

const range1 = findArmstrongNumbers(1, 1000);
console.log("1-1000 arasındaki Armstrong sayıları:", range1);

const testNumber = 153;
console.log(`${testNumber} bir Armstrong sayısı mı? ${isArmstrongNumber(testNumber)}`);

const range2 = findArmstrongNumbers(1, 10000);
console.log("1-10000 arasındaki Armstrong sayıları:", range2);