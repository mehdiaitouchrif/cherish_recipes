const Footer = () => {
	return (
		<footer id='footer' className='footer'>
			<div className='container'>
				<div className='footer__links'>
					<h3 className='logo'>
						Cherish <span className='header__logo--colored'>Recipes</span>
						{'>'}{' '}
					</h3>
					<ul>
						<li>
							<strong className='uppercase'>Company</strong>
						</li>
						<li>
							<a href='/'>Who we are</a>
						</li>
						<li>
							<a href='/'>Blog</a>
						</li>
						<li>
							<a href='/'>Careers</a>
						</li>
						<li>
							<a href='/'>Contact</a>
						</li>
					</ul>
					<ul>
						<li>
							<strong className='uppercase'>For Foodies</strong>
						</li>
						<li>
							<a href='/'>Community</a>
						</li>
						<li>
							<a href='/'>Blogger help</a>
						</li>
						<li>
							<a href='/'>Developers</a>
						</li>
						<li>
							<a href='/'>Mobile Apps</a>
						</li>
					</ul>
					<ul>
						<li>
							<strong className='uppercase'>For You</strong>
						</li>
						<li>
							<a href='/'>Privacy</a>
						</li>
						<li>
							<a href='/'>Terms</a>
						</li>
						<li>
							<a href='/'>Security</a>
						</li>
					</ul>
				</div>
				<div className='footer__developer'>
					<p>
						CherishRecipes is a web application developed by{' '}
						<a href='mailto:mehdi.aitouchrif1@gmail.com'>
							<strong>Mehdi Ait Ouchrif</strong>
						</a>
						, a software developer based in Morocco. He specializes in fullstack
						web development.
					</p>
					<p>&copy; 2021. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
