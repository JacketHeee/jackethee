import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { MessageCircle } from 'lucide-react'
import Button from '@/components/atomic/atoms/Button/Button'
import Input from '@/components/atomic/atoms/Input/Input'
import Label from '@/components/atomic/atoms/Label/Label'

type ChatRole = 'user' | 'model'

interface ChatMessagePart {
  text: string
}

interface ChatMessage {
  role: ChatRole
  parts: ChatMessagePart[]
}

interface ChatbotResponse {
  reply: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const endRef = useRef<HTMLDivElement | null>(null)
  const apiEndpoint = import.meta.env.VITE_CHAT_API_URL ?? '/api/chatbot'

  const markdownComponents = useMemo<Components>(
    () => ({
      p: ({ children }) => (
        <p className="text-body-2 text-chat-text whitespace-pre-wrap wrap-break-word">
          {children}
        </p>
      ),
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      ul: ({ children }) => (
        <ul className="list-disc pl-4 space-y-1 text-body-2 text-chat-text">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal pl-4 space-y-1 text-body-2 text-chat-text">
          {children}
        </ol>
      ),
      li: ({ children }) => (
        <li className="text-body-2 text-chat-text">{children}</li>
      ),
      a: ({ children, href }) => (
        <a
          href={href}
          className="text-chat-primary underline underline-offset-2 break-all"
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      ),
    }),
    [],
  )

  useEffect(() => {
    if (!isOpen) return
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading, isOpen])

  const handleSend = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: trimmed }],
    }
    const nextHistory = [...messages, userMessage]

    setMessages(nextHistory)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmed,
          history: nextHistory,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Request failed')
      }

      const data = (await response.json()) as ChatbotResponse
      const modelMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: data.reply }],
      }
      setMessages((prev) => [...prev, modelMessage])
    } catch (error) {
      const description =
        error instanceof Error
          ? error.message
          : 'Không thể kết nối tới máy chủ.'
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          parts: [
            {
              text: `Xin lỗi, hiện tại tôi chưa thể phản hồi. ${description}`,
            },
          ],
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        void handleSend()
      }
    },
    [handleSend],
  )

  const chatInputId = 'chatbot-input'

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div
        className={`w-80 sm:w-96 h-137.5 bg-chat-surface rounded-2xl shadow-2xl border border-chat-border overflow-hidden flex flex-col transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 pointer-events-none translate-y-4 scale-95'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-chat-header-from to-chat-header-to text-chat-on-primary">
          <div className="flex items-center gap-2">
            <span className="text-body-2-semibold">Trợ lý ảo Jackethee</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-chat-online-ping opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-chat-online" />
            </span>
            <span className="text-body-2">Online</span>
          </div>
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 hover:bg-white/20 text-chat-on-primary"
            aria-label="Đóng cửa sổ chat"
          >
            ✕
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto bg-chat-surface-muted p-4 space-y-4 chat-scrollbar">
          {messages.length === 0 && !isLoading && (
            <div className="text-body-2 text-chat-text-muted text-center mt-10">
              Hãy bắt đầu cuộc trò chuyện với Jackethee nhé!
            </div>
          )}

          {messages.map((message, index) => {
            const isUser = message.role === 'user'
            return (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 wrap-break-word ${
                    isUser
                      ? 'bg-chat-primary text-chat-on-primary rounded-br-md'
                      : 'bg-chat-surface text-chat-text border border-chat-border rounded-bl-md'
                  }`}
                >
                  {isUser ? (
                    <p className="text-body-2 text-chat-on-primary whitespace-pre-wrap wrap-break-word">
                      {message.parts.map((part) => part.text).join('')}
                    </p>
                  ) : (
                    <ReactMarkdown components={markdownComponents}>
                      {message.parts.map((part) => part.text).join('')}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            )
          })}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-chat-surface border border-chat-border rounded-bl-md">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-chat-typing animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-chat-typing animate-bounce [animation-delay:0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-chat-typing animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        <div className="border-t border-chat-border bg-chat-surface p-3">
          <div className="flex items-center gap-2">
            <Label htmlFor={chatInputId} className="sr-only">
              Nhap tin nhan
            </Label>
            <Input
              id={chatInputId}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 rounded-full border border-chat-border px-4 py-2 text-body-2 text-chat-text focus:outline-none focus:ring-2 focus:ring-chat-primary disabled:bg-chat-input-disabled disabled:text-chat-text-muted"
              placeholder="Nhập tin nhắn..."
              disabled={isLoading}
            />
            <Button
              type="button"
              onClick={() => void handleSend()}
              disabled={isLoading || input.trim().length === 0}
              className="rounded-full bg-chat-primary px-4 py-2 text-body-2-semibold text-chat-on-primary hover:bg-chat-primary-hover disabled:cursor-not-allowed disabled:bg-chat-disabled"
            >
              Gửi
            </Button>
          </div>
        </div>
      </div>

      <Button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative h-14 w-14 rounded-full bg-chat-primary text-chat-on-primary shadow-lg hover:bg-chat-primary-hover ${
          isOpen ? '' : 'earthquake'
        } hover:scale-105 active:scale-95`}
        aria-label="Mở chatbot"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-chat-ring-ping opacity-90 animate-ping scale-125" />
        )}
        <span className="absolute inset-0 rounded-full bg-chat-ring opacity-90 scale-110 blur-[1px]" />
        <MessageCircle className="relative h-6 w-6" />
      </Button>
    </div>
  )
}
