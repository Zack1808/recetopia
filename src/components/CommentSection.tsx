import React, { useState, useRef } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

import Textarea from "./Textarea";
import Button from "./Button";

import { CommentSectionProps } from "../interfaces/components";

import { useCreateComment } from "../hooks/data";
import { auth } from "../firebaseConfig";

const CommentSection: React.FC<CommentSectionProps> = ({ comments, uid }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const { id } = useParams<{ id: string }>();

  const { createComment } = useCreateComment({ setIsLoading });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth.currentUser || !auth.currentUser.displayName) return;
    if (!formRef.current) return;
    if (formRef.current.comment.value.trim() === "") return;
    if (!id) return;
    console.log(id);
    createComment(
      auth.currentUser.displayName,
      formRef.current.comment.value,
      id
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="divide-y-2 flex flex-col gap-2 max-h-60 overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className="flex flex-col gap-2" key={comment.commentId}>
              <h4 className="text-gray-700 text-sm font-semibold">
                {comment.displayName}
              </h4>
              <span>{comment.comment}</span>
            </div>
          ))
        ) : (
          <h3 className="font-semibold text-gray-700 flex justify-center">
            No comments
          </h3>
        )}
      </div>
      {auth.currentUser?.uid !== uid && (
        <form
          ref={formRef}
          className="flex flex-col gap-2 md:items-end"
          onSubmit={handleSubmit}
        >
          <Textarea
            className="min-h-24"
            placeholder="Comment..."
            required
            name="comment"
          />
          <Button primary className="justify-center">
            {isLoading ? (
              <ClipLoader color="white" size={23} />
            ) : (
              "Send comment"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
