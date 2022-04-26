import githubLogo from './github.svg';
import telegramLogo from './telegram.svg';

function Header() {
  return(
    <header className="tl_article_header">
      <h1>ofen.github.io</h1>
      <aside>
      <address>
        <a href="https://github.com/ofen" target="_blank" rel="noreferrer"><img src={githubLogo} alt="github"/></a>
        <a href="https://t.me/t_ofen" target="_blank" rel="noreferrer"><img src={telegramLogo} alt="telegram"/></a>
      </address>
      </aside>
    </header>
  );
}

export default Header