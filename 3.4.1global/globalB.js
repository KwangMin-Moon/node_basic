const A = require('./globalA');

global.message = '안녕하세요';
console.log(A());

// global은 노드의 전역객체이므로 모든 파일에서 접근할 수 있다.
// 그래서 전역 객체라는 점을 이용해서 파일 간에 간단한 데이터를 공유할 때 사용하기도 한다.
// globalB.js에서 넣은 global.message 값을 globalA에서도 접근할 수 있다.
