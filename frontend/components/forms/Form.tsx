//'use client'
import { ChangeEvent, FormEvent } from 'react';
import { Input }  from '@components/forms/';
import { Spinner  } from '@components/common/';
import { Container, Box, Typography, Button } from '@mui/material';

interface Config {
	labelText: string;
	labelId: string;
	type: string;
	value: string;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
}

interface Props {
	config: Config[];
	isLoading: boolean;
	btnText: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({
	config,
	isLoading,
	btnText,
	onChange,
	onSubmit,
}: Props) {
	return (
		<form className='space-y-6' onSubmit={onSubmit}>
			{config.map(input => (
				<Input
					key={input.labelId}
					labelId={input.labelId}
					type={input.type}
					onChange={onChange}
					value={input.value}
					link={input.link}
					required={input.required}
				>
					{input.labelText}
				</Input>
			))}

			<div>
				<button
					type='submit'
					className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					disabled={isLoading}
				>
					{isLoading ? <Spinner sm /> : `${btnText}`}
				</button>
			</div>
		</form>
	);
			
}


	/*
export default function Form({
	config,
	isLoading,
	btnText,
	onChange,
	onSubmit,
}: Props) {
	return (
		<Container sx={{ py: '5vh' }} maxWidth="xs" >
			<Box
				sx={{
					boxShadow: 3,
					borderRadius: 2,
					p: 4,
				}}
			>
				<Typography sx={{pb: '2vh'}} component="h1" variant="h5" align='center'>
					Log in
				</Typography>
				<form className='space-y-6' onSubmit={onSubmit}>
					{config.map(input => (
						<Input
							key={input.labelId}
							labelId={input.labelId}
							type={input.type}
							onChange={onChange}
							value={input.value}
							link={input.link}
							required={input.required}
						>
							{input.labelText}
						</Input>
					))}

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-res_blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-res_blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-res_blue'
							disabled={isLoading}
						>
							{isLoading ? <Spinner sm /> : `${btnText}`}
						</button>
					</div>
				</form>
			</Box>

		</Container>

	);
}

return (
		<form className='space-y-6' onSubmit={onSubmit}>
			{config.map(input => (
				<Input
					key={input.labelId}
					labelId={input.labelId}
					type={input.type}
					onChange={onChange}
					value={input.value}
					link={input.link}
					required={input.required}
				>
					{input.labelText}
				</Input>
			))}

			<div>
				<button
					type='submit'
					className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					disabled={isLoading}
				>
					{isLoading ? <Spinner sm /> : `${btnText}`}
				</button>
			</div>
		</form>
		
*/