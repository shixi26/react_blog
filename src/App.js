import { useState } from 'react';
import './App.css';


function App() {

  //자료 잠깐 저장시 state 사용, 변동시 자동으로 html에 반영되게 만들고 싶을 때 사용
  //1. import {useState} 2. useState(보관할자료) 3. let [state에보관했던자료,state변경함수]
  let [lists, setList] = useState([    
    { title: '다글제목1', body: '11월11일' , like: 0},
    { title: '나글제목2', body: '11월12일' , like: 0},
    { title: '가글제목3', body: '11월13일' , like: 0},]) //참고 Distructuring 문법
  let [modal, setModal] = useState(false) // 동적ui만들기 ui현재상태state저장

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
    copy[0].title='글제목수정'
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
  const handleModal = () => {
    setModal(prevState => !prevState)
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
        {lists.map((list,index) => (
          <table className="list" key={index}>
            <thead><tr className="title"><th><span onClick={()=>{handleModal()}}>{list?.title}</span><span onClick={()=>{handleLike(index)}}>👍</span> {list?.like} </th></tr></thead>
            <tbody><tr className="body"><td>{list?.body}</td></tr></tbody>
          </table>
        ))}            
      </div>

      {/* html중간에 조건문쓰기 : if문대신 삼항연산자로 중괄호 안에 작성 */}
      {
        modal === true ? <Modal/> : null
      }
      
    </div>
  );
}

// 컴포넌트
// 사용법: 1.밖에 function 만들기 2.return()안에 html담기 3.<함수명></함수명>사용
// 반복적으로 사용하는 html, 큰페이지들, 자주변경되는ui
// const Modal =()=>{return(html)}  function Modal(){return(html)} 
const Modal = () => {
  return(
    <div className="modal">
      <div className="content">
        <div className="tit_area"><h4>상세페이지</h4></div>
        <div>
          <table className="list">
            <thead><tr className="title"><th>제목</th></tr></thead>
            <tbody><tr className="body"><td>내용</td></tr></tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App;
