const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
dotenv.config();

const indexRouter = require('./routes');
const userRouter = require('./routes/user');

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(cookieParser('zerochopassword'));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'zerochopassword',
    cookie: {
      httpOnly: true,
    },
    name: 'connect.sid',
  })
);
app.use(express.json()); // 클라이언트에서 json데이터를 보냈을 때 json데이터를 파싱해서 req.body로 넣어준다.
app.use(express.urlencoded({ extended: true })); // 클라이언트에서 form submit할 때  form을 파싱해준다. extend: true는 form 파싱할 때  쿼리스틔링을 어떻게 처리 할 것인가, true면 qs라는 모듈을 쓴다. false면 내장 모듈  querystring을 쓴다. qs가 더 강력하다.
// json, urlencoded를 쓰면 request에서 보내는 데이터를 알아서 파싱해준다.
// form에서 파일, 이미지를 보낼 때 urlencoded로는  파싱이 안돼서 multer를 쓸 수 있다.
app.use('/', express.static(path.join(__dirname, 'public')));
//app.use('요청경로', express.static('실제경로'))
// static미들웨어를 쓰면 정적파일들을 제공해줄 수 있다.요청 경로와 실제경로가 다르기 때문에 보안에도 도움이 된다.
// 예) 요청 경로 localhost:3000/zerocho.html   실제 경로 learn-express/public-3030/zerocho.html
app.use(
  (req, res, next) => {
    console.log('1 요청에 실행하고 싶어요');
    next();
  },
  (req, res, next) => {
    console.log('2 요청을 실행하고 싶어요');
    next();
  },
  (req, res, next) => {
    console.log('3 요청을 실행하고 싶어요');
    next();
  }
);

app.use(
  (req, res, next) => {
    console.log('요청을 실행하고 싶어요');
    next();
  },
  (req, res, next) => {
    try {
      console.log('에러');
      next();
    } catch (error) {
      next(error); // next에 인수가 들어가면 바로 에러미들웨어로 간다. 'route'인 경우 다음 라우터로
    }
  }
);

app.get(
  '/',
  (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    if (true) {
      next('route');
    } else {
      next();
    }
  },
  (req, res) => {
    console.log('실행되나요?');
  }
);

app.get('/', (req, res) => {
  console.log('실행되지롱');
});
app.post('/', (req, res) => {
  res.send('hello express!');
});
app.get('/category/Javascript', (req, res) => {
  res.send('hello Javascript');
});
app.get('/category/:name', (req, res) => {
  res.send('hello params');
});
app.get('/about', (req, res) => {
  res.send('hello express');
});
app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  res.status(404).send('Not Found'); // 에러 처리는 아니지만 라우터들 모두다 검색해봤는데 아무것도 안떴다 그럼 404(난 니 요청이 어디로 간지 모르겠어)
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send('엘러 났다.');
});

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});

user.filter((user) => user.userId === userId);
