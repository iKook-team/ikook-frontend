// Calculate read time based on average reading speed of 200 words per minute
export const calculateReadTime = (content: string): string => {
  // Remove HTML tags and count words
  const text = content.replace(/<[^>]*>/g, " ");
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 100);

  return `${minutes} min read`;
};
