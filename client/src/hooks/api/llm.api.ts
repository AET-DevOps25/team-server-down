import { useQuery } from "@tanstack/react-query";
import { llmApiFactory } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { DefaultApi} from "@/api/genai/generated";
import { TextRequest } from "@/api/genai/generated";

export const useTextCompletion = () => 
  useMutation({
    mutationFn: (request: TextRequest) => llmApiFactory.completeTextCompletionPost(request).then(res => res.data),
  });

export const useTextRephrase = () =>
  useMutation({
    mutationFn: (request: TextRequest) => llmApiFactory.rephraseTextRephrasePost(request).then(res => res.data),
  });


export const useTextSummarization = () => 
  useMutation({
    mutationFn: (request: TextRequest) => llmApiFactory.summarizeTextSummarizationPost(request).then(res => res.data),
  });

