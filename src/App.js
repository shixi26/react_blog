import { useState } from 'react';
import React from 'react'; //class컴포넌트사용시
import './App.css';


function App() {
  //자료 잠깐 저장시 state 사용, 변동시 자동으로 html에 반영되게 만들고 싶을 때 사용
  //1. import {useState} 2. useState(보관할자료) 3. let [state에보관했던자료,state변경함수]
  let [lists, setList] = useState([    
    { title: '다글제목1', body: '2024. 11. 11' , like: 0},
    { title: '나글제목2', body: '2024. 11. 12' , like: 0},
    { title: '가글제목3', body: '2024. 11. 13' , like: 0},]) //참고 Distructuring 문법
  let [modal, setModal] = useState(false) // 동적ui만들기 ui현재상태state저장
  let [prpsList, setPrpsList] = useState([]) // 상세페이지정보 *state는 사용하는 컴포넌트들 중 최상위 컴포넌트에 사용
  let [inputVal, setInputVal] = useState('') //입력값 저장 state

  // 기능1: 좋아요아이콘클릭시 숫자 증가
  const handleLike = (index)=>{
    const updatedLists = [...lists] 
    updatedLists[index].like += 1
    setList(updatedLists)
  }

  // 기능2: 수정버튼클릭시 첫번째 제목 변경
  // let copy = lists (x) 
  // 'lists'라는 변수에는 자료의 위치를 가리키는 화살표만 저장되어 있음
  // state변경함수 특징 : 기존state==새state 이면 변경안해줌 => copy == lists 는 true 
  // 참고: reference data type
  const handleEdit = () =>{
    // *array/object 다룰시 원본은 보존하는것이 좋다
    let copy = [...lists] 
    copy[0].title= ' 글제목수정'
    setList(copy)
  }

  // 기능3: lists객체 title기준으로 가나다순 정렬
  const handleSort =() => {
    let copy = [...lists] 
    copy.sort((a,b)=>{ //sort함수
      if (a.title < b.title) return -1 // a가 b보다 작으면 a가 먼저 오도록
      if (a.title > b.title) return 1 // a가 b보다 크면 b가 먼저 오도록
      return 0 // a와 b가 같으면 순서 유지
    })
    setList(copy)
  }

  // 기능4: 버튼클릭시 모달창 열었다닫힘
  const handleModal = (i) => {
    let copy = [...lists]
    setPrpsList(copy[i]) //상세페이지정보
    setModal(prevState => !prevState) //모달오픈
  }

  // 기능5: 추가 버튼 클릭시 기존 글 앞에 추가
  const addRow = () => {
    if(inputVal.trim() === ''){
      return
    } //input값 변경없을시 추가X

    const today = new Date()
    const fomattedDate = today.toLocaleDateString('ko-KR')

    setList((prevState) => [{title:inputVal,body:fomattedDate,like:0}, ...prevState]);
    setInputVal(''); // 추가 후 input 값을 초기화
  }

  // 기능6: 삭제 버튼 클릭시 해당 글삭제
  const delRow = (index) => {
    //filter매서드 사용
    if(window.confirm("정말 삭제하시겠습니까?")){
      setList((prevState) => prevState.filter((_,i)=>i !== index))
    }
  }

  // return() 안에는 병렬로 태그 2개 이상 금지
  // 쓰고 싶으면 의미없는 <div></div> 대신 <></> 사용가능
  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{color:'red',fontSize:'20px'}}>React Blog</h4>
      </div>
      <div className='btn-area-right'>
        <button className="btn-solid" onClick={()=>{handleEdit()}}>수정</button>
        <button className="btn-solid" onClick={()=>{handleSort()}}>정렬</button>
      </div>
      <div>
        {/* map(function(a,i){return()}) 함수 사용: array자료갯수만큼 함수안의 코드를 실행시켜 줌 */}
        {/* 반복문으로html생성시 key={유니크한숫자} 추가해야함 */}
        {/* e.stopPropagation() 상위html로 퍼지는 이벤트버블링을 막아줌*/}
        {lists.map((list,i) => (
          <div key={'div_'+i}>
            <div className='btn-area-right' key={'btn_'+i}>
              <button className="btn-delete" onClick={()=>{delRow(i)}}><span>삭제</span></button>
            </div>
            <table className="list" key={i}>
              <thead><tr className="title" onClick={()=>{handleModal(i)}}><th>{list?.title}<span onClick={(e)=>{e.stopPropagation(); handleLike(i)}}>👍</span>{list?.like}</th></tr></thead>
              <tbody><tr className="body"><td>{list?.body}</td></tr></tbody>
            </table>
          </div> 
        ))}            
      </div>

      <div>
        <input onChange={(e)=>{setInputVal(e.target.value); console.log(inputVal)}}/>
        <button className="btn-solid" style={{marginLeft:'5px'}} onClick={()=>{addRow()}}>추가</button>
      </div>
      {/* html중간에 조건문쓰기 : if문대신 삼항연산자로 중괄호 안에 작성 */}
      {/* 부모(App)->자식(Modal)로 state 전송: props문법 사용 <자식컴포넌트 작명={state명} /> */}
      {/* 파라미터문법:다양한 기능을 하는 함수 만들때 */}
      {
        modal === true ? <Modal fn={handleEdit} lists={prpsList}/> : null
      }
      {/* <ClassComponent/> */}
    </div>
  );
}

// 컴포넌트
// 사용법: 1.밖에 function 만들기 2.return()안에 html담기 3.<함수명></함수명>사용
// 반복적으로 사용하는 html, 큰페이지들, 자주변경되는ui
// const Modal =()=>{return(html)}  function Modal(){return(html)} 
const Modal = (props) => {
  return(
    <div className="modal">
      <div className="content">
        <div className="tit_area"><h4>상세페이지</h4></div>
        <div>
          <table className="list">
            <thead><tr className="title"><th>{props.lists.title}</th></tr></thead>
            <tbody><tr className="body"><td>내용</td></tr></tbody>
          </table>
          <div className="btn-area-right">
            <button className="btn-solid" onClick={props.fn}>글수정</button>
          </div>
        </div>
      </div>
    </div>
  )
}

//class 컴포넌트
class ClassComponent extends React.Component {
  constructor(props){
    super(props) //부모클래스 생성자호출
    this.state = { //state 생성
      name: 'jsh',
      age:30
    }
  } 
  render(){
    return(
      //jsx 반환 
      <div>안녕{this.state.name}</div>
    )
  }
}

export default App;
