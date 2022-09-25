import Button from "../Button/Button";
import type { Props } from "./types";

function PostForm({ method = "post", error, fields, ...props }: Props) {
  return (
    <form className="flex flex-col" method={method} {...props}>
      <div className="mb-4 flex flex-col">
        <label htmlFor="title" className="mb-2 text-gray-600">
          Title
        </label>
        <input
          className="p-4"
          name="title"
          placeholder="Title of your post"
          defaultValue={fields?.title}
        />
        {error?.fieldErrors?.title && <p>{error.fieldErrors.title}</p>}
      </div>
      <div className="mb-8 flex flex-col">
        <label htmlFor="body" className="mb-2 text-gray-600">
          Body
        </label>
        <textarea
          defaultValue={fields?.body}
          className="p-4"
          name="body"
          placeholder="Write something amazing"
        />
        {error?.fieldErrors?.body && (
          <p className="text-red-500">{error.fieldErrors.body}</p>
        )}
      </div>
      {error?.formError && <p className="text-red-500">{error?.formError}</p>}
      <Button type="submit">Create Post</Button>
    </form>
  );
}

export default PostForm;
