import dotenv from 'dotenv';

dotenv.config()

export const { 
	SERVER_PORT,
	CJBASEURL,
	DBPASSWORD
} = process.env;