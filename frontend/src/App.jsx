import Header from './components/Header.jsx'
import Faq from './components/Faq.jsx'
import Login from './components/Login.jsx'

function App() {
  return (
    <main>
      <Header/>
      <div className="main-content">
        <div className='faq-section'>
          <Faq title = "Why does this website do?" content = "This website emails you one or more LeetCode questions daily, depending on the difficulty and topics that you select."/>
          <Faq title = "How are these questions picked?" content = "Questions have been picked among the 500 most-liked questions on LeetCode."/>
          <Faq title = "Is it free?" content = "It's absolutely free. I'm also working on integrating Codeforces, it will be available soon."/>
        </div>
          <Login/>
      </div>
    </main>

  );
}

export default App;
