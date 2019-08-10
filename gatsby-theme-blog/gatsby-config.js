module.exports = {
	siteMetadata: {
		title: 'Imed Adel\'s Blog',
		description: 'The personal blog of Imed Adel',
		author: 'Imed Adel',
		siteUrl: 'http:s://imedadel.me',
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-mdx',
			options: {
				extensions: [ '.mdx', '.md' ],
				remarkPlugins,
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'posts',
				path: path.resolve('content/blog'),
			}
		},
	]
}