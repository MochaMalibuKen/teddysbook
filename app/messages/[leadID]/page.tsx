import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

type LeadPageProps = {
  params: {
    leadID: string;
  };
};

type Todo = {
  id: string | number;
  [key: string]: unknown;
};

export default async function LeadPage({ params }: LeadPageProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from("todos").select("*");

  return (
    <ul>
      {todos?.map((todo) => {
        const typedTodo = todo as Todo;
        return <li key={typedTodo.id}>{JSON.stringify(typedTodo)}</li>;
      })}
    </ul>
  );
}
