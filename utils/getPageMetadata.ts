function getPageMetadata(
  data: { [key: string]: any },
  page: string,
  customTitle?: string
): { [key: string]: any } {
  let title;
  if (customTitle) {
    title = customTitle;
  } else {
    title = `Marcus Alenius — ${page.charAt(0).toUpperCase() + page.slice(1)}`;
  }
  const description = data.posts[page].intro;
  const metadata = {
    title: title,
    description: data.posts[page].intro,
    openGraph: {
      url: `https://alenius.io/${page}`,
      title: title,
      siteName: title,
      description: description,
    },
    twitter: {
      title: title,
      description: description,
    },
  };
  return metadata;
}

export default getPageMetadata;
