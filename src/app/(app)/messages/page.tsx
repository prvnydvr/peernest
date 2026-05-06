import Link from "next/link";
import { MessageSquare } from "lucide-react";

import { Avatar } from "@/components/app/avatar";
import { EmptyState } from "@/components/app/empty-state";
import { MessageComposer } from "@/components/app/message-composer";
import { requireUser } from "@/lib/auth";
import { formatRelativeTime } from "@/lib/utils";
import { getMessagesPageData } from "@/server/data";

export default async function MessagesPage({ searchParams }: { searchParams: Promise<{ compose?: string; conversation?: string }> }) {
  const user = await requireUser();
  const params = await searchParams;
  const data = await getMessagesPageData(user.id, params.compose, params.conversation);
  const activePeer =
    data.composeTarget ??
    data.activeConversation?.participants.find((participant) => participant.id !== user.id) ??
    data.activeConversation?.participants[0] ??
    null;

  return (
    <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
      <aside className="panel h-fit p-5">
        <p className="section-eyebrow">Peer inbox</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">Messages</h1>
        <p className="mt-2 text-sm leading-6 text-muted">Start focused study conversations from profiles and threads.</p>
        <div className="mt-5 grid gap-2">
          {data.conversations.map((conversation) => {
            const peer = conversation.participants.find((participant) => participant.id !== user.id) ?? conversation.participants[0];
            return (
              <Link key={conversation.id} href={`/messages?conversation=${conversation.id}`} className="flex gap-3 rounded-xl border border-transparent p-3 hover:border-slate-200 hover:bg-slate-50">
                <Avatar name={peer.name} imageUrl={peer.avatarUrl} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{peer.name}</p>
                  <p className="truncate text-xs text-muted">{conversation.latestMessage?.body ?? "No messages yet"}</p>
                </div>
                {conversation.latestMessage ? <span className="text-[11px] text-muted">{formatRelativeTime(conversation.latestMessage.createdAt)}</span> : null}
              </Link>
            );
          })}
          {!data.conversations.length ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm leading-6 text-muted">
              No conversations yet. Pick a suggested peer to start one.
            </div>
          ) : null}
        </div>
        <h2 className="mt-6 section-eyebrow">Suggested peers</h2>
        <div className="mt-3 grid gap-2">
          {data.suggestedPeers.map((peer) => (
            <Link key={peer.id} href={`/messages?compose=${peer.username}`} className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50">
              <Avatar name={peer.name} imageUrl={peer.avatarUrl} size="sm" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{peer.name}</span>
                <span className="block truncate text-xs text-muted">@{peer.username}</span>
              </span>
            </Link>
          ))}
        </div>
      </aside>
      <section className="panel flex min-h-[70vh] flex-col overflow-hidden">
        <div className="border-b border-border bg-slate-50/80 px-5 py-4">
          {activePeer ? (
            <div className="flex items-center gap-3">
              <Avatar name={activePeer.name} imageUrl={activePeer.avatarUrl} size="sm" />
              <div>
                <h2 className="font-semibold text-slate-950">{data.composeTarget ? `New message to ${activePeer.name}` : activePeer.name}</h2>
                <p className="text-xs text-muted">@{activePeer.username}</p>
              </div>
            </div>
          ) : (
            <h2 className="font-semibold text-slate-950">Conversation</h2>
          )}
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {data.activeConversation?.messages.length ? (
            data.activeConversation.messages.map((message) => (
              <div key={message.id} className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-sm ${message.senderId === user.id ? "ml-auto bg-slate-950 text-white" : "bg-slate-100 text-slate-800"}`}>
                <p className="text-sm leading-6">{message.body}</p>
                <p className={`mt-1 text-xs ${message.senderId === user.id ? "text-white/60" : "text-muted"}`}>{formatRelativeTime(message.createdAt)}</p>
              </div>
            ))
          ) : (
            <EmptyState
              icon={MessageSquare}
              title={activePeer ? `Start a conversation with ${activePeer.name}` : "Choose a conversation"}
              body="Use messages for quick study coordination, resource follow-ups, and project collaboration."
            />
          )}
        </div>
        <MessageComposer recipientId={data.composeTarget?.id} conversationId={data.activeConversation?.id} />
      </section>
    </div>
  );
}
