const Header = ({ title }) => {
	return (
		<header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 justify-between'>
				{/* Container for logo and title */}
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-4'>
						{/* logo */}
						<img className='h-8 w-auto' src='/r-logo.jpg'  height={45} width={45}/>
						{/* title */}
						<h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
					</div>
				</div>
			</div>
		</header>
	);
};
export default Header;
