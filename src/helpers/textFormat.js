export default function formatText(num) {
  function check(num) {
    let last = String(num).substr(-1);
    let oneBeforeLast = String(num).substr(-2, 1);
    return [2,3,4].includes(Number(last)) && Number(oneBeforeLast) !== 1;
  }

  if (num === 0) {
    return '0 głosów';
  } else if (num === 1) {
    return '1 głos';
  } else if (num === 2 || num === 3 || num === 4) {
    return `${num} głosy`;
  } else if (check(num)) {
    return `${num} głosy`;
  } else {
    return `${num} głosów`;
  }
}
