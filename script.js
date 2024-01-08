// html 요소를 자바스크립트에서 사용할 수 있도록 
const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

// 할 일 목록을 담을 배열
// {고유한 값(id), 할 일(Text), 수행 여부(T/F)}
let todos = [];

// 클릭 이벤트 발생 시 createNewTodo 함수 실행
createBtn.addEventListener('click', createNewTodo);
// addEventListener  => 어떠한 이벤트가 발생했을 때 함수를 등록.

function createNewTodo() {
    // 새로운 아이템 객체 생성
    const item = {
        // Date().getTime(): 1970년대 이후 실시간으로 시간을 가져옴
        id: new Date().getTime(),
        text: '',
        // 초반 상태는 선택되지 않은 상태이므로 false
        complete: false
    }

    // 배열 처음에 새로운 아이템 추가
    todos.unshift(item);

    // 데이터를 추가했으니, 이제는 화면에 보여줄 요소를 생성해야 함
    const {itemEl, inputEl} = createTodoElement(item);
    // list div에 itemEl 넣어주기 (리스트 요소 안에 방금 생성한 아이템 요소 추가) 
    // prepend() 메서드를 사용하면 첫 요소 앞에 넣어줌
    list.prepend(itemEl);

    // 생성 후 처음에 입력 불가능 => 속성 삭제 => 입력이 가능해짐
    inputEl.removeAttribute('disabled');
    // 요소 생성 후 바로 입력이 가능하도록 하려면 focus 주면 된다.
    inputEl.focus();

    saveToLocalStorage();
}

// 요소만을 생성하는 함수
function createTodoElement(item) {
    // div 요소를 생성
    const itemEl = document.createElement('div');
    // 생성한 요소에 클래스 부여
    itemEl.classList.add('item');

    // 체크박스 생성, 타입을 체크박스로 변경
    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    // 요소 상에서 체크값 유지
    checkboxEl.checked = item.complete;

    if (item.complete) {
        itemEl.classList.add('complete');
    }

    // 할 일 목록 입력하는 인풋요소 생성
    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    // 처음에는 입력이 불가능하도록 disabled 속성
    inputEl.setAttribute('disabled', '');

    // 필요한 버튼 영역 생성 (수정. 삭제)
    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('meterial-icon');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('meterial-icon', 'remove-btn');
    removeBtnEl.innerText ='remove';

    // 각 div에 해당하는 각 요소를 추가
    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    // 작성한 할 일 목록을 가져온다.
    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    })

    // 체크박스의 체크값을 가져온다.
    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        // 체크를 했다면 div의 클래스에 complete 클래스 추가, 아니라면 클래스 삭제
        if(item.complete) {
            itemEl.classList.add("complete");
        } else {
            itemEl.classList.remove("complete");
        }
        // 새로고침 시에도 체크값 유지
        saveToLocalStorage();
    })

    // 작성 후 요소의 외부를 선택하면 수정이 불가능하도록 속성 변경
    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        // 새로고침 시에도 블러값 유지
        saveToLocalStorage();
    });

    // 수정 버튼을 클릭하면 수정 가능하도록 속성 변경 및 포커스
    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();

        saveToLocalStorage();
    });

    // 요소 삭제 시 요소와 데이터 모두 삭제
    removeBtnEl.addEventListener('click', () => {
        // todos의 배열에서 클릭한 item의 id와 동일한 값을 빼고 새로운 배열 todos 선언
        // filter()는 배열을 순회하면서 조건에 맞는 값을 배열로 생성
        // 데이터 삭제
        todos = todos.filter(t => t.id != item.id);
        // 요소 삭제
        itemEl.remove();

        saveToLocalStorage();
    });

    // 다른 함수에서 이 함수를 불러올 때 값을 전달해주기 위해 리턴 사용
    return {itemEl, inputEl, editBtnEl, removeBtnEl};
}

// 요소가 여러 개일 수 있으므로 for-loop를 사용
function displayTodos() {
    // 데이터를 가져오고
    loadFromLocalStorage();

    for(let i = 0; i < todos.length; i++) {
        const item = todos[i];
        // itemEl에 새로 생성한 item 객체 넣어줌
        const { itemEl } = createTodoElement(item);
        // 할 일 목록에 새로 생성한 객체 추가
        list.append(itemEl);
    }
}
// 스크립트 로드 시 바로 실행
displayTodos();

// 새로고침 시에도 데이터가 남아있을 수 있도록 localStorage에 저장
// 항상 String 타입으로 넣어야 함
function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    // window.localStorage.setItem('my_todos', data);
    // window는 생략 가능
    // localStorage에 데이터를 키-값으로 저장
    localStorage.setItem('my_todos', data);
}

// localStorage에 저장된 데이터 가져오는 함수
function loadFromLocalStorage() {
    // my_todos라는 키로 localStorage에 저장된 데이터 가져옴
    const data = localStorage.getItem('my_todos');

    if(data) {
        // JSON String을 object로 변환
        todos = JSON.parse(data);
    }
}
