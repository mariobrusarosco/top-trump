import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";
import axios from "axios";

interface ChatQueryProps {
  queryKey: string;
  apiUrl?: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQuery = ({
  paramKey,
  paramValue,
  queryKey,
  apiUrl,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl({
      url: apiUrl ?? "",
      query: {
        cursor: pageParam,
        [paramKey]: paramValue,
      },
    });

    const res = await axios.get(url);

    return res.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryFn: fetchMessages,
      queryKey: [queryKey],
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};
