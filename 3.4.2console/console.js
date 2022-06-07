// console 객체는 보통 디버깅을 위해 사용, 변수에 값이 제대로 들어 있는지 확니하기 위해 사용하고, 에러 발생 시 에러 내용을 코솔에 표시하기 위해 사용
// 혹은 코드 실행 시간을 알아보려고 사용

const string = 'abc';
const number = 1;
const boolean = true;
const obj = { outside: { inside: { key: 'value' } } };

console.time('전체 시간');
console.log('평범한 로그입니다 쉽표로 구분해 여러 값을 찍을 수 있습니다');
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 담아주세요');

console.table([
  { name: 'jason', birth: 1995 },
  { name: 'tina', birth: 1994 },
]);

console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

console.time('시간 측정');
for (let i = 0; i < 1000000; i++) {}
console.timeEnd('시간 측정');

function b() {
  console.trace('에러 위치 추적');
}
function a() {
  b();
}
a();
console.timeEnd('전체 시간');
