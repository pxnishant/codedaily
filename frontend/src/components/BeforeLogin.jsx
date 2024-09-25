import Header from './Header.jsx'
import Faq from './Faq.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx';

function BeforeLogin() {
  return (
    <main>
      <Header/>
      <div className="main-content">
        <div className='faq-section'>
          <Faq title = "What does this website do?" content = "This website emails you one or more LeetCode questions daily, depending on the difficulty and topics that you select."/>
          <Faq title = "How are these questions picked?" content = "Questions have been picked among the 500 most-liked questions on LeetCode."/>
          <Faq title = "Is it free?" content = "It's absolutely free. I'm also working on integrating Codeforces, it will be available soon."/>
        </div>
        <div className='auth'>
        <div className="title">Your email is safe with us.<br/></div>
          <Login title = "Login using Google →"/>
          <Signup title = "Sign up with Google"/>
        </div>
      </div>
    </main>

  );
}

export default BeforeLogin;
