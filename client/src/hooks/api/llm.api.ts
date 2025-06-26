import { useQuery } from "@tanstack/react-query";
import { llmApiFactory } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useCompletionTextMutation = () => {
    return useMutation({
      mutationFn: (input: string[]) =>
        llmApiFactory.completeText({ user_text: input }).then(res => res.data),
    });
  };

export const useSummarizationTextMutation = () => {
    return useMutation({
      mutationFn: (input: string[]) =>
        llmApiFactory.summarizeText({ user_text: input }).then(res => res.data),
    });
  };

  
  export const useRephraseTextMutation = () => {
    return useMutation({
      mutationFn: (input: string[]) =>
        llmApiFactory.rephraseText({ user_text: input }).then(res => res.data),
    });
  };
