import { ChangeEvent } from 'react';
import { Container, Box, Typography, Button, Link } from '@mui/material';


interface Props {
	labelId: string;
	type: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	children: React.ReactNode;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
}

export default function Input({
	labelId,
	type,
	onChange,
	value,
	children,
	link,
	required = false,
}: Props) {
	return (
		<>
			<div className='flex justify-between align-center'>
				
				<Typography component="h6" >
					{children}
				</Typography>
				{link && (
					<div className='text-sm'>
						<Link
							className='font-semibold text-res_blue hover:text-res_blue'
							href={link.linkUrl}
						>
							{link.linkText}
						</Link>
					</div>
				)}
			</div>
			<div >
				<input
					id={labelId}
					className='block w-full rounded-md border-0 px-1.5 py-1.5 text-res_blue shadow-sm ring-1 ring-res_blue placeholder:text-res_blue focus:ring-2 focus:ring-black sm:text-sm sm:leading-6'
					name={labelId}
					type={type}
					onChange={onChange}
					value={value}
					required={required}
				/>
			</div>
		</>
	);
}