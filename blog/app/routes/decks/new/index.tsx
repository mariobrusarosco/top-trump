import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const deckName = formData.get("deck-name");

  const errors = {
    deckName: deckName ? null : "Deck name is mandatory",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json(errors);
  }

  return redirect("/decks");
};

const NewDecksScreen = () => {
  const errors = useActionData();
  const transition = useTransition();
  const isCreating = transition.submission;

  return (
    <main>
      <h1>Decks - New Deck</h1>

      <Form method="post" key="oba">
        <div>
          <label htmlFor="deck-name">Deck name</label>
          <input type="text" id="deck-name" name="deck-name" />
          {errors?.deckName && <span>{errors?.deckName}</span>}
        </div>

        <button type="submit" disabled={isCreating as unknown as boolean}>
          {isCreating ? "Saving..." : "Save"}
        </button>
      </Form>
    </main>
  );
};

export default NewDecksScreen;
