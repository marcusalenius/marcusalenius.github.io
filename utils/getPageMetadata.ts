function getPageMetadata(
  data: { [key: string]: any },
  page: string,
  customTitle?: string,
): { [key: string]: any } {
  const formattedPageTitle = page
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  let title;
  if (customTitle) {
    title = customTitle;
  } else {
    title = `Marcus Alenius — ${formattedPageTitle}`;
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
