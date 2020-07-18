import { Router } from 'express';
import testplan from './routes/application';
//import auth from './routes/auth';
//import user from './routes/user';
//import agendash from './routes/agendash';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	testplan(app);
	//auth(app);
	//user(app);
	//agendash(app);

	return app
}