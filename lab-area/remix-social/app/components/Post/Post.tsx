import type { Props } from "./types";

function Post({ header, authorName, children }: Props) {
  return (
    <div className="flex flex-col p-6 max-w-md border rounded">
      {header && <h2 className="font-bold text-3xl text-gray-900">{header}</h2>}
      {authorName && (
        <h3 className="font-bold text-3xl text-gray-900">{authorName}</h3>
      )}

      <p>{children}</p>
    </div>
  );
}

export default Post;