import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

interface SEOProps {
	title: string
	description: string
	image?: string
	url: string
	twitterUsername?: string
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url, twitterUsername }) => {
	const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

	const defaultImage = `${site.siteMetadata.siteUrl}/images/opengraph.jpg`

	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image || defaultImage} />
			<meta property="og:url" content={url} />
			<meta property="og:type" content="website" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image || defaultImage} />
			{twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
		</Helmet>
	)
}

export default SEO
