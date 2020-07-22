export default function employer(context) {
	if (!context.$data.auth.is_employer) {
		context.contentloading = false;
		context.error = {
			status: 403,
			message: 'You are not authorized to access this page'
		};
	}
}