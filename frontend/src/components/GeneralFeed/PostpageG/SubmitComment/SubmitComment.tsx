import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCommentsContext from "../../../../hooks/useContextHooks/useCommentsContext";

type SubmitProps = {
  id: string | undefined;
};

const SubmitComment = ({ id }: SubmitProps) => {
  const { handleSubmitComment, content, setContent } = useCommentsContext();
  const queryClient = useQueryClient();
  const commentMutation = useMutation({
    mutationFn: handleSubmitComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  return (
    <form
      onSubmit={() => commentMutation.mutate({ id })}
      className="submitComment"
      name="submit_comment_form"
    >
      <input
        className="submitComment__input"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </form>
  );
};

export default SubmitComment;
