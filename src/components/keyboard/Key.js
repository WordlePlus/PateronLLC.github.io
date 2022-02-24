import { Typography, Grid } from '@mui/material';

export const Key = ({
	children,
	width,
	value,
	onClick,
	colorKeyboardValue,
}) => {
	const handleClick = (event) => {
		onClick(value);
		event.currentTarget.blur();
	};

  function getWidth (value) {
    return (value === 'Delete' || value === 'Enter') ?
    `calc(min(32vw, 120px))` :
    `calc(min(8vw, 40px))` ;
  }

	return (
		<>
			<Grid container
				onClick={handleClick}
				sx={{
          padding: 0,
          display: 'flex',
          justifyContent:'center',
          alignItems: 'center',
          width: `${getWidth(value)}`,
					height: 'min(11vw, 58px)',
					boxShadow: 2,
					backgroundColor: colorKeyboardValue,
				}}
			>
				<Typography
					variant="h6"
					sx={{
            padding: 0,
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: `${getWidth(value)*.75}`,
					}}
				>
					{children || value}
				</Typography>
			</Grid>
    </>
	);
};
