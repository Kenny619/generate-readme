import process from "node:process";
const getRepoTree = async () => {
	const github = {
		owner: process.env.OWNER,
		repo: process.env.REPO,
		token: process.env.TOKEN,
	};
	try {
		const response = await fetch(
			`https://api.github.com/repos/${github.owner}/${github.repo}/git/trees/main?recursive=1`,
			{
				headers: {
					Authorization: `Bearer ${github.token}`,
					Accept: "application/vnd.github.v3+json",
					"X-GitHub-Api-Version": "2022-11-28",
				},
				method: "GET",
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching repository contents:", error);
	}
};

export default getRepoTree;
