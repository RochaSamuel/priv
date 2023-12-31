"use client";

import apiClient from "@/backend-sdk";
import PostCard, { PostCardSkeleton } from "@/components/Post/PostCard";
import { Post } from "@/types/post";
import { useIntersection } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { FunctionComponent, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";

interface FeedProps {
	mode: "feed" | "profile" | "hot";
	producerId?: string;
}

const Feed: FunctionComponent<FeedProps> = ({ mode, producerId }) => {
	const { data: session } = useSession();
	const { data, fetchNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery({
			queryKey: ["posts", session?.user.email],
			queryFn: async ({ pageParam = 1 }) => {
				const api = apiClient(session?.user.accessToken!);

				return await api.post.getPosts(
					{
						itemsPerPage: 7,
						pageNumber: pageParam,
					},
					producerId,
				);
			},
			enabled: !!session?.user.accessToken,
			retry: false,
			onError: (error: any) => {
				// if (error.response.status === 401) {
				//   signOut();
				// }
			},
			getNextPageParam: (_, pages) => {
				return pages.length + 1;
			},
		});

	const infiniteTriggerPostRef = useRef<HTMLElement>(null);
	const { ref, entry } = useIntersection({
		root: infiniteTriggerPostRef.current,
		threshold: 0.2,
	});

	useEffect(() => {
		if (!isFetchingNextPage && entry?.isIntersecting) fetchNextPage();
	}, [entry?.isIntersecting]);

	const _posts = data?.pages.flatMap((page) => page);

	return (
		<>
			{!session?.user || isLoading ? (
				Array.from({ length: 4 }).map((_, index) => (
					<PostCardSkeleton key={index + 1} withPicture={index % 2 === 0} />
				))
			) : (
				<div>
					{_posts?.map((post, index) => {
						if (index === _posts.length - 3)
							return <PostCard post={post} ref={ref} />;
						return <PostCard post={post} />;
					})}
					{isFetchingNextPage && <PostCardSkeleton />}
				</div>
			)}
		</>
	);
};

export default Feed;
