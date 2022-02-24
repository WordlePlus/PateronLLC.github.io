import { Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

const LetterBox = ({ color, char }) => {
	return (
		<Grid
			item
			xs={2}
			sx={{
				marginTop: '6px',
				marginBottom: '6px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Paper
				elevation={3}
				sx={{
					width: 'min(14vw, 75px)',
					height: 'min(14vw, 75px)',
					backgroundColor: color,
				}}
			>
				<Typography
					variant="h3"
					sx={{
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: 'calc(min(14vw, 75px) * 0.8)',
					}}
				>
					{char}
				</Typography>
			</Paper>
		</Grid>
	);
};

export default LetterBox;
