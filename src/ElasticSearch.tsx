
export function ElasticSearch(server: string) {
	return function(path = "", body?: any) {
		return fetch(server + "/" + path, {
			method: 'GET',
			body: JSON.stringify(body),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then(response=>{
			try {
				return response.json()
			} catch (e) {
				console.log('ababa');
				console.log(response.text());
				return null;
			}
		})
	}
}
