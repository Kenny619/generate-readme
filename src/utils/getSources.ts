import getRepoTree from "./getRepoTree.js";

type RepoTree = {
	sha: string;
	url: string;
	tree: {
		path: string;
		mode: string;
		type: string;
		sha: string;
		size: number;
		url: string;
	}[];
};
const getSources = async () => {
	const repoTree: RepoTree = await getRepoTree();
	const srcFiles = repoTree.tree.filter(
		(file) => file.path.startsWith(process.env.SRCDIR as string) && file.path.endsWith(".ts") && file.type === "blob",
	);
	const srcFileContents = await Promise.all(
		srcFiles.map(async (file) => {
			const response = await fetch(
				`https://raw.githubusercontent.com/${process.env.OWNER}/${process.env.REPO}/main/${file.path}`,
			);
			const text = await response.text();
			const code = text.replaceAll("\t", "");
			return { path: file.path, code };
		}),
	);
	return srcFileContents;
};

export default getSources;
