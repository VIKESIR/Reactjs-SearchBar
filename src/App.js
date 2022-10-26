import { useState } from 'react';
import './App.css';
import Searchhistory from './data/Searchhistory.json'
import Suggestion from './data/Suggestion.json'

function App() {

  const [searchTitle, setSearchtitle] = useState("")
  const [searchKeyword, setSearchKeyword] = useState("")
  var [historyList,setHistoryList] = useState(null)

  const showHistory = () => {
    setHistoryList(Searchhistory.slice(0,10))
  }
  const hideHistory = (e) => {
    setSearchtitle(e.target.innerText)
    setHistoryList(null)
  }

  const saveHistory = (e) => {
    e.preventDefault()
    if(searchKeyword !== "") {
      Searchhistory = [...Searchhistory, {
        id: Searchhistory.length+1,
        title: searchKeyword,
        time: new Date()
      }]
      setSearchtitle(searchKeyword)
    }
    setSearchKeyword("")
  }
  const showSuggestion = (e) => {
    setSearchKeyword(e.target.value)
    if(e.target.value !== ""){
      setHistoryList(Suggestion.slice(0,10).filter((item) => item.title.includes(e.target.value)))
    } else {
      setHistoryList(null)
    }
  }
  
  return (
    <div className="App">
      <div className="navbar">
        <div className="brand fw-01 fs-05">
          <span>SearchBar</span><span>SB</span>
        </div>
        <div className="searchbar">
          <form className="input" onSubmit={(e) => saveHistory(e)} autoComplete="off">
            <span className="searchicon fw-01 fs-05">⚲</span>
            <input type="search" name='search' className="textinput fw-02 fs-02" value={searchKeyword} onClick={() => showHistory()} onChange={(e) => showSuggestion(e)} />
          </form>
          <div className="suggestion">
            {
              historyList && historyList.map((item) =>
                <div onClick={(e) => hideHistory(e)} className="list fs-02" key={item.id}>{item.title}</div>
              )
            }
          </div>
        </div>
      </div>
      <div className="content">
        {searchTitle && <div className='text-white mb-3 fw-02'>Showing resuslt for: {searchTitle}</div>}
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
    </div>
  );
}

export default App;
