## Todo App 구현 및 추가 기능 구현

`해당 저장소는 강의를 수강하며 구현한 기본 기능 코드에 추가로 기능을 추가한 프로젝트 저장소입니다.` </br>

**개발 기간** </br>sd
**2024.01.04 ~ 2024.01.14 (계획 기간)** </br>
2024.01.08: 기본 기능 구현 완료 (O) </br>
2024.01.10: 추가 기능 달성률 구현 완료 () </br>
2024.01.14: 추가 기능 구현 완료 ()


### 기본 기능
- 할 일 목록 추가(생성)
- 할 일 목록 수정
- 할 일 목록 삭제
- LocalStorage 사용으로 새로 고침에도 할 일목록 남아있게 유지

### 추가 기능
- 완료한 일은 수정과 삭제 불가 (미완료 할 일로 상태 변경 후 수정, 삭제 가능)
- 계획한 일 중 얼마나 달성했는지 보여주기 (ex. 10개 중 3개 완료)

### 더 구현해보고 싶은 기능
- 일정관리 어플처럼 매일매일 할 일 목록 만들고 관리 가능 </br>(이전 기록 확인 가능, 주/월마다 몇 개의 할 일을 완료했는지 확인 가능)
- 완료한 일마다 평가 </br>(이모지, 만족도 퍼센트)
- 카테고리를 나누어 표시 </br>(새로할 일, 오늘 꼭 해야할 일, 밀린 일 등)
- 이모지로 어떤 장르의 일인지 표시 </br>(학업, 회사, 일상, 운동 등)

### 새롭게 배운 것
- filter()
- JSON.~~
    - JSON.stringify()
    - JSON.parse()

### 화면


### 오류
- 강의를 수강하며 코드를 작성하는데 TypeError 발생 </br>
`Uncaught TypeError TypeError: Document.createElement is not a function` </br>
=> document.OO으로 사용해야 하는데 Document.OO으로 작성한 부분 발견 </br>
=> 수정 후 해결됨

- TypeError와 새로고침 시 할 일 목록 하나가 생성되어 있음 </br>
`Uncaught TypeError TypeError: Cannot destructure property 'itemEl' of 'createNewTodo(...)' as it is undefined.` </br>
=> 함수 연결을 잘못(`createNewTodo()`)해서 매개변수가 없는 함수에 매개변수를 넣어버렸다. </br>
=> 맞는 함수 연결 후 해결됨 (매개변수 item을 가지고 있는 `createTodoElement(item)`)

- 새로 고침을 눌렀을 때 모든 할 일 목록(완료 한 일 포함)이 수정 가능 상태로 변경 </br>
=> input에 disabled 속성이 들어가야 하는데 왜인지 상위 div인 item에 disabled 속성이 들어감 </br>
=> input 요소를 생성하는 코드에서 input이 아닌 item에 disabled 속성을 추가함
