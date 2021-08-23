export interface Login {
	user?: { firstName: string; lastName: string };
	token: string;
}

export interface Result {
  login: Login;
  signup: Login;
}
