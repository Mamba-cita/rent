import logo from './assets/r-logo.jpg';

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          <div className='d-flex'>
            <img src={logo} alt='logo' className='mr-2' />
            <div>R-HOUSE</div>
          </div>
        </a>
      </div>
    </nav>
  );
}