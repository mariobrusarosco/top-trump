import { useEffect } from "react";
import { MyButton } from "@mariobrusarosco/design-system";

export const DashboardScreen = () => {
  useEffect(() => {
    setTimeout(async () => {
      // throw Error("eita");
      const res = await fetch(`/api/properasdsaties/1`);
      // console.log(res.status);
      // if (res.status === 404) {
      throw new Response("Not Found", { status: 404 });
      // }
    }, 1000);
  }, []);

  console.log(MyButton);

  return (
    <h1>
      <MyButton>a</MyButton>Dashboard
    </h1>
  );
};
